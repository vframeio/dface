/**
 * Root page for component develoment
 * @module pages/faq.js
 */

import FAQ from "components/content/FAQ";
import Layout from "components/common/Layout";

export default function FAQPage() {
  return <FAQ />;
}

FAQPage.getLayout = (page) => (
  <Layout getSidebar={FAQ.getSidebar}>{page}</Layout>
);
