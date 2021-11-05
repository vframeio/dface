/**
 * Root page for component develoment
 * @module pages/privacy.js
 */

import Terms from "components/content/Terms";
import Layout from "components/common/Layout";

export default function TermsPage() {
  return <Terms />;
}

TermsPage.getLayout = (page) => (
  <Layout getSidebar={Terms.getSidebar}>{page}</Layout>
);
