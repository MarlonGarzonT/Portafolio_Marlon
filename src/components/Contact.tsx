import type { ReactNode } from 'react';
import Ios from './ios/Ios';
import { SectionTitle } from './ios/parts';
import { Envelope } from './ios/icons';
import type { Translator } from '../i18n/ui';

/**
 * Contacto: título de sección y las tarjetas (isla ContactCards con React Bits, que pasa Astro como
 * slot "cards"). Van dentro de un div porque la isla de Astro es `display: contents` y la animación
 * de profundidad al hacer scroll (`[data-reveal] > *`) necesita un elemento con caja.
 */
export default function Contact({ t, cards }: { t: Translator; cards?: ReactNode }) {
  return (
    <Ios>
      <SectionTitle id="contacto-title" color="var(--color-ios-indigo)" icon={<Envelope />}>
        {t('contact.title')}
      </SectionTitle>
      <div>{cards}</div>
    </Ios>
  );
}
