/**
 * Root page for component develoment
 * @module pages/index.js
 */

import App from "components/blur/App";

export default function HomePage() {
  return <App />;
}

HomePage.getLayout = (page) => page;
