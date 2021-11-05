/**
 * Root page for component develoment
 * @module pages/faq.js
 */

import Guide from "components/content/Guide";
import Layout from "components/common/Layout";

export default function GuidePage() {
  return <Guide />;
}

GuidePage.getLayout = (page) => (
  <Layout getSidebar={Guide.getSidebar}>{page}</Layout>
);
