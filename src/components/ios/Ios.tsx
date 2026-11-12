import type { ReactNode } from 'react';
import { KonstaProvider } from 'konsta/react';

/**
 * Tema iOS de Konsta para cada árbol de React. En Astro cada sección se renderiza
 * por separado, así que cada una envuelve su contenido con este proveedor.
 * `dark` activa las variantes `dark:` de Konsta (el tema lo controla la clase `.dark` de <html>).
 */
export default function Ios({ children }: { children: ReactNode }) {
  return (
    <KonstaProvider theme="ios" dark>
      {children}
    </KonstaProvider>
  );
}
