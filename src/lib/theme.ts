/** Preferencia de apariencia: automática (sistema), clara u oscura. Misma lógica que el script inline del <head>. */
export type ThemePref = 'system' | 'light' | 'dark';

const KEY = 'theme';

export function readThemePref(): ThemePref {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

function resolve(pref: ThemePref): boolean {
  return pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function paint(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
}

/** Guarda y aplica el tema con un fundido (View Transitions) en vez de un salto brusco de brillo. */
export function setThemePref(pref: ThemePref) {
  try {
    if (pref === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
  } catch {
    // Almacenamiento bloqueado: el tema dura esta visita.
  }
  const dark = resolve(pref);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduce && dark !== document.documentElement.classList.contains('dark')) {
    doc.startViewTransition(() => paint(dark));
  } else {
    paint(dark);
  }
}
