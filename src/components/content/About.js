/**
 * About page
 * @module components/content/About.js
 */

export default function About() {
  return (
    <>
      <h2 className="pageTitleBlur" id="intro">
        About
      </h2>
      <p>
        DFACE.app redacts and blurs faces in photos without sharing data by
        using client-side neural network face detection (YOLOV5 + TF.js) to keep
        your photos private. This means faces are detected (using Javascript) on
        your computer using only your web browser. Your image is never
        transmitted, shared, or stored in any way. You can even disconnect from
        the Internet and still use DFACE.
      </p>
      <p>
        DFACE is built by the VFRAME.io team (Adam Harvey and Jules LaPlace) in
        Berlin and uses a state-of-the-art object detection algorithm called
        YOLOV5 to detect faces. It first launched on October 29, 2021.
      </p>
      <p>
        DFACE was developed to provide a device-agnostic application for
        redacting and blurring faces in photos. Although many websites appearing
        in search engine results claim to offer "face anonymization", there was
        not yet any website or web application providing performant, private,
        and accessible face redaction. This is the first website, to the best of
        our knowledge, that provides neural network face redaction in your web
        browser.
      </p>
      <h3 className="pageSubTitle" id="funding">
        Funding
      </h3>
      <p>
        This project was funded through the{" "}
        <a href="https://nlnet.nl/PET">NGI0 PET Fund</a>, a fund established by
        NLnet with financial support from the European Commission's{" "}
        <a href="https://ngi.eu/">Next Generation Internet</a> programme, under
        the aegis of DG Communications Networks, Content and Technology under
        grant agreement No 825310.
      </p>
      <h3 className="pageSubTitle" id="developers">
        Developers
      </h3>
      <p>
        DFACE is built and maintained by Adam Harvey and Jules LaPlace. The
        application is developed using Next.js, YOLOV5, and TF.js. The face
        detection neural network model uses the nano architecture provided by{" "}
        <a href="https://github.com/ultralytics/yolov5/">YOLOV5</a> and is only
        13MB. The impressive miniaturization of the YOLOV5 model architecture
        enables significant performance gains compared to earlier neural network
        object detection architectures including SSD MobileNet or Blazeface,
        which are most often designed and implemented for frontal faces in
        webcam interaction. DFACE is designed and well suited for detecting
        small and even partially occluded faces. The models and interface will
        continue to be updated as development progresses.
      </p>
      <div className="bio-images">
        <div>
          <img src="/assets/img/adam-harvey.gif" />
          <div className="caption">
            <strong>Adam Harvey</strong>
            <br />
            Concept, research, computer vision
          </div>
        </div>
        <div>
          <img src="/assets/img/jules-laplace.gif" />
          <div className="caption">
            <strong>Jules LaPlace</strong>
            <br />
            System architecture, application development
          </div>
        </div>
      </div>
    </>
  );
}

const SIDEBAR = [
  ["intro", "Intro"],
  ["funding", "Funding"],
  ["developers", "Developers"],
];

About.getSidebar = () => (
  <ul className="toc">
    {SIDEBAR.map((pair) => (
      <li key={pair[0]}>
        <a href={`#${pair[0]}`}>{pair[1]}</a>
      </li>
    ))}
  </ul>
);
