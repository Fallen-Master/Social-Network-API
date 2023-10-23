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
      const user = await Users.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')

      if (!user) {
        return res.status(404).json({ message: 'No user does not exsist' })
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
        { _id: req.body.userId },
        req.body,
        { new: true }
      );
      if (!updateInfo) {
        return res.status(404).json({ message: 'User not found' });
      };
      res.status(200).json(updateInfo);
      console.log(`Updated: ${updateInfo}`)
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  async deleteUser(req, res) {
    try {
      const userInfo = await Users.findOneAndDelete({ name: req.params.userId });
      res.status(200).json(userInfo);
      console.log(`Deleted: ${userInfo}`)
    } catch (err) {
      console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
    }
  }
}