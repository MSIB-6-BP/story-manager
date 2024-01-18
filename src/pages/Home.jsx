/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import {
  ActiveStory,
  ViewContext,
  StoryField,
  Chapters,
  ReadOnly,
} from "../services/context";
import Modal from "../components/Modal";
import Aside from "../components/Aside";

// eslint-disable-next-line react/prop-types
export default function Home({ controller }) {
  const setActiveStory = useContext(ActiveStory)[1];
  const setView = useContext(ViewContext)[1];
  const setStoryField = useContext(StoryField)[1];
  const setChapters = useContext(Chapters)[1];
  const setReadOnly = useContext(ReadOnly)[1];

  const [stories, setStories] = useState([]);
  const [query, setQuery] = useState("");
  const [filterCategoryBuffer, setFilterCategoryBuffer] = useState("none");
  const [filterCategory, setFilterCategory] = useState("none");
  const [filterStatesBuffer, setFilterStatesBuffer] = useState("none");
  const [filterStates, setFilterStates] = useState("none");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    controller.get().then((response) => {
      setStories(response);
    });
  }, [controller]);

  useEffect(() => {
    controller
      // eslint-disable-next-line react/prop-types
      .get(
        {
          category: filterCategory,
          states: filterStates,
        },
        query
      )
      .then((response) => {
        setStories(response);
      });
  }, [filterCategory, filterStates, query, controller]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const resetFilter = () => {
    setFilterCategoryBuffer("none");
    setFilterStatesBuffer("none");
    setFilterCategory("none");
    setFilterStates("none");
    toggleFilter();
  };
  const cancelFilter = () => {
    setFilterCategoryBuffer(filterCategory);
    setFilterStatesBuffer(filterStates);
    toggleFilter();
  };
  const filter = () => {
    setFilterCategory(filterCategoryBuffer);
    setFilterStates(filterStatesBuffer);
    toggleFilter();
  };

  return (
    <main className="flex">
      {showFilter && (
        <Modal>
          <div className="bg-white p-4 w-1/4 flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Filter</h1>
            <div className="flex flex-col">
              <label htmlFor="category_filter">Category</label>
              <select
                id="category_filter"
                className="border-2 px-2 py-1 rounded-lg"
                onChange={(e) => setFilterCategoryBuffer(e.target.value)}
                value={filterCategoryBuffer || ""}
              >
                <option value="none">None</option>
                <option value="Financial">Financial</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="status_filter">Status</label>
              <select
                id="status_filter"
                className="border-2 px-2 py-1 rounded-lg"
                onChange={(e) => setFilterStatesBuffer(e.target.value)}
                value={filterStatesBuffer || ""}
              >
                <option value="none">None</option>
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="px-2 py-1 rounded-lg bg-gray-300 text-gray-800"
                onClick={resetFilter}
              >
                Reset
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg bg-gray-300 text-gray-800"
                  onClick={cancelFilter}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg bg-blue-500 text-white"
                  onClick={filter}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <Aside />
      <aside className="flex-grow">
        <section id="head" className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">List Story</h1>
          <div className="flex gap-2">
            <input
              type="text"
              className="border-2 px-4 py-1 rounded-lg"
              id="search"
              placeholder="Search by writer's name/title story"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
            />
            <button
              type="button"
              className="px-2 py-1 bg-gray-300 text-gray-800 rounded-lg"
              onClick={toggleFilter}
            >
              Filter
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-blue-500 text-white rounded-lg"
              onClick={() => setView("story")}
            >
              Add Story
            </button>
          </div>
        </section>
        <table className="w-full mt-4 bg-white">
          <thead>
            <tr>
              <th className="border-2 p-1">Title</th>
              <th className="border-2 p-1">Author</th>
              <th className="border-2 p-1">Category</th>
              <th className="border-2 p-1">Tags</th>
              <th className="border-2 p-1">Status</th>
              <th className="border-2 p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story, i) => {
              return (
                <tr key={i}>
                  <td className="text-center border-2">{story.title}</td>
                  <td className="text-center border-2">{story.author}</td>
                  <td className="text-center border-2">{story.category}</td>
                  <td className="text-center border-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      {story.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 rounded-lg bg-slate-200"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="text-center border-2 px-1">
                    <div className="px-2 py-1 rounded-lg bg-slate-200">
                      {story.states}
                    </div>
                  </td>
                  <td className="text-center border py-1 flex justify-center gap-2">
                    <button
                      className="px-2 py-1 rounded-lg bg-blue-500 text-white"
                      onClick={async () => {
                        const storyField = await controller.getOne(story.id);
                        setStoryField(storyField);
                        setChapters(storyField.chapters);
                        setReadOnly(true);
                        setView("story");
                      }}
                    >
                      Detail
                    </button>
                    <button
                      className="px-2 py-1 rounded-lg bg-yellow-400 text-gray-800"
                      onClick={async () => {
                        setActiveStory(story.id);
                        const storyField = await controller.getOne(story.id);
                        setStoryField(storyField);
                        setChapters(storyField.chapters);
                        setView("story");
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </aside>
    </main>
  );
}
