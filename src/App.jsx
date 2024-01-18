import { useState } from "react";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Chapter from "./pages/Chapter";
import {
  ActiveStory,
  ActiveChapter,
  ViewContext,
  Chapters,
  StoryField,
  ReadOnly,
} from "./services/context";
import StoryController from "./services/storyController";
import Header from "./components/Header";

function App() {
  const [activeStory, setActiveStory] = useState(-1);
  const [activeChapter, setActiveChapter] = useState(-1);
  const [view, setView] = useState("home");
  const [chapters, setChapters] = useState([]);
  const [storyField, setStoryField] = useState({});
  const [readOnly, setReadOnly] = useState(false);

  const storyController = new StoryController();
  return (
    <ViewContext.Provider value={[view, setView]}>
      <ActiveStory.Provider value={[activeStory, setActiveStory]}>
        <ActiveChapter.Provider value={[activeChapter, setActiveChapter]}>
          <Chapters.Provider value={[chapters, setChapters]}>
            <StoryField.Provider value={[storyField, setStoryField]}>
              <ReadOnly.Provider value={[readOnly, setReadOnly]}>
                <Header />
                {view === "home" ? (
                  <Home controller={storyController} />
                ) : view === "story" ? (
                  <Story controller={storyController} />
                ) : view === "chapter" ? (
                  <Chapter />
                ) : (
                  <></>
                )}
              </ReadOnly.Provider>
            </StoryField.Provider>
          </Chapters.Provider>
        </ActiveChapter.Provider>
      </ActiveStory.Provider>
    </ViewContext.Provider>
  );
}

export default App;
