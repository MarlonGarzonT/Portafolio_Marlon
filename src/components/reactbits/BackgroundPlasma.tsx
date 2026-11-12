import { useEffect, useState } from 'react';
import PlasmaWave from './PlasmaWave';
import { useIsDark, useReducedMotion } from '../../lib/useIsDark';

/**
 * Fondo PlasmaWave (React Bits) fijo detrás de toda la página, adaptado al tema iOS:
 * azul y morado de sistema, con su variante para modo claro.
 * - Movimiento reducido: queda quieto.
 * - Ratón: solo con puntero fino.
 * - El lienzo se pausa solo si la pestaña no está visible.
 */
const DPR = 1.5;

export default function BackgroundPlasma() {
  const dark = useIsDark();
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  // Desplazamiento vertical en píxeles del lienzo (lo que espera el shader): la onda baja a la franja
  // inferior de la pantalla, lejos del texto del inicio. Se recalcula al cambiar el tamaño.
  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
    const update = () => setOffsetY(Math.round(window.innerHeight * Math.min(window.devicePixelRatio || 1, DPR) * 0.24));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <PlasmaWave
      className="size-full"
      lightMode={!dark}
      colors={dark ? ['#0A84FF', '#BF5AF2'] : ['#007AFF', '#AF52DE']}
      speed={0.6}
      yOffset={offsetY}
      rotationDeg={-8}
      // Núcleo menos blanco: el plasma acompaña, no compite con el texto que pasa por encima.
      core={0.3}
      brightness={dark ? 0.8 : 0.95}
      opacity={dark ? 0.85 : 0.7}
      grain={0.03}
      mouseInteraction={finePointer && !reduce}
      paused={reduce}
      intro={!reduce}
      dpr={DPR}
    />
  );
}
