export default class StoryRepo {
  #stories;
  #counter;
  constructor() {
    this.#stories = [];
    this.#counter = 0;
  }
  get({ category, states } = {}, query) {
    return this.#stories
      .filter((story) => {
        return category ? story.category === category : true;
      })
      .filter((story) => {
        return states ? story.states === states : true;
      })
      .filter((story) => {
        return query
          ? story.author.includes(query) || story.title.includes(query)
          : true;
      });
  }
  getOne(id) {
    return this.#stories.find((story) => story.id === id);
  }
  create({
    title,
    author,
    synopsis,
    category,
    tags,
    coverImage,
    states,
    chapters,
  }) {
    this.#stories.push({
      id: this.#counter,
      title,
      author,
      synopsis,
      category,
      tags,
      coverImage,
      states,
      chapters,
    });
    this.#counter++;
  }
  update(
    id,
    { title, author, synopsis, category, tags, coverImage, states, chapters }
  ) {
    const storyIndex = this.#stories.findIndex((story) => story.id === id);
    this.#stories[storyIndex] = {
      id,
      title,
      author,
      synopsis,
      category,
      tags,
      coverImage,
      states,
      chapters,
    };
  }
}
