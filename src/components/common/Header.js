/**
 * Site header.
 * @module components/common/Header
 */

import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link href="/" passHref>
          <img src="/assets/img/dface_logo.svg" width="150px"/>
        </Link>
      </h1>
      <p className="hello">
        Automatic, private, open-source face redaction by <a href="https://vframe.io">VFRAME.io</a>
      </p>
      <p className="hello-links">
        <Link href="/guide">Guide</Link> - <a href="https://github.com/vframeio/dface">Code</a>
      </p>

    </div>
  );
}
