import { List, ListItem } from 'konsta/react';
import Ios from './ios/Ios';
import { GlassPanel, SectionTitle, SettingsIcon } from './ios/parts';
import { Briefcase } from './ios/icons';
import type { Locale, Translator } from '../i18n/ui';
import { experience } from '../data/profile';

/** Experiencia laboral como lista agrupada de Ajustes de iOS. */
export default function Experience({ locale, t }: { locale: Locale; t: Translator }) {
  return (
    <Ios>
      <SectionTitle id="experiencia-title" color="var(--color-ios-orange)" icon={<Briefcase />}>
        {t('experience.title')}
      </SectionTitle>
      {/* Lista sin fondo propio (sin `strongIos`) dentro de un panel de Liquid Glass, como el inicio. */}
      <GlassPanel className="mx-4 overflow-hidden py-1">
      <List dividersIos className="list-full-text my-0!">
        {experience.map((job) => (
          <ListItem
            key={`${job.company}-${job.start}`}
            media={
              <SettingsIcon color="var(--color-ios-gray)">
                <Briefcase />
              </SettingsIcon>
            }
            title={<span className="font-semibold">{job.role[locale]}</span>}
            after={
              <span className="text-[15px] tabular-nums">
                {/* Un solo año si empezó y terminó el mismo año ("2024", no "2024 – 2024"). */}
                {job.end === job.start ? job.start : `${job.start} – ${job.end ?? t('experience.present')}`}
              </span>
            }
            subtitle={job.company}
            text={
              <span className="block whitespace-normal">
                <span className="block">{job.summary[locale]}</span>
                {job.highlights[locale].length > 0 && (
                  <span className="mt-2 block space-y-1">
                    {job.highlights[locale].map((h) => (
                      <span key={h} className="flex gap-2">
                        <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-current opacity-60" aria-hidden="true" />
                        {h}
                      </span>
                    ))}
                  </span>
                )}
                {job.stack && (
                  <span className="mt-2 block text-[13px] text-black/55 dark:text-white/55">{job.stack.join(' · ')}</span>
                )}
              </span>
            }
          />
        ))}
      </List>
      </GlassPanel>
    </Ios>
  );
}
