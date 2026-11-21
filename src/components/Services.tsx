import Ios from './ios/Ios';
import { GlassPanel, SectionTitle } from './ios/parts';
import { Wrench } from './ios/icons';
import type { Locale, Translator } from '../i18n/ui';
import { services } from '../data/profile';

/** Servicios como freelance: una tarjeta por servicio, con entregables y precio orientativo. */
export default function Services({ locale, t }: { locale: Locale; t: Translator }) {
  return (
    <Ios>
      <SectionTitle id="servicios-title" color="var(--color-ios-teal)" icon={<Wrench />}>
        {t('services.title')}
      </SectionTitle>
      <ul className="mx-4 grid gap-4 md:grid-cols-3">
        {services.map(({ slug, title, summary, deliverables, glyph: Glyph, tint }) => (
          <li key={slug}>
            <GlassPanel className="flex h-full flex-col p-5">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-[11px] text-white"
                style={{ background: `linear-gradient(180deg, ${tint[0]}, ${tint[1]})` }}
              >
                <Glyph className="size-6" />
              </span>
              <h3 className="mt-3 text-[18px] font-semibold leading-tight text-black dark:text-white">{title[locale]}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-black/70 dark:text-white/70">{summary[locale]}</p>
              <ul className="mt-3 space-y-1.5">
                {deliverables[locale].map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] leading-snug text-black/70 dark:text-white/70">
                    <span className="mt-[0.5em] size-1 shrink-0 rounded-full bg-current opacity-60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </li>
        ))}
      </ul>
    </Ios>
  );
}
