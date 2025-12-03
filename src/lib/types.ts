// Types para o app de fitness

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  totalWorkouts: number;
  plan: 'free' | 'basic' | 'intermediate' | 'advanced';
  personalTrainer?: PersonalTrainer;
}

export interface PersonalTrainer {
  id: string;
  name: string;
  email: string;
  specialty: string;
  avatar?: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  completed: boolean;
  date: Date;
  xpEarned: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  muscleGroups: string[];
  videoUrl?: string;
  instructions?: string;
}

export interface Set {
  id: string;
  weight: number;
  reps: number;
  rpe?: number; // Rate of Perceived Exertion
  completed: boolean;
  restTime?: number;
}

export interface Medication {
  id: string;
  name: string;
  type: 'ozempic' | 'mounjaro' | 'other';
  dosage: string;
  frequency: string;
  applications: Application[];
  nextApplication: Date;
}

export interface Application {
  id: string;
  date: Date;
  time: string;
  location: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface NutritionGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export interface DailyNutrition {
  date: Date;
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
  goal: NutritionGoal;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  icon: string;
}
