const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const Thoughts = require('./models/thoughts');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.post("/testInsert", async (req, res) => {
//   console.log(req.params)
//   console.log(req.body)
//   try {
//     const result = await Thoughts.create({
//       thoughtText: "Test Thought",
//       username: "Test User"
//     });
//     console.log(result)
//     res.json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
app.use(routes);




db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
