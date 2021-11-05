/**
 * Emoji
 * @module components/common/Emoji.js
 */

import Face1 from "twemoji-emojis/vendor/svg/2764.svg";
import Face2 from "twemoji-emojis/vendor/svg/1f601.svg";
import Face3 from "twemoji-emojis/vendor/svg/1f600.svg";
import Face4 from "twemoji-emojis/vendor/svg/1f605.svg";
import Face5 from "twemoji-emojis/vendor/svg/1f606.svg";
import Face6 from "twemoji-emojis/vendor/svg/1f607.svg";
import Face7 from "twemoji-emojis/vendor/svg/1f609.svg";
import Face8 from "twemoji-emojis/vendor/svg/1f60a.svg";
import Face9 from "twemoji-emojis/vendor/svg/1f60d.svg";
import FaceA from "twemoji-emojis/vendor/svg/1f60e.svg";
import FaceB from "twemoji-emojis/vendor/svg/1f618.svg";
import FaceC from "twemoji-emojis/vendor/svg/1f61c.svg";
import FaceD from "twemoji-emojis/vendor/svg/1f61d.svg";
import FaceE from "twemoji-emojis/vendor/svg/1f634.svg";
import FaceF from "twemoji-emojis/vendor/svg/1f62e.svg";
import FaceG from "twemoji-emojis/vendor/svg/1f643.svg";
import FaceH from "twemoji-emojis/vendor/svg/1f920.svg"; // cowboy
import FaceI from "twemoji-emojis/vendor/svg/1f929.svg";
import FaceJ from "twemoji-emojis/vendor/svg/1f92a.svg";

import HeartA from "twemoji-emojis/vendor/svg/2764.svg";
import HeartB from "twemoji-emojis/vendor/svg/1f496.svg";
import HeartC from "twemoji-emojis/vendor/svg/1f499.svg";
import HeartD from "twemoji-emojis/vendor/svg/1f49a.svg";
import HeartE from "twemoji-emojis/vendor/svg/1f49b.svg";
import HeartF from "twemoji-emojis/vendor/svg/1f49c.svg";

import Halloween1 from "twemoji-emojis/vendor/svg/1f631.svg";
import Halloween2 from "twemoji-emojis/vendor/svg/1f47d.svg";
import Halloween3 from "twemoji-emojis/vendor/svg/1f479.svg";
import Halloween4 from "twemoji-emojis/vendor/svg/1f47b.svg";
import Halloween5 from "twemoji-emojis/vendor/svg/1f383.svg";
import Halloween6 from "twemoji-emojis/vendor/svg/2620.svg"; // skull
import Halloween7 from "twemoji-emojis/vendor/svg/1f921.svg"; // clown
// import Poo from "twemoji-emojis/vendor/svg/1f4a9.svg";

import Animals1 from "twemoji-emojis/vendor/svg/1f981.svg";
import Animals3 from "twemoji-emojis/vendor/svg/1f99d.svg";
import Animals4 from "twemoji-emojis/vendor/svg/1f989.svg";
import Animals5 from "twemoji-emojis/vendor/svg/1f64a.svg";
import Animals6 from "twemoji-emojis/vendor/svg/1f437.svg";
import Animals7 from "twemoji-emojis/vendor/svg/1f438.svg";
import Animals8 from "twemoji-emojis/vendor/svg/1f439.svg";
import Animals9 from "twemoji-emojis/vendor/svg/1f43c.svg";
import AnimalsA from "twemoji-emojis/vendor/svg/1f42f.svg";
import AnimalsB from "twemoji-emojis/vendor/svg/1f42e.svg";
import AnimalsC from "twemoji-emojis/vendor/svg/1f419.svg";
import AnimalsD from "twemoji-emojis/vendor/svg/1f436.svg";

import Fruits1 from "twemoji-emojis/vendor/svg/1f34a.svg";
import Fruits2 from "twemoji-emojis/vendor/svg/1f34b.svg";
import Fruits3 from "twemoji-emojis/vendor/svg/1f34e.svg";
import Fruits4 from "twemoji-emojis/vendor/svg/1f34f.svg";
import Fruits5 from "twemoji-emojis/vendor/svg/1f353.svg";
import Fruits6 from "twemoji-emojis/vendor/svg/1f347.svg";

//

export default function Emoji() {
  return (
    <div className="emoji">
      <div className="faces">
        <img src={Face1.src} />
        <img src={Face2.src} />
        <img src={Face3.src} />
        <img src={Face4.src} />
        <img src={Face5.src} />
        <img src={Face6.src} />
        <img src={Face7.src} />
        <img src={Face8.src} />
        <img src={Face9.src} />
        <img src={FaceA.src} />
        <img src={FaceB.src} />
        <img src={FaceC.src} />
        <img src={FaceD.src} />
        <img src={FaceE.src} />
        <img src={FaceF.src} />
        <img src={FaceG.src} />
        <img src={FaceH.src} />
        <img src={FaceI.src} />
        <img src={FaceJ.src} />
      </div>
      <div className="hearts">
        <img src={HeartA.src} />
        <img src={HeartB.src} />
        <img src={HeartC.src} />
        <img src={HeartD.src} />
        <img src={HeartE.src} />
        <img src={HeartF.src} />
      </div>
      <div className="halloween">
        <img src={Halloween1.src} />
        <img src={Halloween2.src} />
        <img src={Halloween3.src} />
        <img src={Halloween4.src} />
        <img src={Halloween5.src} />
        <img src={Halloween6.src} />
        <img src={Halloween7.src} />
      </div>
      <div className="fruits">
        <img src={Fruits1.src} />
        <img src={Fruits2.src} />
        <img src={Fruits3.src} />
        <img src={Fruits4.src} />
        <img src={Fruits5.src} />
        <img src={Fruits6.src} />
      </div>
      <div className="animals">
        <img src={Animals1.src} />
        <img src={Animals3.src} />
        <img src={Animals4.src} />
        <img src={Animals5.src} />
        <img src={Animals6.src} />
        <img src={Animals7.src} />
        <img src={Animals8.src} />
        <img src={Animals9.src} />
        <img src={AnimalsA.src} />
        <img src={AnimalsB.src} />
        <img src={AnimalsC.src} />
        <img src={AnimalsD.src} />
      </div>
    </div>
  );
}
