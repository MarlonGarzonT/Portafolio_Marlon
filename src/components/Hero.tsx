import type { ReactNode } from 'react';
import Ios from './ios/Ios';
import { GlassPanel } from './ios/parts';
import type { Locale, Translator } from '../i18n/ui';
import { profile } from '../data/profile';

interface Props {
  locale: Locale;
  t: Translator;
  /** Avatar optimizado por Astro (src + srcset). */
  avatar: { src: string; srcSet: string };
  /** Botones de acción (isla HeroActions con React Bits que pasa Astro como slot "actions"). */
  actions?: ReactNode;
}

/**
 * Inicio: avatar + estado, saludo, presentación y acciones (estructura de porfolio.dev), sobre un
 * panel de Liquid Glass (`GlassPanel`) para que el texto se lea sobre el fondo animado.
 */
export default function Hero({ locale, t, avatar, actions }: Props) {
  return (
    <Ios>
      <GlassPanel className="mx-4 max-w-[40rem] p-5 sm:p-8">
        <div className="enter mb-6 flex items-center gap-4" style={{ ['--i' as string]: 0 }}>
          <div className="relative shrink-0">
            <div className="absolute inset-0 scale-125 rounded-full bg-primary/25 blur-xl" aria-hidden="true" />
            <img
              src={avatar.src}
              srcSet={avatar.srcSet}
              sizes="88px"
              width={88}
              height={88}
              alt={profile.name}
              className="relative size-[88px] rounded-full bg-ios-light-surface-1 object-cover ring-2 ring-primary/60 ring-offset-2 ring-offset-transparent dark:bg-ios-dark-surface-1"
              fetchPriority="high"
            />
          </div>
          {profile.available && (
            <p className="inline-flex items-center gap-2 rounded-full bg-ios-green/15 px-3 py-1.5 text-[13px] font-semibold text-[#1f7a3a] dark:text-[#30d158]">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ios-green opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-ios-green" />
              </span>
              <span className="shiny">{t('hero.available')}</span>
            </p>
          )}
        </div>

        <h1 className="enter text-[40px] font-bold leading-[1.05] tracking-display sm:text-[52px]" style={{ ['--i' as string]: 1 }}>
          {t('hero.greeting')} <span className="text-primary">{profile.firstName}</span>
        </h1>

        <p className="enter mt-5 text-[19px] leading-[1.55] text-black/70 dark:text-white/70" style={{ ['--i' as string]: 2 }}>
          <strong className="font-semibold text-black dark:text-white">{profile.role[locale]}</strong> {profile.intro[locale]}
        </p>

        {actions && (
          <div className="enter mt-8" style={{ ['--i' as string]: 3 }}>
            {actions}
          </div>
        )}
      </GlassPanel>
    </Ios>
  );
}
