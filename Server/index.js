const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/todolist', )

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
});
app.put('/update/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findById(id)
        .then(todo => {
            todo.done = !todo.done;
            return todo.save();
        })
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(() => res.json({ message: "Task deleted successfully" }))
    .catch(err => res.status(500).json({ error: err.message }));
});


app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task })
        .then(todo => res.json(todo)) // Send the created todo back
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
    })

