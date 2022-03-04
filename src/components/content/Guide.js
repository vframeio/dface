/**
 * Guide
 * @module components/content/Guide.js
 */

export default function Guide() {
  return (
    <>
      <h1 className="pageTitleBlur">Guide to Redacting Faces</h1>
      <p>
        DFACE is a web application for redacting and blurring faces. It uses
        client-side neural network face detection to locate faces, which are
        then redacted or blurred using various effects. Photos processed using
        DFACE are never transmitted, shared, stored, or analyzed by DFACE. All
        the processing happens on your device. This means you can use DFACE
        privately, even offline, to redact your photos.
      </p>
      <p>
        VFRAME also provides a command line computer vision tool for redacting
        faces in large collections of media. Visit{" "}
        <a href="https://vframe.io/">VFRAME</a> to learn more about what VFRAME
        does.
      </p>
      <p>
        This preliminary guide will continue to be updated as the DFACE project
        develops further. It is currently formatted to address the most common
        concerns relating to face recognition and the security or privacy of
        images shared online.
      </p>
      
      <h2 className="pageTitle" id="intro">
        FAQ
      </h2>

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

      <h2 className="pageTitle" id="intro">
        Introduction
      </h2>
      <h3 className="pageSubTitle">Why Redact Faces?</h3>
      <p>
        The Internet is a place for sharing, but also a place for large scale
        mass surveillance. Sharing photos with a global community on the
        Internet now carries the risk that any face appearing in a photo may be
        subjected to facial recognition searches. Even in an area as small as
        100x100 pixels, your face may be recognizable. The extent to which your
        face is unique and recognizable across a population is dependent on
        several factors including the relative accuracy of the face recognition
        technology used, the dataset it was trained on, your relative uniqueness
        amongst a population, the quality of the image you appear in, whether
        you are wearing any facial coverings, and the similarity between your
        query and a target image which diverges with age. Obscuring your face
        can degrade the performance of most face recognition systems, but it is
        not possible to determine the effectiveness of a disguise, blocking
        accessory, or anti-surveillance tactic without prior knowledge of the
        face recognition algorithm architecture. Therefore, the recommended
        approach to limit biometric markers (i.e. faces) in imagery is
        redaction.
      </p>

      <p>
        This site provides a set of tools to fully redact faces, using
        rectangles to block out parts of image, and other blurring and
        modification tools to reduce the unique separability of biometric
        information. Whether you want to block out, blur, or pixellate the face
        is a subjective decision made by you, the user, and depends on your
        privacy and security circumstances.
      </p>

      <h3 className="pageSubTitle">Why Use DFACE?</h3>
      <p>
        DFACE is an open source web application that uses client-side face
        detection so that your photos never leave your device. Other, similarily
        intentioned, web applications found during research were flawed in some
        way. Many used server side processing, which requires sharing/uploading
        your image to an online service. Some did not work well at detecting
        faces real world imagery - that is, they were mostly designed for use
        with webcam interaction. Some sites even charged money. In addition to
        the privacy risks of server side processing that requires uploading your
        photos to an unknown third party, it also adds network latency, uses
        unnecessary bandwidth for each upload, and (of course) only works when
        you're online.
      </p>
      <p>
        DFACE addresses these issues by running everything on your device. You
        will need to first download the application, which requires
        approximately 13MB of bandwidth. The files are then cached and available
        for use offline. You can run the model on hundreds or thousands of
        images with no network latency, completely offline, without requiring
        any specialized hardware beyond a laptop or smart phone. DFACE is
        completely free to use.
      </p>

      <h2 className="pageTitle" id="redactions">
        Redactions
      </h2>

      <h3 className="pageSubTitle">Faces</h3>
      <p>
        The main purpose of DFACE is to detect and redact faces using various
        effects. DFACE can detect up to 1,000 faces in an image. Faces smaller
        than 10x10 pixels will likely not be detected. At such low resolution,
        it is not possible to uniquely identify someone using only their face
        against a large database. However, there is still enough information at
        10x10 pixels to estimate skin and hair color, reducing the size of a
        face search space. This means it would be possible to know the
        difference between one person with darker skin and one person with
        lighter skin, or one person with lighter hair and one person with darker
        hair. Visible faces larger than 10x10 pixels should always be
        automatically detected and redacted by DFACE.
      </p>
      <p>
        In addition to blocking out parts of an image, DFACE allows covering the
        detected face with emojis. Prior to adding emojis, the facial areas are
        blurred. This prevents the irregular emoji shapes from inadvertently
        revealing portions of a face.
      </p>

      <h3 className="pageSubTitle">EXIF Data</h3>
      <p>EXIF data is automatically discarded during processing.</p>

      <h2 className="pageTitle" id="disclaimers">
        Disclaimers
      </h2>

      <h3 className="pageSubTitle">Logos and Identifiiable Clothing</h3>
      <p>
        Please be aware that DFACE does not address the issue of other uniquely
        identifiiable information appearing in your photo, which may include
        logos, clothing, locations, tattoos, or other environmental visual
        elements. DFACE is only designed to redact faces. In the future we will
        provide a manual drawing tool to redact other portions of an image.
      </p>

      <h3 className="pageSubTitle">Device Signature Analysis</h3>
      <p>
        Please be aware that DFACE does not address the issue of device
        signature analysis. Device signature analysis invovles exploiting the
        small diferrences in sensors, hardware, and compression algorithms to
        determine the make and model of a phone or camera used to create a
        photo. This is known to provide the ability to tell the difference
        between hundreds of different phones. DFACE does not yet provide any
        tools to address device signature analysis.
      </p>

      <h3 className="pageSubTitle">Non-Face Biometric Markers</h3>
      <p>
        Please be aware that DFACE does not address the issue of biometric
        markers other than faces. Non-face biometric markers include hand size,
        foot size, height, arm length, skin abberations (freckles), or hair
        descriptors. Any part of a body visible in an image may be forensically
        analyzed using other reference markers to determine or estimate details
        about these attributes, which may reveal identity information.
      </p>

      <h2 className="pageTitle" id="other-software">
        Other Software
      </h2>

      <h3 className="pageSubTitle">Signal</h3>
      <p>
        DFACE recommends using{" "}
        <a href="https://www.signal.org/" target="blank">
          Signal
        </a>{" "}
        for on-device face blurring when faces are simple to detect. Signal is
        free, private, secure, and works reasonably well. DFACE provides some
        additional tools not found in Signal including multi-file processing,
        significantly improved detection performance, emojis, and is also
        platform agnostic.
      </p>
    </>
  );
}

const SIDEBAR = [
  ["intro", "Introduction"],
  ["redactions", "Redactions"],
  ["disclaimers", "Disclaimers"],
  ["other-software", "Other Software"],
  // ["", ""],
];

Guide.getSidebar = () => (
  <ul className="toc">
    {SIDEBAR.map((pair) => (
      <li key={pair[0]}>
        <a href={`#${pair[0]}`}>{pair[1]}</a>
      </li>
    ))}
  </ul>
);
