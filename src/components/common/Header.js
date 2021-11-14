/**
 * Site header.
 * @module components/common/Header
 */

import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link href="/">DFACE</Link>
      </h1>

      <p className="hello">
        <Link href="/guide">Guide</Link> - <Link href="/faq">FAQ</Link> - <Link href="/about">About</Link>
      </p>

      <p className="hello">
        Redact faces privately using neural network face detection in your browser.
      </p>
    </div>
  );
}
