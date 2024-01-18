import { useState, useContext, useEffect } from "react";
import {
  ActiveStory,
  ActiveChapter,
  ViewContext,
  Chapters,
  StoryField,
  ReadOnly,
} from "../services/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Aside from "../components/Aside";

// eslint-disable-next-line react/prop-types
export default function Story({ controller }) {
  const [activeStory, setActiveStory] = useContext(ActiveStory);
  const setActiveChapter = useContext(ActiveChapter)[1];
  const [chapters, setChapters] = useContext(Chapters);
  const setView = useContext(ViewContext)[1];
  const [storyField, setStoryField] = useContext(StoryField);
  const [readOnly, setReadOnly] = useContext(ReadOnly);

  const [title, setTitle] = useState(storyField.title || "");
  const [author, setAuthor] = useState(storyField.author || "");
  const [synopsis, setSynopsis] = useState(storyField.synopsis || "");
  const [coverImage, setCoverImage] = useState(storyField.coverImage || "");
  const [category, setCategory] = useState(storyField.category || "Financial");
  const [states, setStates] = useState(storyField.states || "Draft");
  const [tags, setTags] = useState(storyField.tags || []);
  const [tagBuffer, setTagBuffer] = useState(storyField.tagBuffer || "");

  useEffect(() => {
    setStoryField({
      title,
      author,
      synopsis,
      coverImage,
      category,
      states,
      tags,
      tagBuffer,
    });
  }, [
    title,
    author,
    synopsis,
    coverImage,
    category,
    states,
    tags,
    tagBuffer,
    setStoryField,
  ]);

  const showError = () => {
    withReactContent(Swal).fire({
      title: <p>There is a missing value</p>,
    });
  };
  const save = async () => {
    if (title === "" || author === "" || synopsis === "" || coverImage === "") {
      showError();
      return;
    }
    if (activeStory < 0) {
      // eslint-disable-next-line react/prop-types
      await controller.create({
        title,
        author,
        synopsis,
        coverImage,
        category,
        states,
        tags,
        chapters,
      });
    } else {
      // eslint-disable-next-line react/prop-types
      await controller.update(activeStory, {
        title,
        author,
        synopsis,
        coverImage,
        category,
        states,
        tags,
        chapters,
      });
      console.log(states);
      setActiveStory(-1);
    }
    setStoryField({});
    setChapters([]);
    setView("home");
  };
  const cancel = () => {
    setActiveStory(-1);
    setStoryField({});
    setChapters([]);
    setView("home");
  };
  return (
    <main className="flex">
      <Aside />
      <aside className="flex-grow">
        <section id="head" className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">
            {!readOnly && (activeStory < 0 ? "Add" : "Edit")} Story
          </h1>
        </section>
        <section className="bg-white w-full mt-4 p-4">
          <div className="flex">
            <div className="flex flex-col gap-2 w-1/2 p-1">
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
            <div className="flex flex-col gap-2 w-1/2 p-1">
              <label htmlFor="author">Writer Name</label>
              <input
                type="text"
                id="author"
                className="border-2 px-2 py-1 rounded-lg"
                placeholder="Writer Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full p-1">
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              id="synopsis"
              rows="10"
              className="border-2 px-2 py-1 rounded-lg"
              placeholder="Synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              disabled={readOnly}
            />
          </div>
          <div className="flex">
            <div className="flex flex-col gap-2 w-1/2 p-1">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="border-2 px-2 py-1 rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={readOnly}
              >
                <option value="Financial">Financial</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2 p-1">
              <label htmlFor="tags">Tags</label>
              <div className="border-2 px-2 py-1 rounded-lg flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-2 rounded bg-blue-300 text-white"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (!readOnly) {
                          setTags(tags.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      {tag}
                      {!readOnly && " x"}
                    </button>
                  </div>
                ))}
                {!readOnly && (
                  <input
                    type="text"
                    id="tags"
                    placeholder="Tags"
                    className="flex-grow"
                    onChange={(e) => setTagBuffer(e.target.value)}
                    value={tagBuffer}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tagBuffer !== "") {
                        setTags([...tags, tagBuffer]);
                        setTagBuffer("");
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-2 w-1/2 p-1">
              <label htmlFor="coverImage">Cover Image</label>
              <input
                type="text"
                id="coverImage"
                className="border-2 px-2 py-1 rounded-lg"
                placeholder="Cover Image URL"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                disabled={readOnly}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2 p-1">
              <label htmlFor="states">States</label>
              <select
                id="states"
                className="border-2 px-2 py-1 rounded-lg"
                value={states}
                onChange={(e) => setStates(e.target.value)}
                disabled={readOnly}
              >
                <option value="Draft">Draft</option>
                <option value="Publish">Publish</option>
              </select>
            </div>
          </div>
          <hr className="w-full my-2" />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="px-2 py-1 bg-blue-500 text-white rounded-lg"
              onClick={() => setView("chapter")}
            >
              Add Chapter
            </button>
          </div>
          <table className="mt-4 w-full">
            <thead>
              <tr>
                <th className="border-2 p-1">Title</th>
                <th className="border-2 p-1">Last Updated</th>
                <th className="border-2 p-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter, i) => {
                return (
                  <tr key={i}>
                    <td className="text-center border-2">{chapter.title}</td>
                    <td className="text-center border-2">
                      {chapter.lastUpdated.toISOString()}
                    </td>
                    <td className="text-center border-2 py-1">
                      {readOnly ? (
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded-lg"
                          onClick={() => {
                            setStoryField({
                              ...storyField,
                              chapter: chapters[i],
                            });
                            setView("chapter");
                          }}
                        >
                          Show
                        </button>
                      ) : (
                        <button
                          className="px-2 py-1 rounded-lg bg-yellow-400 text-gray-800"
                          onClick={() => {
                            setActiveChapter(i);
                            setStoryField({
                              ...storyField,
                              chapter: chapters[i],
                            });
                            setView("chapter");
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <div className="flex justify-end mt-4 gap-2">
          {readOnly ? (
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded-lg"
              onClick={() => {
                setReadOnly(false);
                setStoryField({});
                setChapters([]);
                setView("home");
              }}
            >
              Back
            </button>
          ) : (
            <>
              <button
                type="button"
                className="px-2 py-1 bg-gray-300 text-gray-800 rounded-lg"
                onClick={cancel}
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
