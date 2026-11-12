import { Button, List, ListItem } from 'konsta/react';
import Ios from './ios/Ios';
import { AppIcon, SectionTitle } from './ios/parts';
import { CodeIcon } from './ios/icons';
import type { Locale, Translator } from '../i18n/ui';
import { projects } from '../data/profile';

/** Proyectos como una lista de la App Store: ícono de app, nombre, resumen y botón "VER". */
interface Props {
  locale: Locale;
  t: Translator;
  /** Íconos reales optimizados por Astro, por slug. */
  icons?: Record<string, { src: string; srcSet: string }>;
}

export default function Projects({ locale, t, icons = {} }: Props) {
  const external = { target: '_blank', rel: 'noopener noreferrer' };
  return (
    <Ios>
      <SectionTitle id="proyectos-title" color="var(--color-primary)" icon={<CodeIcon />}>
        {t('projects.title')}
      </SectionTitle>
      <List strongIos insetIos dividersIos className="list-full-text my-0!">
        {projects.map((p) => {
          const href = p.links.live ?? p.links.repo;
          const label = p.links.live ? t('projects.view') : t('projects.code');
          return (
            <ListItem
              key={p.slug}
              media={<AppIcon icon={p.icon} tint={p.tint} image={icons[p.slug]} />}
              title={<span className="font-semibold">{p.title}</span>}
              subtitle={`${p.kind[locale]} · ${p.stack.join(' · ')}`}
              text={
                <span className="block whitespace-normal">
                  {p.summary[locale]}
                  {p.links.live && p.links.repo && (
                    <a
                      href={p.links.repo}
                      {...external}
                      className="mt-1.5 flex w-fit items-center gap-1 font-medium text-primary hover:underline"
                    >
                      <CodeIcon className="size-[14px]" aria-hidden="true" />
                      {t('projects.code')}
                      <span className="sr-only">
                        {' '}
                        {p.title} {t('common.external')}
                      </span>
                    </a>
                  )}
                </span>
              }
              after={
                href && (
                  <Button
                    inline
                    rounded
                    small
                    tonal
                    href={href}
                    {...external}
                    className="press min-w-[68px] px-4 font-bold uppercase tracking-wide"
                  >
                    {label}
                    <span className="sr-only">
                      {' '}
                      {p.title} {t('common.external')}
                    </span>
                  </Button>
                )
              }
            />
          );
        })}
      </List>
    </Ios>
  );
}
