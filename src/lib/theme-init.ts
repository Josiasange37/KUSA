/* Plain module (no "use client") so the server layout gets the real string. */
export const THEME_KEY = "kusa-theme";

/* Runs before paint (inlined in <head>) so the page never flashes the wrong theme. */
export const THEME_INIT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;
