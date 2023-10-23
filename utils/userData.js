const mongoose = require('mongoose');
const Users = require('../models/users')
const usersData = [
  {
    username: "lernantino",
    email: "lernantino@gmail.com"
  },
  {
    username: "sophia123",
    email: "sophia123@email.com"
  },
  {
    username: "jack_miller",
    email: "jack.miller@email.com"
  },
  {
    username: "emily_j",
    email: "emily.j@email.com"
  },
  {
    username: "charlieB",
    email: "charlie.b@email.com"
  },
  {
    username: "alex_smith",
    email: "alex.smith@email.com"
  },
  {
    username: "mariaG",
    email: "maria.g@email.com"
  },
  {
    username: "johnD",
    email: "john.d@email.com"
  },
  {
    username: "claireH",
    email: "claire.h@email.com"
  },
  {
    username: "robertP",
    email: "robert.p@email.com"
  }
];
async function seedUsers() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkApi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Users.deleteMany({});
    console.log('Deleted existing user data');

    const insertedUsers = await Users.insertMany(usersData);
    console.table(insertedUsers);
    console.log('Data Inserted Successfully');

    mongoose.connection.close();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error:', error);
  }
}

seedUsers();