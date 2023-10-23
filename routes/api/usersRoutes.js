const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateInfo,
  deleteUser
} = require('../../controllers/usersControls')

router.route('/api/users')
.get(getAllUsers)
.post(createUser)

router.route('/api/users/:userId')
  .get(getSingleUser)
  .put(updateInfo)
  .delete(deleteUser)

module.exports = router;