import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, default: 'Stay active' },
    team: { type: String, default: 'Solo' },
    points: { type: Number, default: 0 },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    points: { type: Number, default: 0 },
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    username: { type: String, required: true, unique: true },
    team: { type: String, default: 'Solo' },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
}, { timestamps: true });
const workoutSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    description: { type: String, default: '' },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
