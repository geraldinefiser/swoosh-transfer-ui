import { type MouseEvent, useState } from "react";

export function useMultiSelect<T>(fullArray: T[]) {
  const [selectedArray, setSelectedArray] = useState<T[]>([]);
  const [lastChecked, setLastChecked] = useState<T | null>(null);

  const wasChecked = (id: T) => selectedArray.includes(id);

  const toggleSelection = (clickedId: T) => {
    if (!wasChecked(clickedId)) {
      setSelectedArray((prev) => [...prev, clickedId]);
    } else {
      setSelectedArray((prev) => prev.filter((id) => id !== clickedId));
    }
  };

  const handleCheck = (e: MouseEvent<HTMLInputElement>, clickedId: T) => {
    if (e.shiftKey && lastChecked) {
      const prevIndex = fullArray.indexOf(lastChecked);
      const clickedIndex = fullArray.indexOf(clickedId);
      let idsInBetween: T[] = [];

      if (prevIndex < clickedIndex) {
        idsInBetween = fullArray.slice(prevIndex, clickedIndex + 1);
      } else {
        idsInBetween = fullArray.slice(clickedIndex, prevIndex + 1);
      }

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
