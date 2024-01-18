import { useContext } from "react";
import {
  ActiveChapter,
  ActiveStory,
  Chapters,
  StoryField,
  ReadOnly,
  ViewContext,
} from "../services/context";

export default function Aside() {
  const setActiveStory = useContext(ActiveStory)[1];
  const setActiveChapter = useContext(ActiveChapter)[1];
  const setView = useContext(ViewContext)[1];
  const setStoryField = useContext(StoryField)[1];
  const setChapters = useContext(Chapters)[1];
  const setReadOnly = useContext(ReadOnly)[1];
  return (
    <aside className="w-1/6 px-2">
      <button
        className="font-medium text-lg underline"
        onClick={() => {
          setActiveStory(-1);
          setActiveChapter(-1);
          setStoryField({});
          setChapters([]);
          setReadOnly(false);
          setView("home");
        }}
      >
        Home
      </button>
    </aside>
  );
}
