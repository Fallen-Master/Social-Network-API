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

router.route('/').get(getAllUsers).post(createUser)

router.route('/:id').get(getSingleUser).put(updateInfo).delete(deleteUser)

router.route('/:userId/friends')

router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend)

module.exports = router;