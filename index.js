const express =  require('express');
const mongoose =  require('mongoose');
const cors = require('cors');

const API_PORT = 3001;
const app = express();
const router = express.Router();
const Schema = mongoose.Schema;

app.use(cors());

const dbURL = 'mongodb://localhost:27017/todos'

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) throw err;

    console.log('Successfully connected');
});

let todoSchema = new Schema({
  todoName: String,
  todoDone: Boolean
}, { collection : 'todoList' })

let todos = mongoose.model('todos', todoSchema);

app.get('/', function(req, res) {
  todos.find({}, function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(todos));
    }
  })
})

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));