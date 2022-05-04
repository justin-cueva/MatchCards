import { BsFillTrashFill } from "react-icons/bs";
import { MdDragHandle } from "react-icons/md";
import { HiPlus } from "react-icons/hi";

import "../../styles/create.css";

const Create = () => {
  return (
    <form className="create-page">
      <h2>Create a new deck</h2>
      {[1, 2, 3].map((index) => (
        <div key={index} className="card">
          <div className="toolbar">
            <label className="card-number">{index}</label>
            <div className="card-icons">
              <span className="icon--drag-handle">
                <MdDragHandle />
              </span>
              <span className="icon--trash">
                <BsFillTrashFill />
              </span>
            </div>
          </div>
          <div className="field">
            <input className="card__input" />
            <label className="card__label">TERM</label>
          </div>
          <div className="field">
            <input className="card__input" />
            <label className="card__label">DEFINITION</label>
          </div>
        </div>
      ))}
      <div className="add-card">
        <span className="border-bottom">
          <span className="icon--add">
            <HiPlus />
          </span>
          ADD CARD
        </span>
      </div>
    </form>
  );
};

export default Create;
