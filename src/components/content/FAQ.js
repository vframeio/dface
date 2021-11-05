/**
 * FAQ
 * @module components/content/FAQ.js
 */

import Link from "next/link";

export default function FAQ() {
  return (
    <>
      <h1 className="pageTitleBlur">Frequently Asked Questions</h1>
      <p>Quick answers to frequently asked questions.</p>
      <h3 className="pageSubTitle">How does it work?</h3>
      <p>
        Faces are detected using YOLOV5 face detection models, then redacted or
        blurred using javascipt. It all happens in your browser. Your photos are
        never uploaded or transmitted during processing.
      </p>
      <h3 className="pageSubTitle">Are you storing my photos?</h3>
      <p>
        No. All processing happens in your web browser using pre-compiled face
        detection models. No data is transmitted through the use of this
        application. Once your browser downloads the application files, you can
        run DFACE offline.
      </p>

      <h3 className="pageSubTitle">Who is DFACE?</h3>
      <p>
        DFACE is developed by the VFRAME.io team (Adam Harvey and Jules LaPlace)
        with funding from <a href="https://nlnet.nl/PET">NLnet</a>.
      </p>
      <p>
        For more tips and best practices read the{" "}
        <Link href="/guide">Guide</Link>.
      </p>
    </>
  );
}


const SIDEBAR = [
  // ["", ""],
];

FAQ.getSidebar = () => (
  <ul className="toc">
    {SIDEBAR.map((pair) => (
      <li key={pair[0]}>
        <a href={`#${pair[0]}`}>{pair[1]}</a>
      </li>
    ))}
  </ul>
);
