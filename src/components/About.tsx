import type { ReactNode } from 'react';
import { Chip } from 'konsta/react';
import Ios from './ios/Ios';
import { BrandGlyph, GlassPanel, SectionTitle } from './ios/parts';
import { Person } from './ios/icons';
import type { Locale, Translator } from '../i18n/ui';
import { about, featuredSkills, skillGroups } from '../data/profile';

const LABEL = 'mb-3 text-[13px] font-semibold uppercase tracking-wide text-white/55';

/**
 * Sobre mí: texto y stack en paneles de Liquid Glass, como el inicio y la experiencia.
 * El stack va en UN solo panel con los grupos separados por líneas finas: la animación de
 * profundidad al hacer scroll se aplica a cada hijo directo de la sección, y con un bloque por
 * grupo entraban desfasados y se veían montados unos sobre otros.
 */
export default function About({ locale, t, card }: { locale: Locale; t: Translator; card?: ReactNode }) {
  return (
    <Ios>
      <SectionTitle id="sobre-mi-title" color="var(--color-ios-green)" icon={<Person />}>
        {t('about.title')}
      </SectionTitle>
      <div className={card ? 'grid items-start gap-6 md:grid-cols-[minmax(0,356px)_minmax(0,1fr)] md:gap-2' : undefined}>
        {card && <div className="mx-4 flex justify-center md:mr-0">{card}</div>}
        <GlassPanel className="mx-4 space-y-4 p-5 text-[17px] leading-[1.55] sm:p-6">
          {about[locale].map((p) => (
            <p key={p.slice(0, 24)} className="max-w-[65ch] text-black/80 dark:text-white/85">
              {p}
            </p>
          ))}
        </GlassPanel>
      </div>

      <GlassPanel className="mx-4 mt-6 p-5 sm:p-6">
        <h3 className="sr-only">{t('about.stack')}</h3>

        {/* Principales: mosaicos con ícono de color y dónde se usó cada tecnología. */}
        <h4 className={LABEL}>{t('about.core')}</h4>
        <ul className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 md:grid-cols-3">
          {featuredSkills.map(({ name, icon, glyph: Glyph, color, where }) => (
            <li key={name} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10 ring-inset">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-[11px]"
                style={{ background: `color-mix(in srgb, ${color} 18%, transparent)`, color }}
              >
                {Glyph ? <Glyph className="size-6" /> : icon && <BrandGlyph icon={icon} mono className="size-6" />}
              </span>
              <span className="min-w-0">
                <span className="block text-[16px] font-semibold leading-tight text-white">{name}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-white/60">{where[locale]}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* El resto: grupos compactos de fichas, en dos columnas en escritorio. */}
        <div className="mt-6 grid gap-x-6 gap-y-5 border-t border-white/10 pt-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title.es}>
              <h4 className={LABEL}>{group.title[locale]}</h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const name = typeof item.name === 'string' ? item.name : item.name[locale];
                  return (
                    <li key={name}>
                      <Chip outline media={item.icon && <BrandGlyph icon={item.icon} className="size-4" />} className="gap-1.5">
                        {name}
                      </Chip>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </GlassPanel>
    </Ios>
  );
}
