/**
 * Privacy
 * @module components/content/Privacy.js
 */

export default function Privacy() {
  return (
    <>
      <h2 className="pageTitleBlur">Privacy Policy</h2>
      <p>
        In simple terms, DFACE does not collection any information about users.
      </p>
      <p>
        DFACE.app is a web application for redacting and blurring faces that
        uses client-side processing to detect and blur faces. By accessing the
        DFACE.app website (the “Site”) you agree to the terms and conditions set
        forth in this privacy notice (“Privacy Notice”). Adam Harvey and VFRAME
        (VFRAME.io) have made possible the availability of the DFACE.app. For
        the purposes of this Privacy Notice, Adam Harvey and VFRAME
        (collectively, “we,” “our,” “us”) are responsible for the processing of
        any personal information in connection with the provision of the
        services on the Site and the DFACE.app Project (together, the “Services)
        and act as the controllers for the processing thereof. This Privacy
        Notice represents our commitment to your right to privacy, giving you a
        clear explanation about how we use your information and your rights over
        that information. The Site has been designed to minimize the amount of
        network requests to third-party services and therefore prioritize the
        privacy of the viewer.
      </p>
      <h3>THIRD-PARTY SERVICES</h3>
      <p>
        In order to provide certain features of the Site, certain third-party
        services are needed. Currently, the Site uses 1 third-party services:
        (1) Digital Ocean Spaces as a content delivery network. This service
        encrypts your requests to their server using HTTPS and does not store
        any cookies or authentication. However, this service may store files in
        your web browser's local cache (local storage) to improve loading
        performance. None of these local storage files are used for analytics,
        tracking, or any similar purpose.
      </p>
      <h3>LINKS TO OTHER WEB SITES</h3>
      <p>
        The Site may contain links to third-party websites. The Site has no
        control over and assumes no responsibility for the content, privacy
        policies, or practices of any third-party web sites or services. You
        acknowledge and agree that the Site (and its creators) shall not be
        responsible or liable, directly or indirectly, for any damage or loss
        caused or alleged to be caused by or in connection with use of or
        reliance on any such content, goods or services available on or through
        any such web sites or services. We advise you to read the terms and
        conditions and privacy policies of any third-party web sites or services
        that you visit.
      </p>

      <h3>INFORMATION WE COLLECT</h3>
      <p>We do collect any information.</p>

      <h3>INFORMATION WE SHARE</h3>
      <p>
        We do not collect or share or make public any information about
        individual site visitors.
      </p>

      <h3>DATA RETENTION</h3>
      <p>We do not retain any data about your vist.</p>

      <h3>CROSS-BORDER PERSONAL DATA TRANSFERS</h3>
      <p>
        Your personal data will not be transferred to any third parties or
        international organizations operating outside of the EEA because it is
        not collected.
      </p>

      <h3>DO NOT TRACK</h3>
      <p>
        Do Not Track (“DNT”) is an optional browser setting that allows you to
        express your preferences regarding tracking by advertisers and other
        third-parties. We do not use tracking technologies therefore DNT has no
        effect on your visit to this site.
      </p>

      <h3>CHANGES</h3>
      <p>
        We reserve the right, at our sole discretion, to modify or replace this
        Privacy Notice at any time. If we decide to change this Privacy Notice
        we will post an alert on the Site.
      </p>

      <h3>EU DATA PROTECTION</h3>
      <p>
        If you believe we have not complied with applicable EU data protection
        laws, you may contact the relevant supervisory authority in your
        respective jurisdiction. A list of these supervisory authorities and
        their contact information can be found at
        https://edpb.europa.eu/about-edpb/board/members_en.
      </p>
    </>
  );
}

const SIDEBAR = [
  // ["", ""],
];

Privacy.getSidebar = () => (
  <ul className="toc">
    {SIDEBAR.map((pair) => (
      <li key={pair[0]}>
        <a href={`#${pair[0]}`}>{pair[1]}</a>
      </li>
    ))}
  </ul>
);
