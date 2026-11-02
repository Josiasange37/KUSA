/* Shared by the client Navbar and the server-rendered home sections.
   Must stay free of "use client" so server components receive real values. */

// Order shown in menus and on the home page, as on Jèko: in store, online, links
export const MENU_ORDER = ["paiement-en-boutique", "paiement-en-ligne", "liens-de-paiement"];

export const SOLUTION_ICONS: Record<string, React.ReactNode> = {
  "paiement-en-boutique": <path d="M4 9h16l-1.5 10.5a1 1 0 0 1-1 .5h-11a1 1 0 0 1-1-.5L4 9Zm4 0V7a4 4 0 0 1 8 0v2" />,
  "paiement-en-ligne": <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" />,
  "liens-de-paiement": (
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  ),
};
