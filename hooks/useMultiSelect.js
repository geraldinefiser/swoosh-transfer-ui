import { useState } from "react";

export function useMultiSelect(fullArray) {
  const [selectedArray, setSelectedArray] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  const wasChecked = (id) => selectedArray.includes(id);

  const toggleSelection = (clickedId) => {
    if (!wasChecked(clickedId)) {
      setSelectedArray((prev) => [...prev, clickedId]);
    } else {
      setSelectedArray((prev) => prev.filter((id) => id !== clickedId));
    }
  };

  const handleCheck = (e, clickedId) => {
    if (e.shiftKey) {
      const prevIndex = fullArray.indexOf(lastChecked);
      const clickedIndex = fullArray.indexOf(clickedId);
      let idsInBetween = null;

      if (prevIndex < clickedIndex) {
        idsInBetween = fullArray.slice(prevIndex, clickedIndex + 1);
      } else {
        idsInBetween = fullArray.slice(clickedIndex, prevIndex + 1);
      }
      console.log(prevIndex, clickedIndex);
      console.log(idsInBetween);

      if (wasChecked(clickedId)) {
        // deselect all in between
        setSelectedArray((prev) =>
          prev.filter((id) => !idsInBetween.includes(id))
        );
      } else {
        // select all in between
        setSelectedArray((prev) => [...prev, ...idsInBetween]);
      }
    } else {
      toggleSelection(clickedId);
    }
    setLastChecked(clickedId);
  };

  return { selectedArray, handleCheck };
}
