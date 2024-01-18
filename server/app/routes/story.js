import { Router } from "express";

export default function StoryRoutes(StoryController, StoryMiddleware) {
  const router = Router();

  router.get("/", StoryController.getStories);
  router.get("/:id", StoryController.getStory);
  router.post("/", StoryMiddleware.validation, StoryController.createStory);
  router.put("/:id", StoryMiddleware.validation, StoryController.updateStory);

  return router;
}
