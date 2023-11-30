const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const TasksController = require('../src/tasks/controllers/task.controller');


const app = express();
const router = express.Router(); // Create a router to handle routes

app.use(cors({origin: '*'}));
app.use(bodyParser.json());

app.options('*', cors())

app.all('', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.get('/', (req, res) => {
  res.send('Hello!');
});

//Add Task
router.post('/v1/add-task', (req, res) => {TasksController.addTask(req, res)});

//Update Task
router.put('/v1/tasks/task/update-task/:taskId', (req, res) => {TasksController.updateTask(req, res)});

// Delete Task
router.delete('/v1/tasks/task/delete-task/:taskId', (req, res) => {TasksController.deleteTask(req, res)});

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
