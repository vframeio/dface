/**
 * Root page for component develoment
 * @module pages/faq.js
 */

import Disclaimer from "components/content/Disclaimer";
import Layout from "components/common/Layout";

export default function DisclaimerPage() {
  return <Disclaimer />;
}

DisclaimerPage.getLayout = (page) => (
  <Layout getSidebar={Disclaimer.getSidebar}>{page}</Layout>
);
