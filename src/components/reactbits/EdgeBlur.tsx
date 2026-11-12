import GradualBlur from './GradualBlur';

/**
 * Desenfoque progresivo (GradualBlur de React Bits) fijo en los bordes superior e inferior de la
 * pantalla: el contenido se disuelve al pasar por ellos y el fondo queda siempre a la vista.
 * Es el "efecto de borde de scroll" de iOS. Queda por debajo de la navegación (z 50) y se oculta
 * solo cuando ya estás en ese extremo de la página.
 */
export default function EdgeBlur() {
  return (
    <>
      <GradualBlur target="page" position="top" height="5.5rem" strength={2} layers={6} curve="bezier" autoHide zIndex={40} />
      <GradualBlur target="page" position="bottom" height="6.5rem" strength={2} layers={6} curve="bezier" autoHide zIndex={40} />
    </>
  );
}
