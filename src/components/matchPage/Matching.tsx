import { AiOutlineArrowLeft } from "react-icons/ai";

import "../../styles/matchPage/matching.css";

const Matching = () => {
  return (
    <div className="page--matching">
      <div className="matching__header">
        <span className="icon--arrow-left">
          <AiOutlineArrowLeft />
        </span>
      </div>
      <div className="matching__stats">
        <div className="field">
          <label>TIME</label>
          <span className="col-primary">24.8</span>
        </div>
        <div className="field">
          <label>BEST TIME</label>
          <span>50.2</span>
        </div>
      </div>
      <div className="matching__cards">
        <div className={`matching__card ${"term"}`}>term</div>
        <div className={`matching__card ${"definition"}`}>definition</div>
        <div className={`matching__card ${"term"}`}>term</div>
        <div className={`matching__card ${"definition"}`}>definition</div>
        <div className={`matching__card ${"definition"}`}>definition</div>
        <div className={`matching__card ${"term"}`}>term</div>
        <div className={`matching__card ${"term"}`}>term</div>
        <div className={`matching__card ${"definition"}`}>definition</div>
        <div className={`matching__card ${"term"}`}>term</div>
        <div className={`matching__card ${"definition"}`}>definition</div>
        <div className={`matching__card ${"definition"}`}>definition</div>
        <div className={`matching__card ${"term"}`}>term</div>
      </div>
    </div>
  );
};

export default Matching;
