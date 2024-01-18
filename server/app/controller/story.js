export default class StoryController {
  #repo;
  constructor(StoryRepo) {
    this.#repo = StoryRepo;
  }
  getStories = (req, res) => {
    const category = req.query.category;
    const states = req.query.states;
    const query = req.query.q;
    res.json(this.#repo.get({ category, states }, query));
  };
  getStory = (req, res) => {
    res.json(this.#repo.getOne(parseInt(req.params.id)));
  };
  createStory = (req, res) => {
    this.#repo.create(req.body);
    res.send("OK");
  };
  updateStory = (req, res) => {
    this.#repo.update(parseInt(req.params.id), req.body);
    res.send("OK");
  };
}
