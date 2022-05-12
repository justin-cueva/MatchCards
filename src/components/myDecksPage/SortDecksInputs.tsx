import { useState } from "react";
import { BsSearch } from "react-icons/bs";

type Props = {
  setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
  currentSort: string;
};

const options = [
  { name: "newest", value: "newest" },
  { name: "oldest", value: "oldest" },
  { name: "most terms", value: "most_terms" },
  { name: "least terms", value: "least_terms" },
];

const SortDecksInputs = ({ setCurrentSort, currentSort }: Props) => {
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
                <div
                  key={index}
                  className="option"
                  onClick={() => setCurrentSort(name)}
                >
                  {name}
                </div>
              );
            })}
          </div>
        )}
      </button>

      <input className="input--find-decks" placeholder="Search your sets" />
    </div>
  );
};

export default SortDecksInputs;
