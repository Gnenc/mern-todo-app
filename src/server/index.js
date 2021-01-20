const app = require('./server');
const mongoose = require('mongoose');
const PORT = 5000;

// mongodb://localhost/todo-app for local mongoDB
mongoose.connect("mongodb://mongo:27017/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, () => {
  console.log('connected to DB');
  app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
});
