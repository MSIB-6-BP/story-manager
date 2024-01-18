import Joi from "joi";

export default class StoryMiddleware {
  validation = (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      synopsis: Joi.string().required(),
      category: Joi.string().valid("Financial", "Technology", "Health"),
      tags: Joi.array().items(Joi.string()),
      coverImage: Joi.string().required(),
      states: Joi.string().required().valid("Draft", "Publish"),
      chapters: Joi.array().items(
        Joi.object({
          lastUpdated: Joi.date().required(),
          title: Joi.string().required(),
          body: Joi.string().required(),
        })
      ),
    });
    const errors = schema.validate(req.body).error;
    if (errors) {
      return res.json({ errors: errors.details });
    }

    next();
  };
  //   validation = () => [
  //     query("title").notEmpty(),
  //     query("author").notEmpty(),
  //     query("synopsis").notEmpty(),
  //     query("category")
  //       .notEmpty()
  //       .isIn(["Financial", "Technology", "Health"]),
  //     query("tags").isArray(),
  //     query("tags.*").notEmpty(),
  //     query("coverImage").notEmpty(),
  //     query("states").notEmpty().isIn(["Draft", "Publish"]),
  //     query("chapters").isArray(),
  //     query("chapters.*.lastUpdated").isDate(),
  //     query("chapters.*.title").notEmpty(),
  //     query("chapters.*.body").notEmpty(),
  //   ];
}
