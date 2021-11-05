/**
 * Site footer.
 * @module components/common/Footer
 */

import Link from "next/link";

export default function Footer() {
  return (
    <ul className="footer">
      <li>
        <Link href="/privacy">Privacy</Link> -{" "}
        <Link href="/disclaimer">Disclaimer</Link>
      </li>
      <li className="logo">
        <a href="https://vframe.io" target="_blank">
          <img src="/assets/img/logos_vframe_blue_v.svg" />
        </a>
        <span>
          Made by{" "}
          <a href="https://vframe.io" target="_blank">
            VFRAME.io
          </a>
        </span>
      </li>
      <li className="logo">
        {/*<a href="https://nlnet.nl/PET/" target="_blank">
          <img src="/assets/img/banner-nf-bw.svg" />
        </a>*/}
        <span>
          Funded by{" "}
          <a href="https://nlnet.nl/project/Vframe/" target="_blank">
            NGI0 PET Fund
          </a>
        </span>
      </li>
    </ul>
  );
}
