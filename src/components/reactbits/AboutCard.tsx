import ProfileCard from './ProfileCard';

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
 * Tema oscuro (el sitio es solo oscuro) y abre el correo al pulsar "Correo".
 * Inclinación con el puntero en escritorio; en móvil se desactiva (en iOS pediría permiso del giroscopio).
 */
export default function AboutCard({ email, ...props }: Props) {
  return (
    <ProfileCard
      {...props}
      theme="dark"
      showUserInfo
      enableTilt
      enableMobileTilt={false}
      onContactClick={() => {
        window.location.href = `mailto:${email}`;
      }}
    />
  );
}
