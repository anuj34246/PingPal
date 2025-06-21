// routes/tasks.js
import express from 'express';
import Task from '../models/Task.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const existing = await Task.findOne({ name });
  if (existing) return res.status(400).json({ message: 'Task already exists' });
  const task = new Task({ name });
  await task.save();
  res.status(201).json(task);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;