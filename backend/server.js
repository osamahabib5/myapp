const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;
//once function is used to handle an event only once
//connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})
//first endpoint
todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {   //we are getting the data back from the
            //mongo db into response object and
            //passing in todos obj because this is the 
            //data that we are receiving when accessing
            //mongodb db based on mongoose model
            res.json(todos);
        }
    });
});

//we would like to accept incoming HTTP get requests
//and itneeds to be handled by a callback func
todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;   //extract id of incoming
    //req URL  
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

//send an HTTP post req when adding new items to db

todoRoutes.route('/add').post(function (res, req) {
    //retrieve data from request body
    let todo = new Todo(req.body);
    //save to the database
    todo.save().then(todo => {
        res.status(200).json({
            'todo': 'todo added successfuly'
        });
        //inserting done properly 200 is HTTTP SUCCESS CODE
    })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });

});

//update endpoint
todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send('data is not found');
        }
        else {
            //retrieving data from URL that needs to be update
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
        }
        //saving in database
        todo.save().then(todo => {
            res.json('Todo updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });

    });
});
app.use('/todos', todoRoutes);

//this is used to retrieve the connection
app.listen(PORT, function () {
    console.log("Server is runnig on Port: " + PORT);
});
