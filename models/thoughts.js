const { Schema, model } = require('mongoose')
const reactionsSchema = require('./reactions')

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionsSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
thoughtsSchema.virtual('reactionsCount').get(function () {
  return this.reactions.length
})

const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts