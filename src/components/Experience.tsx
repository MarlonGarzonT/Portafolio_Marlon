import { List, ListItem } from 'konsta/react';
import Ios from './ios/Ios';
import { SectionTitle, SettingsIcon } from './ios/parts';
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
      <List strongIos insetIos dividersIos className="list-full-text my-0!">
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
                {job.start} – {job.end ?? t('experience.present')}
              </span>
            }
            subtitle={job.company}
            text={
              <span className="block whitespace-normal">
                <span className="block">{job.summary[locale]}</span>
                <span className="mt-2 block space-y-1">
                  {job.highlights[locale].map((h) => (
                    <span key={h} className="flex gap-2">
                      <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-current opacity-60" aria-hidden="true" />
                      {h}
                    </span>
                  ))}
                </span>
              </span>
            }
          />
        ))}
      </List>
    </Ios>
  );
}
