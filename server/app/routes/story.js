import {Router} from "express";

export default function StoryRoutes(StoryController) {
      const router = Router();

      router.get("/", StoryController.getStories);
      router.get("/:id", StoryController.getStory);
      router.post("/", StoryController.createStory);
      router.put("/:id", StoryController.updateStory);

      return router;
}