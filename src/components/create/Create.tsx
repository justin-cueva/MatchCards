import { BsFillTrashFill } from "react-icons/bs";
import { MdDragHandle } from "react-icons/md";
import { HiPlus } from "react-icons/hi";

import "../../styles/create.css";

const Create = () => {
  const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
  };

  return (
    <form onSubmit={(e) => createHandler(e)} className="create-page">
      <div className="flex justify-between items-center mb-3">
        <h2>Create a new deck</h2>
        <button className="btn-create--top btn--create">Create</button>
      </div>
      {[1, 2, 3].map((index) => (
        <div key={index} className="card">
          <div className="toolbar">
            <label className="card-number">{index}</label>
            <div className="card-icons">
              <span className="icon icon--drag-handle">
                <MdDragHandle />
              </span>
              <span className="icon icon--trash">
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
      <button type="button" className="add-card">
        <span className="border-bottom">
          <span className="icon icon--add">
            <HiPlus />
          </span>
          ADD CARD
        </span>
      </button>
      <button className="btn-create--bottom  btn--create">Create</button>
    </form>
  );
};

export default Create;
