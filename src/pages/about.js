/**
 * Root page for component develoment
 * @module pages/about.js
 */

import About from "components/content/About";
import Layout from "components/common/Layout";

export default function AboutPage() {
  return <About />;
}

AboutPage.getLayout = (page) => (
  <Layout getSidebar={About.getSidebar}>{page}</Layout>
);
