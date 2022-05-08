import React, { useState } from "react";

const options = [
  { name: "newest", value: "newest" },
  { name: "oldest", value: "oldest" },
  { name: "most terms", value: "most_terms" },
  { name: "least terms", value: "least_terms" },
];

const SortDecksInputs = () => {
  const [currentSort, setCurrentSort] = useState<string>("newest");
  const [sortIsOpen, setSortIsOpen] = useState<boolean>(false);

  return (
    <div className="sort-inputs">
      <button
        className={`${sortIsOpen ? "primary-shadow" : "dark-shadow"}`}
        type="button"
        onClick={() => setSortIsOpen((prev) => !prev)}
      >
        {currentSort}
        {sortIsOpen && (
          <div className="sort-modal">
            {options.map(({ name, value }, index) => {
              return (
                <div key={index} className="option">
                  {name}
                </div>
              );
            })}
          </div>
        )}
      </button>

      <input className="input--find-decks" />
    </div>
  );
};

export default SortDecksInputs;
