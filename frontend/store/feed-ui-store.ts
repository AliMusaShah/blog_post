"use client";

import { create } from "zustand";

type FeedUiState = {
  query: string;
  tag: string | null;
  page: number;
  setQuery: (query: string) => void;
  setTag: (tag: string | null) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
};

export const useFeedUi = create<FeedUiState>((set) => ({
  query: "",
  tag: null,
  page: 1,
  setQuery: (query) => set({ query, page: 1 }),
  setTag: (tag) => set({ tag, page: 1 }),
  setPage: (page) => set({ page }),
  clearFilters: () => set({ query: "", tag: null, page: 1 }),
}));
