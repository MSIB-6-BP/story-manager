import Config from "../assets/config.json";

export default class StoryController {
  get({ states, category } = {}, query) {
    return fetch(
      `${Config.base_url}?${states !== "none" ? `states=${states}&` : ""}${
        category !== "none" ? `category=${category}&` : ""
      }${query ? `q=${query}` : ""}`
    )
      .then((response) => response.json())
      .then((response) => {
        return response.map((story) => ({
          ...story,
          chapters: story.chapters.map((chapter) => ({
            ...chapter,
            lastUpdated: new Date(chapter.lastUpdated),
          })),
        }));
      });
  }
  getOne(id) {
    return fetch(`${Config.base_url}/${id}`)
      .then((response) => response.json())
      .then((story) => {
        return {
          ...story,
          chapters: story.chapters.map((chapter) => ({
            ...chapter,
            lastUpdated: new Date(chapter.lastUpdated),
          })),
        };
      });
  }
  create({
    title,
    author,
    synopsis,
    coverImage,
    category,
    states,
    tags,
    chapters,
  }) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    return fetch(Config.base_url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title,
        author,
        synopsis,
        coverImage,
        category,
        states,
        tags,
        chapters,
      }),
    })
      .then((response) => response.text())
      .then((response) => ({
        status: response,
      }));
  }
  update(
    id,
    { title, author, synopsis, coverImage, category, states, tags, chapters }
  ) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    return fetch(`${Config.base_url}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        title,
        author,
        synopsis,
        coverImage,
        category,
        states,
        tags,
        chapters,
      }),
    })
      .then((response) => response.text())
      .then((response) => ({
        status: response,
      }));
  }
}
