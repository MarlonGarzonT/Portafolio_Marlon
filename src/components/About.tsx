import type { ReactNode } from 'react';
import { Block, BlockTitle, Chip } from 'konsta/react';
import Ios from './ios/Ios';
import { BrandGlyph, SectionTitle } from './ios/parts';
import { Person } from './ios/icons';
import type { Locale, Translator } from '../i18n/ui';
import { about, skillGroups } from '../data/profile';

/** Sobre mí: texto en un bloque agrupado y el stack como fichas por área. */
export default function About({ locale, t, card }: { locale: Locale; t: Translator; card?: ReactNode }) {
  return (
    <Ios>
      <SectionTitle id="sobre-mi-title" color="var(--color-ios-green)" icon={<Person />}>
        {t('about.title')}
      </SectionTitle>
      <div className={card ? 'grid items-start gap-6 md:grid-cols-[minmax(0,356px)_minmax(0,1fr)] md:gap-2' : undefined}>
        {card && <div className="mx-4 flex justify-center md:mr-0">{card}</div>}
        <Block strongIos insetIos className="my-0! space-y-4 text-[17px] leading-[1.55]">
          {about[locale].map((p) => (
            <p key={p.slice(0, 24)} className="max-w-[65ch]">
              {p}
            </p>
          ))}
        </Block>
      </div>

      {skillGroups.map((group) => (
        <div key={group.title.es}>
          <BlockTitle className="mt-7! mb-2!">{group.title[locale]}</BlockTitle>
          <Block strongIos insetIos className="my-0! flex flex-wrap gap-2 py-4!">
            {group.items.map((item) => (
              <Chip key={item.name} outline media={item.icon && <BrandGlyph icon={item.icon} className="size-4" />} className="gap-1.5">
                {item.name}
              </Chip>
            ))}
          </Block>
        </div>
      ))}
    </Ios>
  );
}
