/**
 * Main application layout.
 * @module components/common/Layout
 */

import PropTypes from "prop-types";

import Sidebar from "components/common/Sidebar";
import Footer from "components/common/Footer";

import { isMobile } from "utils/mobile_utils";

export default function Layout({ getSidebar, children }) {
  return (
    <>
      <Sidebar>{getSidebar && getSidebar()}</Sidebar>
      <div className="content container defaultLayout">{children}</div>
      {isMobile && <Footer />}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  getSidebar: PropTypes.func,
};
