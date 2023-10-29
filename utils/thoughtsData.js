const thoughts = require('../models/thoughts')

const thoughtsData = [
    {
      thoughtText: "This is a thought from lernantino.",
      username: "lernantino"
    },
    {
      thoughtText: "This is a thought from sophia123.",
      username: "sophia123"
    },
    {
      thoughtText: "This is a thought from jack_miller.",
      username: "jack_miller"
    },
    {
      thoughtText: "This is a thought from emily_j.",
      username: "emily_j"
    },
    {
      thoughtText: "This is a thought from charlieB.",
      username: "charlieB"
    },
    {
      thoughtText: "This is a thought from alex_smith.",
      username: "alex_smith"
    },
    {
      thoughtText: "This is a thought from mariaG.",
      username: "mariaG"
    },
    {
      thoughtText: "This is a thought from johnD.",
      username: "johnD"
    },
    {
      thoughtText: "This is a thought from claireH.",
      username: "claireH"
    },
    {
      thoughtText: "This is a thought from robertP.",
      username: "robertP"
    }
  ];
  
  Thoughts.insertMany(thoughtsData)
    .then(data => {
        console.log("Data Inserted Successfully");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });