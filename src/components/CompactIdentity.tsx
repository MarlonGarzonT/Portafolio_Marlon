import { Glass } from 'konsta/react';
import Ios from './ios/Ios';

interface Props {
  name: string;
  shortName: string;
  avatar: { src: string; srcSet: string };
}

/**
 * Identidad compacta (foto + nombre) en una cápsula de vidrio. Aparece cuando el título grande
 * del inicio se pliega al hacer scroll, como el "large title" de iOS que pasa a la barra.
 * Es estática (sin JS): la anima `animation-timeline: scroll()` en global.css.
 * Duplica información del inicio, así que se oculta a lectores de pantalla y al tabulador.
 */
export default function CompactIdentity({ name, shortName, avatar }: Props) {
  // Glass se tipa como <div>, pero con component="a" renderiza un enlace.
  const link = { href: '#top' };
  return (
    <Ios>
      <Glass
        component="a"
        {...link}
        aria-hidden="true"
        tabIndex={-1}
        className="chrome compact-id fixed top-3 left-3 z-50 flex items-center gap-2 rounded-full p-1 pr-3.5 md:top-4 md:left-4 md:hidden xl:flex"
      >
        <img src={avatar.src} srcSet={avatar.srcSet} sizes="32px" width={32} height={32} alt="" className="size-8 rounded-full object-cover" />
        <span className="text-[14px] font-semibold tracking-tight">
          <span className="xl:hidden">{shortName}</span>
          <span className="hidden xl:inline">{name}</span>
        </span>
      </Glass>
    </Ios>
  );
}
