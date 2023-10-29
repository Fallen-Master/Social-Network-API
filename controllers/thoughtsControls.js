const Thoughts = require('../models/thoughts')
const Users = require('../models/users')

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find()
      res.json(thoughts)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThought(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.id })
      if (!thoughts) {
        return res.status(404).json({ message: `No thought with this ${thoughts} ID found` })
      }
      res.json({thoughts});
    } catch (err) {
      res.status(500)
    }
  },
  async createThoughts(req, res) {
    try {
      const createThoughts = await Thoughts.create(req.body);
     const user = await Users.findOneAndUpdate(
      {username: createThoughts.username},
      {$push: {thoughts: createThoughts._id}},
      {new: true}
      )
      if(!user) {
        return res.status(404).json({ message: `No user with this ${user} ID found` })
      }
      res.json({createThoughts});
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  async updateThoughts(req, res) {
    try {
      const updatedThoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { thoughtText: req.body.thoughtText } },
        { new: true }
      );
      if (!updatedThoughts) {
        return res.status(404).json({ message: 'Thought not found' });
      };
      res.status(200).json({
        username: updatedThoughts.username,
        thoughtText: updatedThoughts.thoughtText,
        originalDate: updatedThoughts.createdAt,
        _id: updatedThoughts._id
      });
    } catch (err) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.id })
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought found with this id' })
      }
      const user = await Users.findOneAndUpdate(
        {username: thoughts.username},
        {$pull: {thoughts: thoughts._id}},
        {new: true}
        )
        if(!user) {
          return res.status(404).json({ message: `No user with this ${user} ID found` })
        }
      res.status(200).json(thoughts)
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
  async createReactions(req, res) {
    try {
      const reactions = await Thoughts.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!reactions) {
        return res.status(404).json({ message: 'something went wrong' })
      }
      res.json(reactions)
    } catch (err) {
      res.status(500).json({ message: 'something went wrong' })
    }
  },
  async deleteReactions(req, res) {
    try {
      const reaction = await Thoughts.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: 'Thought not found' })
      }
      res.json(reaction)
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' })
    }

  }
}

