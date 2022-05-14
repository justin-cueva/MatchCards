import { useState, useEffect } from "react";

import { Deck } from "../../reducers/authReducer";

type Props = {
  decks: Deck[];
  currentSort: string;
  searchStr: string;
};

const useSortAndFilter = ({ decks, currentSort, searchStr }: Props) => {
  const [deckOrder, setDeckOrder] = useState<Deck[]>(decks);

  useEffect(() => {
    if (currentSort === "oldest") {
      const newestSorted = decks
        .sort(function (a, b) {
          const aDay = Number(a.date?.split("-")[1]);
          const bDay = Number(b.date?.split("-")[1]);
          return aDay - bDay;
        })
        .sort((a, b) => {
          const aMonth = Number(a.date?.split("-")[0]);
          const bMonth = Number(b.date?.split("-")[0]);
          return aMonth - bMonth;
        })
        .sort((a, b) => {
          const aYear = Number(a.date?.split("-")[2]);
          const bYear = Number(b.date?.split("-")[2]);
          return aYear - bYear;
        });
      setDeckOrder(newestSorted);
    }
    if (currentSort === "newest") {
      const oldestSorted = decks
        .sort(function (a, b) {
          const aDay = Number(a.date?.split("-")[1]);
          const bDay = Number(b.date?.split("-")[1]);
          return bDay - aDay;
        })
        .sort((a, b) => {
          const aMonth = Number(a.date?.split("-")[0]);
          const bMonth = Number(b.date?.split("-")[0]);
          return bMonth - aMonth;
        })
        .sort((a, b) => {
          const aYear = Number(a.date?.split("-")[2]);
          const bYear = Number(b.date?.split("-")[2]);
          return bYear - aYear;
        });
      setDeckOrder(oldestSorted);
    }
    if (currentSort === "least terms") {
      const mostSorted = decks.sort(function (a, b) {
        return a.cards.length - b.cards.length;
      });
      setDeckOrder(mostSorted);
    }
    if (currentSort === "most terms") {
      const leastSorted = decks.sort(function (a, b) {
        return b.cards.length - a.cards.length;
      });
      setDeckOrder(leastSorted);
    }

    setDeckOrder(() => {
      return decks.filter((deck) => {
        return deck.title.toLowerCase().includes(searchStr.toLowerCase());
      });
    });
  }, [currentSort, decks, searchStr]);

  return { deckOrder };
};

export default useSortAndFilter;
