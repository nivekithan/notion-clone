import { matchSorter } from "match-sorter";
import React, {} from "react";

type Value = {
  name: string;
  label: string;
  onOptionClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export type MatchSorterInitiator = {
  value: Value; 
  search: string[]; // Multiple serach term to search
}[];

export class MatchSorter {
  list: MatchSorterInitiator;

  value: Value[] = [];

  constructor(list: MatchSorterInitiator) {
    this.list = list;
  }

  search(query: string) {
    this.value = matchSorter(this.list, query, { keys: ["search"] }).map(
      (item) => {
        return item.value;
      }
    );

    return this.value;
  }

  getLastqueryValue() {
    return this.value;
  }
}
