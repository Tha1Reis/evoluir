'use client';

import { useState } from 'react';
import { Footprints, Target, TrendingUp, Calendar, ChevronLeft, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StepsPage() {
  const router = useRouter();
  
  const [dailyGoal] = useState(10000);
  const [currentSteps] = useState(7234);
  const [weeklyData] = useState([
    { day: 'Seg', steps: 8234, goal: 10000 },
    { day: 'Ter', steps: 9456, goal: 10000 },
    { day: 'Qua', steps: 7890, goal: 10000 },
    { day: 'Qui', steps: 10234, goal: 10000 },
    { day: 'Sex', steps: 8567, goal: 10000 },
    { day: 'Sáb', steps: 6789, goal: 10000 },
    { day: 'Dom', steps: 7234, goal: 10000 }
  ]);

  const percentage = (currentSteps / dailyGoal) * 100;
  const caloriesBurned = Math.round(currentSteps * 0.04);
  const distanceKm = (currentSteps * 0.0008).toFixed(2);
  const weeklyTotal = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const weeklyAverage = Math.round(weeklyTotal / 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-2">
                <Footprints className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Passos</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Acompanhe sua atividade diária</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Progresso Hoje */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-lg mb-6">
          <div className="text-center mb-6">
            <p className="text-lg opacity-90 mb-2">Passos Hoje</p>
            <p className="text-6xl font-bold mb-2">{currentSteps.toLocaleString()}</p>
            <p className="text-xl opacity-90">de {dailyGoal.toLocaleString()} passos</p>
          </div>

          {/* Barra de Progresso */}
          <div className="relative h-4 bg-white/20 rounded-full overflow-hidden mb-6">
            <div 
              className="absolute h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{caloriesBurned}</p>
              <p className="text-sm opacity-90">kcal queimadas</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{distanceKm}</p>
              <p className="text-sm opacity-90">km percorridos</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{Math.round(percentage)}%</p>
              <p className="text-sm opacity-90">da meta</p>
            </div>
          </div>
        </div>

        {/* Estatísticas Semanais */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Esta Semana</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{weeklyTotal.toLocaleString()}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{weeklyAverage.toLocaleString()}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Média Diária</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">5</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dias Ativos</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">2</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Metas Batidas</p>
            </div>
          </div>

          {/* Gráfico Semanal */}
          <div className="space-y-3">
            {weeklyData.map((day, idx) => {
              const dayPercentage = (day.steps / day.goal) * 100;
              const isGoalReached = day.steps >= day.goal;
              
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            isGoalReached 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                              : 'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}
                          style={{ width: `${Math.min(dayPercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white w-20 text-right">
                        {day.steps.toLocaleString()}
                      </span>
                      {isGoalReached && <Trophy className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metas */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ajustar Meta Diária</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[5000, 7500, 10000, 12500].map((goal) => (
              <button
                key={goal}
                className={`p-4 rounded-xl border-2 transition-all ${
                  goal === dailyGoal
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400'
                }`}
              >
                <Target className={`w-6 h-6 mx-auto mb-2 ${
                  goal === dailyGoal ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                }`} />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{goal.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">passos</p>
              </button>
            ))}
          </div>
        </div>

        {/* Conquistas */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Conquistas de Passos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">10.000 Passos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alcançado 2x esta semana</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Semana Perfeita</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bata a meta 7 dias seguidos</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Maratonista</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alcance 15.000 passos em um dia</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">100km</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Caminhe 100km no total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
