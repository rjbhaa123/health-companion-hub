import { useState, useEffect, useCallback } from 'react';
import { Workout, WaterIntake, StepCount, Activity, HealthStats } from '@/types/health';

const WORKOUTS_KEY = 'health_tracker_workouts';
const WATER_KEY = 'health_tracker_water';
const STEPS_KEY = 'health_tracker_steps';
const ACTIVITIES_KEY = 'health_tracker_activities';

export function useHealthData(userId: string | undefined) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [waterIntakes, setWaterIntakes] = useState<WaterIntake[]>([]);
  const [stepCounts, setStepCounts] = useState<StepCount[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load data on mount
  useEffect(() => {
    if (!userId) return;
    
    const loadData = <T>(key: string): T[] => {
      const data = localStorage.getItem(key);
      if (!data) return [];
      const parsed: T[] = JSON.parse(data);
      return parsed.filter((item: any) => item.userId === userId);
    };

    setWorkouts(loadData<Workout>(WORKOUTS_KEY));
    setWaterIntakes(loadData<WaterIntake>(WATER_KEY));
    setStepCounts(loadData<StepCount>(STEPS_KEY));
    setActivities(loadData<Activity>(ACTIVITIES_KEY));
  }, [userId]);

  const saveToStorage = <T extends { userId: string }>(key: string, items: T[], userId: string) => {
    const existingData = localStorage.getItem(key);
    const allItems: T[] = existingData ? JSON.parse(existingData) : [];
    const otherUserItems = allItems.filter((item: any) => item.userId !== userId);
    localStorage.setItem(key, JSON.stringify([...otherUserItems, ...items]));
  };

  // Workout methods
  const addWorkout = useCallback((workout: Omit<Workout, 'id' | 'userId' | 'createdAt'>) => {
    if (!userId) return;
    const newWorkout: Workout = {
      ...workout,
      id: crypto.randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
    };
    const updated = [...workouts, newWorkout];
    setWorkouts(updated);
    saveToStorage(WORKOUTS_KEY, updated, userId);
  }, [userId, workouts]);

  const deleteWorkout = useCallback((id: string) => {
    if (!userId) return;
    const updated = workouts.filter(w => w.id !== id);
    setWorkouts(updated);
    saveToStorage(WORKOUTS_KEY, updated, userId);
  }, [userId, workouts]);

  // Water intake methods
  const addWaterIntake = useCallback((amount: number) => {
    if (!userId) return;
    const today = new Date().toISOString().split('T')[0];
    const newIntake: WaterIntake = {
      id: crypto.randomUUID(),
      userId,
      amount,
      date: today,
      createdAt: new Date().toISOString(),
    };
    const updated = [...waterIntakes, newIntake];
    setWaterIntakes(updated);
    saveToStorage(WATER_KEY, updated, userId);
  }, [userId, waterIntakes]);

  // Step count methods
  const addSteps = useCallback((steps: number) => {
    if (!userId) return;
    const today = new Date().toISOString().split('T')[0];
    const existingToday = stepCounts.find(s => s.date === today);
    
    let updated: StepCount[];
    if (existingToday) {
      updated = stepCounts.map(s => 
        s.id === existingToday.id ? { ...s, steps: s.steps + steps } : s
      );
    } else {
      const newSteps: StepCount = {
        id: crypto.randomUUID(),
        userId,
        steps,
        date: today,
        createdAt: new Date().toISOString(),
      };
      updated = [...stepCounts, newSteps];
    }
    setStepCounts(updated);
    saveToStorage(STEPS_KEY, updated, userId);
  }, [userId, stepCounts]);

  // Activity methods
  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'userId' | 'createdAt'>) => {
    if (!userId) return;
    const newActivity: Activity = {
      ...activity,
      id: crypto.randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
    };
    const updated = [...activities, newActivity];
    setActivities(updated);
    saveToStorage(ACTIVITIES_KEY, updated, userId);
  }, [userId, activities]);

  const deleteActivity = useCallback((id: string) => {
    if (!userId) return;
    const updated = activities.filter(a => a.id !== id);
    setActivities(updated);
    saveToStorage(ACTIVITIES_KEY, updated, userId);
  }, [userId, activities]);

  // Calculate stats
  const getStats = useCallback((): HealthStats => {
    const today = new Date().toISOString().split('T')[0];
    const todaySteps = stepCounts.find(s => s.date === today)?.steps || 0;
    const todayWater = waterIntakes
      .filter(w => w.date === today)
      .reduce((sum, w) => sum + w.amount, 0);
    const todayWorkouts = workouts.filter(w => w.date === today).length;

    return {
      totalSteps: todaySteps,
      totalWorkouts: todayWorkouts,
      totalWaterIntake: todayWater,
      totalActivities: activities.filter(a => a.date === today).length,
      stepsGoal: 10000,
      waterGoal: 2000,
      workoutsGoal: 1,
    };
  }, [stepCounts, waterIntakes, workouts, activities]);

  return {
    workouts,
    waterIntakes,
    stepCounts,
    activities,
    addWorkout,
    deleteWorkout,
    addWaterIntake,
    addSteps,
    addActivity,
    deleteActivity,
    getStats,
  };
}
