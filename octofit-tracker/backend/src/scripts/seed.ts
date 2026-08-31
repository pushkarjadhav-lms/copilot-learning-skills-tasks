import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        username: 'milesrunner',
        email: 'miles@example.com',
        name: 'Miles Runner',
        fitnessGoal: 'Increase endurance',
        team: 'Storm Squad',
        points: 120,
      },
      {
        username: 'sarahstrong',
        email: 'sarah@example.com',
        name: 'Sarah Strong',
        fitnessGoal: 'Build strength',
        team: 'Storm Squad',
        points: 98,
      },
      {
        username: 'leoathlete',
        email: 'leo@example.com',
        name: 'Leo Athlete',
        fitnessGoal: 'Stay consistent',
        team: 'Velocity Crew',
        points: 88,
      },
    ]);

    await Team.insertMany([
      { name: 'Storm Squad', captain: 'milesrunner', members: ['milesrunner', 'sarahstrong'], points: 218 },
      { name: 'Velocity Crew', captain: 'leoathlete', members: ['leoathlete'], points: 88 },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        username: 'milesrunner',
        type: 'Run',
        duration: 35,
        calories: 420,
        notes: 'Morning 5K training',
      },
      {
        userId: users[1]._id,
        username: 'sarahstrong',
        type: 'Strength',
        duration: 45,
        calories: 380,
        notes: 'Upper body focus',
      },
    ]);

    await Leaderboard.insertMany([
      { username: 'milesrunner', team: 'Storm Squad', points: 120, rank: 1 },
      { username: 'sarahstrong', team: 'Storm Squad', points: 98, rank: 2 },
      { username: 'leoathlete', team: 'Velocity Crew', points: 88, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: '5K Tempo Run',
        category: 'Cardio',
        duration: 30,
        difficulty: 'intermediate',
        description: 'Steady-paced run to improve aerobic performance.',
      },
      {
        name: 'Core Circuit',
        category: 'Strength',
        duration: 20,
        difficulty: 'beginner',
        description: 'Focus on balance, posture, and core engagement.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
