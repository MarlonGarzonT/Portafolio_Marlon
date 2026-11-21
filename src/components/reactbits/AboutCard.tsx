import ProfileCard from './ProfileCard';

interface Props {
  avatarUrl: string;
  miniAvatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
}

/**
 * Tarjeta holográfica ProfileCard (React Bits) con la foto recortada.
 * Tema oscuro (el sitio es solo oscuro). Sin botón de contacto propio: ya está la sección Contacto
 * justo debajo, y repetirlo aquí duplicaba el correo.
 * Inclinación con el puntero en escritorio; en móvil se desactiva (en iOS pediría permiso del giroscopio).
 */
export default function AboutCard(props: Props) {
  return <ProfileCard {...props} theme="dark" showUserInfo enableTilt enableMobileTilt={false} />;
}
