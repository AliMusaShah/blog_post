"use client";

import { create } from "zustand";

export type PostDraft = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};

type PostDraftState = {
  draft: PostDraft | null;
  setDraft: (draft: PostDraft) => void;
  clearDraft: () => void;
};

export const usePostDraft = create<PostDraftState>((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
}));
