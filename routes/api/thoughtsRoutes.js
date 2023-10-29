const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions
} = require('../../controllers/thoughtsControls')

router.route('/').get(getAllThoughts).post(createThoughts)

router.route('/:id').get(getThought).put(updateThoughts).delete(deleteThoughts)

router.route('/:thoughtId/reactions').post(createReactions).delete(deleteReactions)


module.exports = router;