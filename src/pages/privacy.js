/**
 * Root page for component develoment
 * @module pages/privacy.js
 */

import Privacy from "components/content/Privacy";
import Layout from "components/common/Layout";

export default function PrivacyPage() {
  return <Privacy />;
}

PrivacyPage.getLayout = (page) => (
  <Layout getSidebar={Privacy.getSidebar}>{page}</Layout>
);
