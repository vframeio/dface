/**
 * Terms of Service
 * @module components/content/Terms.js
 */

export default function Terms() {
  return (
    <>
      <h2 className="pageTitleBlur">Terms of Use</h2>
      <p>DFACE.app is licensed under the MIT license.</p>

      <code>
        <p>The MIT License (MIT)</p>
        <p>Copyright © 2021 Adam Harvey (ahprojects.com)</p>
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

      <p>
        DFACE.app uses emoji from{" "}
        <a href="https://github.com/twitter/twemoji">twemoji</a> and are
        attributed Twitter, Inc. and other contributors. These graphics are
        licensed under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a>.
      </p>
    </>
  );
}

const SIDEBAR = [
  // ["", ""],
];

Terms.getSidebar = () => (
  <ul className="toc">
    {SIDEBAR.map((pair) => (
      <li key={pair[0]}>
        <a href={`#${pair[0]}`}>{pair[1]}</a>
      </li>
    ))}
  </ul>
);
