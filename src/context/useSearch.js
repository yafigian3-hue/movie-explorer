import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function useSearch() {
  return useContext(SearchContext);
}