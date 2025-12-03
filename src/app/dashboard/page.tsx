'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Dumbbell, 
  Apple, 
  Pill, 
  Trophy, 
  Target, 
  TrendingUp,
  Calendar,
  Clock,
  Flame,
  Droplet,
  CheckCircle2,
  Plus,
  Play,
  ChevronRight,
  X,
  Settings,
  Bell,
  HelpCircle,
  Users,
  Ruler,
  Footprints
} from 'lucide-react';
import GamificationCard from '@/components/custom/gamification-card';
import ThemeToggle from '@/components/custom/theme-toggle';
import { User, Achievement, Workout, Medication, DailyNutrition } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  
  // Estados para modais
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showNewWorkoutModal, setShowNewWorkoutModal] = useState(false);
  const [showNewMedicationModal, setShowNewMedicationModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Mock data - em produção viria do backend
  const [user] = useState<User>({
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    streak: 7,
    totalWorkouts: 45,
    plan: 'intermediate'
  });

  const [achievements] = useState<Achievement[]>([
    { id: '1', title: 'Primeira Série', description: 'Complete sua primeira série', icon: '🎯', xpReward: 50, unlocked: true, unlockedAt: new Date() },
    { id: '2', title: 'Sequência de 7 dias', description: 'Treine 7 dias seguidos', icon: '🔥', xpReward: 200, unlocked: true, unlockedAt: new Date() },
    { id: '3', title: 'Mestre dos Pesos', description: 'Levante 1000kg total', icon: '💪', xpReward: 300, unlocked: true },
    { id: '4', title: 'Hidratação Perfeita', description: 'Beba 3L de água por 7 dias', icon: '💧', xpReward: 150, unlocked: false },
    { id: '5', title: 'Maratonista', description: 'Complete 50 treinos', icon: '🏃', xpReward: 500, unlocked: false }
  ]);

  const [todayWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Treino A - Peito e Tríceps',
      exercises: [],
      duration: 60,
      completed: false,
      date: new Date(),
      xpEarned: 150
    },
    {
      id: '2',
      name: 'Treino B - Costas e Bíceps',
      exercises: [],
      duration: 55,
      completed: false,
      date: new Date(),
      xpEarned: 150
    }
  ]);

  const [medications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Ozempic',
      type: 'ozempic',
      dosage: '0.5mg',
      frequency: 'Semanal',
      applications: [],
      nextApplication: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [nutrition] = useState<DailyNutrition>({
    date: new Date(),
    consumed: {
      calories: 1450,
      protein: 95,
      carbs: 180,
      fat: 45,
      water: 2.1
    },
    goal: {
      calories: 2200,
      protein: 150,
      carbs: 250,
      fat: 70,
      water: 3.0
    }
  });

  const [notifications] = useState([
    { id: '1', title: 'Hora do treino!', message: 'Seu treino de hoje está esperando', time: '2h atrás', unread: true },
    { id: '2', title: 'Nova conquista desbloqueada', message: 'Você ganhou "Sequência de 7 dias"', time: '5h atrás', unread: true },
    { id: '3', title: 'Lembrete de água', message: 'Beba mais 500ml de água', time: '1d atrás', unread: false }
  ]);

  const caloriesPercentage = (nutrition.consumed.calories / nutrition.goal.calories) * 100;
  const proteinPercentage = (nutrition.consumed.protein / nutrition.goal.protein) * 100;
  const waterPercentage = (nutrition.consumed.water / nutrition.goal.water) * 100;

  // Funções de interação
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStartWorkout = (workout: Workout) => {
    showToast(`Iniciando ${workout.name}!`, 'success');
    setShowWorkoutModal(false);
    router.push('/dashboard/workouts');
  };

  const handleRegisterMeal = () => {
    showToast('Refeição registrada com sucesso!', 'success');
    setShowMealModal(false);
  };

  const handleRegisterMedication = () => {
    showToast('Aplicação registrada com sucesso!', 'success');
    setShowMedicationModal(false);
  };

  const handleAddWater = () => {
    showToast('+ 250ml de água adicionados!', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top">
          <div className={`${
            toast.type === 'success' 
              ? 'bg-green-500' 
              : 'bg-blue-500'
          } text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3`}>
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-2">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Evoluir+
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Olá, {user.name}! 👋</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {/* Botão Notificações */}
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Botão Ajuda */}
              <button
                onClick={() => router.push('/dashboard/help')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <HelpCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              {/* Botão Configurações */}
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-purple-900 dark:text-purple-300">Nível {user.level}</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {/* Calorias - Clicável */}
          <button
            onClick={() => router.push('/dashboard/nutrition')}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-2">
                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Calorias</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{nutrition.consumed.calories}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">de {nutrition.goal.calories} kcal</p>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all"
                style={{ width: `${Math.min(caloriesPercentage, 100)}%` }}
              />
            </div>
          </button>

          {/* Água - Clicável */}
          <button 
            onClick={handleAddWater}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
                <Droplet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Água</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{nutrition.consumed.water}L</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">de {nutrition.goal.water}L</p>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all"
                style={{ width: `${Math.min(waterPercentage, 100)}%` }}
              />
            </div>
          </button>

          {/* Passos - Clicável */}
          <button
            onClick={() => router.push('/dashboard/steps')}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
                <Footprints className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Passos</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">7,234</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">de 10,000</p>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                style={{ width: '72%' }}
              />
            </div>
          </button>

          {/* Proteína */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2">
                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Proteína</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{nutrition.consumed.protein}g</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">de {nutrition.goal.protein}g</p>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all"
                style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Medição Corporal - Clicável */}
          <button
            onClick={() => router.push('/dashboard/measurements')}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-2">
                <Ruler className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Medição</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">18.5%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Gordura corporal</p>
            <div className="mt-2 flex items-center gap-1 text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4 rotate-180" />
              <span className="text-xs font-semibold">-0.7%</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Workouts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-2">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Treinos de Hoje</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Escolha um treino para começar</p>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/dashboard/workouts')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Novo
                </button>
              </div>

              <div className="space-y-3">
                {todayWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{workout.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{workout.duration} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span>+{workout.xpEarned} XP</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleStartWorkout(workout)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all group-hover:scale-110"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-2">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Medicamentos</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monitore suas aplicações</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowNewMedicationModal(true)}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar
                </button>
              </div>

              <div className="space-y-3">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{med.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{med.dosage} - {med.frequency}</p>
                      </div>
                      <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {med.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Próxima aplicação: {med.nextApplication.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <button 
                      onClick={handleRegisterMedication}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition-all"
                    >
                      Registrar Aplicação
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-2">
                    <Apple className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nutrição</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Acompanhe suas macros</p>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/dashboard/nutrition')}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1"
                >
                  Ver detalhes
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - caloriesPercentage / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(caloriesPercentage)}%</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Calorias</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{nutrition.consumed.calories}/{nutrition.goal.calories}</p>
                </div>

                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#a855f7"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - proteinPercentage / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(proteinPercentage)}%</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Proteína</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{nutrition.consumed.protein}/{nutrition.goal.protein}g</p>
                </div>

                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - waterPercentage / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(waterPercentage)}%</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Água</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{nutrition.consumed.water}/{nutrition.goal.water}L</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gamification */}
          <div className="space-y-6">
            <GamificationCard user={user} achievements={achievements} />

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => router.push('/dashboard/workouts')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
                >
                  <Dumbbell className="w-5 h-5" />
                  Iniciar Treino
                </button>
                <button 
                  onClick={() => router.push('/dashboard/nutrition')}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
                >
                  <Apple className="w-5 h-5" />
                  Registrar Refeição
                </button>
                <button 
                  onClick={() => router.push('/dashboard/personal')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Personal Trainer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal - Notificações */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNotifications(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Notificações</h3>
              <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl border-2 ${
                    notif.unread 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{notif.title}</h4>
                    {notif.unread && <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal - Novo Treino */}
      {showNewWorkoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNewWorkoutModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Novo Treino</h3>
              <button onClick={() => setShowNewWorkoutModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Funcionalidade em desenvolvimento. Em breve você poderá criar treinos personalizados!</p>
            <button 
              onClick={() => setShowNewWorkoutModal(false)}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold"
            >
              Entendi
            </button>
          </div>
        </div>
      )}

      {/* Modal - Nova Medicação */}
      {showNewMedicationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNewMedicationModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Adicionar Medicamento</h3>
              <button onClick={() => setShowNewMedicationModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Funcionalidade em desenvolvimento. Em breve você poderá adicionar novos medicamentos!</p>
            <button 
              onClick={() => setShowNewMedicationModal(false)}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-xl font-semibold"
            >
              Entendi
            </button>
          </div>
        </div>
      )}

      {/* Modal - Iniciar Treino */}
      {showWorkoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowWorkoutModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Escolha seu Treino</h3>
              <button onClick={() => setShowWorkoutModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {todayWorkouts.map((workout) => (
                <button
                  key={workout.id}
                  onClick={() => handleStartWorkout(workout)}
                  className="w-full text-left border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{workout.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{workout.duration} min • +{workout.xpEarned} XP</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal - Registrar Refeição */}
      {showMealModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMealModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Registrar Refeição</h3>
              <button onClick={() => setShowMealModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Funcionalidade em desenvolvimento. Em breve você poderá registrar suas refeições!</p>
            <button 
              onClick={handleRegisterMeal}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl font-semibold"
            >
              Entendi
            </button>
          </div>
        </div>
      )}

      {/* Modal - Aplicar Medicamento */}
      {showMedicationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMedicationModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aplicar Medicamento</h3>
              <button onClick={() => setShowMedicationModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {medications.map((med) => (
                <button
                  key={med.id}
                  onClick={handleRegisterMedication}
                  className="w-full text-left border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-pink-500 dark:hover:border-pink-400 transition-all"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{med.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{med.dosage} - {med.frequency}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
