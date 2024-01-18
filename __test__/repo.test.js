import { describe, expect, test, assert } from "vitest";
import StoryRepo from "../server/app/repo/story";

const dummy = [
  {
    title: "story 1",
    author: "minerva",
    synopsis: "test synopsis 1",
    category: "Financial",
    tags: ["test tags"],
    coverImage: "image.com",
    states: "Draft",
    chapters: [],
  },
];

describe("Story Repository -- if success", () => {
  const repo = new StoryRepo();
  test("creation", async () => {
    expect(await repo.create(dummy[0]), "OK");
    expect(await repo.create(dummy[0]), "OK");
  });
  test("get all", async () => {
    const stories = await repo.get();
    expect(stories.length, 2);
  });
  test("get one", async () => {
    const story = await repo.getOne(1);
    assert(story);
    expect(story.id, 1);
  });
  test("update", async () => {
    expect(await repo.update(1, {...dummy[0], title: "new title"}), "OK");
    const story = await repo.getOne(1);
    expect(story.title, "new title");
  });
});
