const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const {createCustomError, CustomAPIError} = require('../errors/custom-error')

//Get All Tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

//Get Single Task
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No Task with id: ${taskId}`, 404))
  }
  res.status(200).json({ task });
});

//Update Single Task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No Task with id: ${taskId}`, 404))
  }
  res.status(200).json({ task });
});

//Create A New Task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//Delete A Task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No Task with id: ${taskId}`, 404))
  }
  // const name = task.name;
  res.status(200).json({ task, msg: "Deleted Successfully" });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
