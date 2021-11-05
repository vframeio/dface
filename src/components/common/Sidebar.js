/**
 * Site header.
 * @module components/common/Sidebar
 */

import PropTypes from "prop-types";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { isDesktop } from "utils/mobile_utils";

export default function Sidebar({ children }) {
  return (
    <div className="sidebar">
      <Header />
      <div className="sidebar-content">{children}</div>
      {isDesktop && <Footer />}
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.any,
};
