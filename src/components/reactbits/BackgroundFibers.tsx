import { useEffect, useState } from 'react';
import GhostFibers from './GhostFibers';
import { useReducedMotion } from '../../lib/useReducedMotion';

/**
 * Fondo GhostFibers (React Bits) fijo detrás de toda la página: cintas 3D de fibras luminosas con
 * los colores de sistema de iOS (azul → morado según la profundidad).
 * - Ratón: el enfoque sigue al cursor y un clic en el fondo lanza un pulso. Solo con puntero fino:
 *   en móvil el dedo está para hacer scroll, no para jugar con el fondo.
 * - Movimiento reducido: un único cuadro quieto.
 * - Resolución 1,25×: el resplandor y el desenfoque de profundidad ya suavizan el detalle, y con
 *   varias pasadas de bloom no compensa pagar la densidad completa de una pantalla retina.
 * - El componente se pausa solo cuando la pestaña no está visible.
 */
export default function BackgroundFibers() {
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => setFinePointer(window.matchMedia('(pointer: fine)').matches), []);

  return (
    <GhostFibers
      glowColor="#0A84FF"
      secondaryColor="#BF5AF2"
      gradient="depth"
      speed={0.4}
      brightness={0.9}
      vignette={0.45}
      mouseInteraction={finePointer && !reduce}
      paused={reduce}
      intro={!reduce}
      dpr={1.25}
    />
  );
}
