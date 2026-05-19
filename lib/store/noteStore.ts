import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/types/user';

export type NoteDraft = {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
};

export const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: NoteDraft;
  user: User | null;

  setDraft: (draft: Partial<NoteDraft>) => void;

  clearDraft: () => void;

  setUser: (user: User | null) => void;

  clearUser: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,

      user: null,

      setDraft: draft =>
        set(state => ({
          draft: {
            ...state.draft,
            ...draft,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),

      setUser: user =>
        set({
          user,
        }),

      clearUser: () =>
        set({
          user: null,
        }),
    }),
    {
      name: 'note-draft',
    }
  )
);