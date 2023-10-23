const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateInfo,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/usersControls')

router.route('/api/users')
.get(getAllUsers)
.post(createUser)

router.route('/api/users/:userId')
  .get(getSingleUser)
  .put(updateInfo)
  .delete(deleteUser)

router.route('/api/users/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)

module.exports = router;