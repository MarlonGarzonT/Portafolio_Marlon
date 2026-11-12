import { List, ListItem } from 'konsta/react';
import Ios from './ios/Ios';
import { SectionTitle, SettingsIcon } from './ios/parts';
import { Envelope, LogoGithub, LogoLinkedin } from './ios/icons';
import type { Translator } from '../i18n/ui';
import { profile } from '../data/profile';

/** Contacto como filas de Ajustes: ícono, nombre, detalle a la derecha y flecha. */
export default function Contact({ t }: { t: Translator }) {
  const external = { target: '_blank', rel: 'noopener noreferrer' };
  const github = profile.socials.github.replace(/^https?:\/\/(www\.)?github\.com\/?/, '');
  // La dirección completa no cabe a la derecha de la fila en móvil: debajo del título en pantallas
  // estrechas (con corte permitido antes de la @) y a la derecha desde 440 px. Solo una es visible.
  const [user, domain] = profile.email.split('@');
  return (
    <Ios>
      <SectionTitle id="contacto-title" color="var(--color-ios-indigo)" icon={<Envelope />}>
        {t('contact.title')}
      </SectionTitle>
      <p className="mx-4 mb-4 max-w-[60ch] text-[17px] leading-[1.55] text-black/70 dark:text-white/70">{t('contact.intro')}</p>
      <List strongIos insetIos dividersIos className="my-0!">
        <ListItem
          link
          href={`mailto:${profile.email}`}
          title={t('contact.email')}
          strongTitle={false}
          subtitle={
            <span className="text-black/60 min-[440px]:hidden dark:text-white/60">
              {user}
              <wbr />@{domain}
            </span>
          }
          after={<span className="hidden min-[440px]:inline">{profile.email}</span>}
          media={
            <SettingsIcon color="var(--color-primary)">
              <Envelope />
            </SettingsIcon>
          }
        />
        <ListItem
          link
          href={profile.socials.linkedin}
          linkProps={external}
          title="LinkedIn"
          after={
            <>
              {t('contact.profile')}
              <span className="sr-only"> {t('common.external')}</span>
            </>
          }
          media={
            <SettingsIcon color="var(--color-linkedin)">
              <LogoLinkedin />
            </SettingsIcon>
          }
        />
        <ListItem
          link
          href={profile.socials.github}
          linkProps={external}
          title="GitHub"
          after={
            <>
              {github ? `@${github}` : t('contact.profile')}
              <span className="sr-only"> {t('common.external')}</span>
            </>
          }
          media={
            <SettingsIcon color="#24292f">
              <LogoGithub />
            </SettingsIcon>
          }
        />
      </List>
    </Ios>
  );
}
