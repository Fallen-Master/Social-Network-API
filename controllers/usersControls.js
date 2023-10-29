const Users = require('../models/users')

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await Users.find();
      res.json(users)
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.params.id }).select("-__V");

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async createUser(req, res) {
    try {
      const userData = await Users.create(req.body);
      res.json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async updateInfo(req, res) {
    try {
      const updateInfo = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          username: req.body.username,
          email: req.body.email
        },
        { new: true }
      );
      if (!updateInfo) {
        return res.status(404).json({ message: 'User not found' });
      };
      res.status(200).json(updateInfo);
    } catch (err) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  async deleteUser(req, res) {
    try {

      const userInfo = await Users.findOneAndDelete({ _id: req.params.id });
      if (!userInfo) {
        return res.status(404).json({ message: 'User with that ID not found' })
      }
      res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  async addFriend(req, res) {
    try {
      const friend = await Users.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: 'No user found with this id' })
      }
      res.json(friend)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async removeFriend(req, res) {
    try {
      const friend = await Users.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: 'No user found with this id' })
      }
      res.json(friend)
    } catch (err) {
      res.status(500).json(err)
    }
  }

}