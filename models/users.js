const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique:true,
            match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },
        thoughts:[{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends:[{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
            virtuals:true
        },
        id:false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});
// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)