import { HashRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";

/**
 * Hash-based routes are intentional: GitHub Pages does not rewrite
 * /publications or /service to index.html for a client-side router.
 * /rocky_202x/#/publications works for direct links and refreshes.
 */
export default function App() {
  return <HashRouter><PortfolioSite /></HashRouter>;
}
