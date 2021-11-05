/**
 * Disclaimer page
 * @module components/content/Disclaimer.js
 */

export default function Disclaimer() {
  return (
    <>
      <h2 className="pageTitleBlur">Disclaimer</h2>

      <p>
        It is the sole responsibility of the user to verify the redacted
        portions in images prior to publication. DFACE makes no claim to
        guarantee any image is fully redacted. DFACE uses a neural network face
        detection algorithm to automate the detection of faces in images. While
        this works well for most images, it does not guarantee that every face
        or biometric marker in every situation will be correctly or fully
        detected and redacted.
      </p>

      <h3 className="pagesUBTitle">License</h3>
      <code>
        <p>The MIT License (MIT)</p>
        <p>Copyright © 2021 Adam Harvey (VFRAME.io and ahprojects.com)</p>
        <p>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          “Software”), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
        </p>
        <p>
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </p>
        <p>
          THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </code>
    </>
  );
}

const SIDEBAR = [];

Disclaimer.getSidebar = () => (
  <ul className="toc">
    {SIDEBAR.map((pair) => (
      <li key={pair[0]}>
        <a href={`#${pair[0]}`}>{pair[1]}</a>
      </li>
    ))}
  </ul>
);
