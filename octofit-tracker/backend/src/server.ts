import express from 'express';
import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: baseUrl });
});

const getCollectionItems = async (model: any) => {
  try {
    const items = await model.find({}).lean();
    return items;
  } catch (error) {
    return [];
  }
};

app.get('/api/users/', async (_req, res) => {
  const items = await getCollectionItems(User);
  res.json(items);
});

app.post('/api/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get('/api/teams/', async (_req, res) => {
  const items = await getCollectionItems(Team);
  res.json(items);
});

app.post('/api/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get('/api/activities/', async (_req, res) => {
  const items = await getCollectionItems(Activity);
  res.json(items);
});

app.post('/api/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const items = await getCollectionItems(Leaderboard);
  res.json(items);
});

app.post('/api/leaderboard/', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

app.get('/api/workouts/', async (_req, res) => {
  const items = await getCollectionItems(Workout);
  res.json(items);
});

app.post('/api/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at', mongoUri);

    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit backend listening on http://localhost:${port}`);
      console.log(`Codespaces API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
