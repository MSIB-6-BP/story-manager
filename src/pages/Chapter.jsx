import { useState, useContext } from "react";
import {
  ActiveChapter,
  Chapters,
  ViewContext,
  StoryField,
  ReadOnly,
} from "../services/context";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Aside from "../components/Aside";

export default function Story() {
  const [activeChapter, setActiveactiveChapter] = useContext(ActiveChapter);
  const [chapters, setChapters] = useContext(Chapters);
  const setView = useContext(ViewContext)[1];
  const [storyField, setStoryField] = useContext(StoryField);
  const readOnly = useContext(ReadOnly)[0];

  const [title, setTitle] = useState(
    (storyField.chapter && storyField.chapter.title) || ""
  );
  const [body, setBody] = useState(
    (storyField.chapter && storyField.chapter.body) || ""
  );

  const showError = () => {
    withReactContent(Swal).fire({
      title: <p>There is a missing value</p>,
    });
  };
  const save = () => {
    if (title === "" || body === "") {
      showError();
      return;
    }
    if (activeChapter < 0) {
      setChapters([
        ...chapters,
        {
          title,
          lastUpdated: new Date(),
          body,
        },
      ]);
    } else {
      chapters[activeChapter] = {
        title,
        lastUpdated: new Date(),
        body,
      };
      setChapters(chapters);
      setActiveactiveChapter(-1);
    }
    setStoryField({ ...storyField, chapter: {} });
    setView("story");
  };

  return (
    <main className="flex">
      <Aside />
      <aside className="flex-grow">
        <section id="head" className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">
            {!readOnly && (activeChapter < 0 ? "Add" : "Edit")} Chapter
          </h1>
        </section>
        <section className="bg-white w-full mt-4 p-4">
          <div className="flex flex-col gap-2 w-full p-1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="border-2 px-2 py-1 rounded-lg"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={readOnly}
            />
          </div>
          <div className="flex flex-col gap-2 w-full p-1">
            <label htmlFor="body">Body</label>
            {readOnly ? (
              <div dangerouslySetInnerHTML={{ __html: body }} />
            ) : (
              <CKEditor
                id={"body"}
                editor={ClassicEditor}
                className="h-90"
                data={body}
                onChange={(_, editor) => {
                  setBody(editor.getData());
                }}
              />
            )}
          </div>
        </section>
        <div className="flex justify-end mt-4 gap-2">
          {readOnly ? (
            <button
              type="button"
              className="px-2 py-1 bg-blue-500 text-white rounded-lg"
              onClick={()=>{
                setStoryField({...storyField, chapter: {}});
                setView("story");
              }}
            >
              Back
            </button>
          ) : (
            <>
              <button
                type="button"
                className="px-2 py-1 bg-gray-300 text-gray-800 rounded-lg"
                onClick={() => setView("story")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-2 py-1 bg-blue-500 text-white rounded-lg"
                onClick={save}
              >
                Save
              </button>
            </>
          )}
        </div>
      </aside>
    </main>
  );
}
