import "../../styles/create.css";

const Create = () => {
  return (
    <form className="create-page">
      <h2>Create a new deck</h2>
      {[1, 2, 3].map((index) => (
        <div key={index} className="card">
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
    </form>
  );
};

export default Create;
