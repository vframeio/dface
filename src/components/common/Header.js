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
        Use AI locally to redact faces
      </p>

      <p className="hello-links">
        <Link href="/guide">Guide</Link> - <Link href="/faq">FAQ</Link> - <Link href="/about">About</Link>
      </p>

    </div>
  );
}
