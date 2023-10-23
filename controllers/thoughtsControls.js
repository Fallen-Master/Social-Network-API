const Thoughts = require('../models/thoughts')
const Users = require('../models/users')
const reactionsSchema = require('../models/reactions');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThought(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500)
    }
  },
  async createthoughts(req, res) {
    try {
      const createThoughts = await Thoughts.create(req.body);
      const thoughtSaved = await createThoughts.save();

      const user = await Users.findById(req.body.userId);
      user.thoughts.push(thoughtSaved._id);
      await user.save()
      res.json(thoughtSaved)
    } catch (err) {
      res.status(500)
    }
  },
  async updateThoughts(req, res) {
    try {
      const updatedThoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        {$set: {thoughtText: req.body.thoughtsText}},
        { new: true }
      );
      if (!updatedThoughts) {
        return res.status(404).json({ message: 'Thought not found' });
      };
      res.status(200).json(updatedThoughts);
      console.log(`Updated: ${updatedThoughts}`)
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId})
      if(!thoughts){
        return res.status(404).json({ message: 'No thought found with this id'})
      }
      res.status(200).json(thoughts)
      console.log(`Thought deleted ${thoughts}`)
    } catch(err) {
      res.status(500).json({ message: 'Something went wrong'})
    }
  },
  async createReactions(req, res) {
    try {
      const reactions = await reactionsSchema.findOneAndUpdate(
        { _id: req.params.thought.id },
        { $addToSet: {reactionBody: req.params.}}
      )

    }
  }
}
      
