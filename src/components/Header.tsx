import { useEffect, useState, type ReactNode } from 'react';
import { Glass, Segmented, SegmentedButton } from 'konsta/react';
import { LayoutGroup, MotionConfig, motion } from 'motion/react';
import Ios from './ios/Ios';
import { Auto, Briefcase, CodeIcon, Envelope, Moon, Person, SunMax } from './ios/icons';
import { readThemePref, setThemePref, type ThemePref } from '../lib/theme';

export interface HeaderProps {
  navLabel: string;
  items: { id: string; label: string }[];
  lang: { href: string; hreflang: string; short: string; label: string };
  theme: { label: string; system: string; light: string; dark: string };
}

const ICONS: Record<string, ReactNode> = {
  experiencia: <Briefcase />,
  proyectos: <CodeIcon />,
  'sobre-mi': <Person />,
  contacto: <Envelope />,
};

/** Spring de Apple para mover/reposicionar: sin rebote (damping 1.0), respuesta ~0.35 s. Interrumpible. */
const SPRING = { type: 'spring', bounce: 0, duration: 0.35 } as const;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // Banda central de la ventana: activa la sección que se está leyendo.
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    // Arriba del todo no hay sección activa (estamos en el inicio).
    const onScroll = () => window.scrollY < 120 && setActive(null);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids.join()]);
  return [active, setActive] as const;
}

function ThemeSwitch({ theme }: { theme: HeaderProps['theme'] }) {
  const [pref, setPref] = useState<ThemePref>('system');
  useEffect(() => setPref(readThemePref()), []);
  const options: { value: ThemePref; label: string; icon: ReactNode }[] = [
    { value: 'light', label: theme.light, icon: <SunMax /> },
    { value: 'system', label: theme.system, icon: <Auto /> },
    { value: 'dark', label: theme.dark, icon: <Moon /> },
  ];
  return (
    <div role="radiogroup" aria-label={theme.label}>
      <Segmented strong rounded className="w-[108px]">
        {options.map((o) => (
          <SegmentedButton
            key={o.value}
            active={pref === o.value}
            role="radio"
            aria-checked={pref === o.value}
            aria-label={o.label}
            title={o.label}
            onClick={() => {
              setPref(o.value);
              setThemePref(o.value);
            }}
            className="text-[15px]"
          >
            {o.icon}
          </SegmentedButton>
        ))}
      </Segmented>
    </div>
  );
}

function LangLink({ lang }: { lang: HeaderProps['lang'] }) {
  return (
    <a
      href={lang.href}
      hrefLang={lang.hreflang}
      lang={lang.hreflang}
      className="press grid h-9 min-w-11 place-items-center rounded-full px-3 text-[13px] font-semibold tracking-wide text-black/80 transition-colors hover:bg-black/5 dark:text-white/85 dark:hover:bg-white/10"
    >
      <span aria-hidden="true">{lang.short}</span>
      <span className="sr-only">{lang.label}</span>
    </a>
  );
}

export default function Header({ navLabel, items, lang, theme }: HeaderProps) {
  const [active, setActive] = useActiveSection(items.map((i) => i.id));

  return (
    <Ios>
      <MotionConfig reducedMotion="user">
        {/* Escritorio: píldora flotante de vidrio centrada (estructura de porfolio.dev). */}
        <header className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center md:flex">
          <Glass component="div" className="chrome pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
            <nav aria-label={navLabel}>
              <LayoutGroup>
                <ul className="flex items-center">
                  {items.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          aria-current={isActive ? 'location' : undefined}
                          // Respuesta inmediata: el indicador se mueve al pulsar, no al soltar.
                          onPointerDown={() => setActive(item.id)}
                          className={`press relative grid h-9 place-items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-200 ${
                            isActive ? 'text-primary' : 'text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <motion.span layoutId="nav-active" transition={SPRING} className="absolute inset-0 rounded-full bg-primary/12 dark:bg-primary/20" />
                          )}
                          <span className="relative">{item.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </LayoutGroup>
            </nav>
            <span className="mx-1 h-5 w-px bg-black/10 dark:bg-white/15" aria-hidden="true" />
            <LangLink lang={lang} />
            <ThemeSwitch theme={theme} />
          </Glass>
        </header>

        {/* Móvil: idioma y tema arriba; navegación en la barra de pestañas, como una app de iPhone. */}
        <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-end px-3 md:hidden">
          <Glass component="div" className="chrome pointer-events-auto flex items-center gap-1 rounded-full p-1">
            <LangLink lang={lang} />
            <ThemeSwitch theme={theme} />
          </Glass>
        </div>
        <nav
          aria-label={navLabel}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(env(safe-area-inset-bottom),12px)] md:hidden"
        >
          <Glass component="div" className="chrome pointer-events-auto w-full max-w-[420px] rounded-full p-1.5">
            <LayoutGroup>
              <ul className="grid grid-cols-4">
                {items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        onPointerDown={() => setActive(item.id)}
                        className={`press relative flex h-[54px] flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium transition-colors duration-200 ${
                          isActive ? 'text-primary' : 'text-black/65 dark:text-white/70'
                        }`}
                      >
                        {isActive && (
                          <motion.span layoutId="tab-active" transition={SPRING} className="absolute inset-0 rounded-full bg-primary/12 dark:bg-primary/20" />
                        )}
                        <span className="relative text-[22px] leading-none" aria-hidden="true">
                          {ICONS[item.id]}
                        </span>
                        <span className="relative">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </Glass>
        </nav>
      </MotionConfig>
    </Ios>
  );
}
