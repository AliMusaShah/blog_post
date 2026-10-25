export const THEME_KEY = "quill-theme";
export const THEME_EVENT = "quill-theme-change";

export function readDarkTheme() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(THEME_KEY) === "dark";
}

export function applyDarkTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  window.localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeToTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
