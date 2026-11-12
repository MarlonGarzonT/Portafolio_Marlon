import ProfileCard from './ProfileCard';
import { useIsDark } from '../../lib/useIsDark';

interface Props {
  avatarUrl: string;
  miniAvatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  email: string;
}

/**
 * Tarjeta holográfica ProfileCard (React Bits) con la foto recortada.
 * Sigue el tema claro/oscuro y abre el correo al pulsar "Contáctame".
 * Inclinación con el puntero en escritorio; en móvil se desactiva (en iOS pediría permiso del giroscopio).
 */
export default function AboutCard({ email, ...props }: Props) {
  const dark = useIsDark();
  return (
    <ProfileCard
      {...props}
      theme={dark ? 'dark' : 'light'}
      showUserInfo
      enableTilt
      enableMobileTilt={false}
      onContactClick={() => {
        window.location.href = `mailto:${email}`;
      }}
    />
  );
}
