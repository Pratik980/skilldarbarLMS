/**
 * LightModeWrapper — now a simple passthrough.
 *
 * Previously this component fought against the global `html.dark` class by
 * using a MutationObserver to strip it off. That hack is no longer needed
 * because dark mode is now scoped to portal layout divs (AdminLayout /
 * MainLayout) and NEVER applied to <html>. Public pages and auth pages are
 * always in light mode by default.
 *
 * The component is kept as a transparent wrapper so existing imports in
 * Login.jsx / Signup.jsx continue to work without changes.
 */
const LightModeWrapper = ({ children }) => <>{children}</>;

export default LightModeWrapper;
