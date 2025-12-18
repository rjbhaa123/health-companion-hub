export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  type: WorkoutType;
  duration: number; // in minutes
  date: string;
  createdAt: string;
}

export type WorkoutType = 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';

export interface WaterIntake {
  id: string;
  userId: string;
  amount: number; // in ml
  date: string;
  createdAt: string;
}

export interface StepCount {
  id: string;
  userId: string;
  steps: number;
  date: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // in minutes
  date: string;
  createdAt: string;
}

export interface HealthStats {
  totalSteps: number;
  totalWorkouts: number;
  totalWaterIntake: number;
  totalActivities: number;
  stepsGoal: number;
  waterGoal: number;
  workoutsGoal: number;
}
