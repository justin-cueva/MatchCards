import { useEffect, useState } from "react";

type Props = {
  setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
  currentSort: string;
  setSearchStr: React.Dispatch<React.SetStateAction<string>>;
  searchStr: string;
};

const options = [
  { name: "newest" },
  { name: "oldest" },
  { name: "most terms" },
  { name: "least terms" },
];

const SortDecksInputs = (props: Props) => {
  const [sortIsOpen, setSortIsOpen] = useState<boolean>(false);

  return (
    <div className="sort-inputs">
      <button
        className={`${sortIsOpen ? "primary-shadow" : "dark-shadow"}`}
        type="button"
        onClick={() => setSortIsOpen((prev) => !prev)}
      >
        {props.currentSort}
        {sortIsOpen && (
          <div className="sort-modal">
            {options.map(({ name }, index) => {
              return (
                <div
                  key={index}
                  className="option"
                  onClick={() => props.setCurrentSort(name)}
                >
                  {name}
                </div>
              );
            })}
          </div>
        )}
      </button>

      <input
        className="input--find-decks"
        placeholder="Search your decks"
        value={props.searchStr}
        onChange={(e) => props.setSearchStr(e.target.value)}
      />
    </div>
  );
};

export default SortDecksInputs;
