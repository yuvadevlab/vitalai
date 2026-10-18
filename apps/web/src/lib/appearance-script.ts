/**
 * appearanceScript
 *
 * Synchronous blocking script injected into <head> to prevent flash of unstyled theme (FOUC).
 * Runs before the browser paints the first pixel.
 */
export const appearanceScript = `
(function () {
  try {
    var root = document.documentElement;
    var stored = localStorage.getItem('vitalai-theme');
    var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    root.setAttribute('data-brand', 'vitalai');
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'vitalai');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'vitalai-light');
    }
  } catch (e) {}
})();
`;
