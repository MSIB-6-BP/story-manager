import { createContext } from "react";

export const ViewContext = createContext(["", () => {}]);
export const ActiveStory = createContext([-1, () => {}]);
export const ActiveChapter = createContext([-1, () => {}]);
export const Chapters = createContext([[], () => {}]);
export const StoryField = createContext([{}, () => {}]);
export const ReadOnly = createContext([false, () => {}]);
