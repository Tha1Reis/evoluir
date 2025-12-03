'use client';

import { useState } from 'react';
import { 
  Dumbbell, Plus, Clock, Timer, ChevronLeft, Play, Check, X, 
  Heart, TrendingUp, Zap, Target, Calendar, ChevronRight,
  Search, Filter, Star, BarChart3, Activity, Flame
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type ViewMode = 'home' | 'stats' | 'exercise' | 'plan' | 'library';
type LibraryTab = 'muscle' | 'equipment' | 'favorites';
type StatsFilter = 'last' | 'week' | 'month' | 'year';

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
  image: string;
  popular: boolean;
  sets?: string;
  reps?: string;
  rest?: string;
}

export default function WorkoutsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [libraryTab, setLibraryTab] = useState<LibraryTab>('muscle');
  const [statsFilter, setStatsFilter] = useState<StatsFilter>('week');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [exerciseTab, setExerciseTab] = useState<'muscle' | 'instructions' | 'equipment' | 'analytics'>('muscle');

  // Dados de exemplo
  const quickWorkouts: Exercise[] = [
    {
      id: '1',
      name: 'Treino de Peito',
      category: 'Força',
      muscleGroup: 'Peito',
      equipment: 'Barra',
      image: '💪',
      popular: true,
      sets: '4',
      reps: '12',
      rest: '60s'
    },
    {
      id: '2',
      name: 'Treino de Costas',
      category: 'Hipertrofia',
      muscleGroup: 'Costas',
      equipment: 'Polia',
      image: '🏋️',
      popular: true,
      sets: '3',
      reps: '15',
      rest: '45s'
    },
    {
      id: '3',
      name: 'Treino de Pernas',
      category: 'Força',
      muscleGroup: 'Pernas',
      equipment: 'Agachamento',
      image: '🦵',
      popular: false,
      sets: '5',
      reps: '10',
      rest: '90s'
    }
  ];

  const muscleGroups = [
    { id: '1', name: 'Peito', icon: '💪', exercises: 24 },
    { id: '2', name: 'Costas', icon: '🏋️', exercises: 32 },
    { id: '3', name: 'Pernas', icon: '🦵', exercises: 28 },
    { id: '4', name: 'Ombros', icon: '💪', exercises: 18 },
    { id: '5', name: 'Bíceps', icon: '💪', exercises: 15 },
    { id: '6', name: 'Tríceps', icon: '💪', exercises: 16 },
    { id: '7', name: 'Abdômen', icon: '🔥', exercises: 22 },
    { id: '8', name: 'Glúteos', icon: '🍑', exercises: 19 }
  ];

  const stats = {
    workouts: 24,
    exercises: 156,
    minutes: 1240,
    calories: 8450,
    reps: 3420,
    weight: 45600
  };

  // Renderização condicional baseada no modo de visualização
  const renderContent = () => {
    switch (viewMode) {
      case 'stats':
        return renderStatsView();
      case 'exercise':
        return renderExerciseView();
      case 'plan':
        return renderPlanView();
      case 'library':
        return renderLibraryView();
      default:
        return renderHomeView();
    }
  };

  // Tela Principal (Home)
  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Seção de Personalização */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Personalize seu treino</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => setViewMode('plan')}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-left hover:scale-105 transition-transform"
          >
            <div className="bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold mb-1">Plano de Treino</h3>
            <p className="text-blue-200 text-sm">Configure seu plano semanal</p>
          </button>

          <button className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-left hover:scale-105 transition-transform">
            <div className="bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold mb-1">Treino Rápido</h3>
            <p className="text-purple-200 text-sm">15-30 minutos</p>
          </button>

          <button className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-left hover:scale-105 transition-transform">
            <div className="bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold mb-1">Objetivo</h3>
            <p className="text-emerald-200 text-sm">Defina suas metas</p>
          </button>
        </div>
      </div>

      {/* Treinos Rápidos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Treinos Rápidos</h2>
          <button 
            onClick={() => setViewMode('library')}
            className="text-blue-400 text-sm font-semibold hover:text-blue-300"
          >
            Ver todos
          </button>
        </div>
        <div className="space-y-3">
          {quickWorkouts.map((workout) => (
            <button
              key={workout.id}
              onClick={() => {
                setSelectedExercise(workout);
                setViewMode('exercise');
              }}
              className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 hover:bg-gray-800 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl w-16 h-16 flex items-center justify-center text-3xl">
                  {workout.image}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-lg">
                      {workout.category}
                    </span>
                    {workout.popular && (
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Muito Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold">{workout.name}</h3>
                  <p className="text-gray-400 text-sm">{workout.muscleGroup} • {workout.equipment}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Tela de Estatísticas
  const renderStatsView = () => (
    <div className="space-y-6">
      {/* Filtros de Período */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['last', 'week', 'month', 'year'] as StatsFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setStatsFilter(filter)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              statsFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {filter === 'last' && 'Último'}
            {filter === 'week' && 'Semana'}
            {filter === 'month' && 'Mês'}
            {filter === 'year' && 'Ano'}
          </button>
        ))}
      </div>

      {/* Data */}
      <div className="flex items-center justify-center gap-4">
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        <span className="text-white font-semibold">1 - 7 Jan</span>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600/20 rounded-xl p-2">
              <Dumbbell className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-400 text-sm">Treinos</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.workouts}</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-600/20 rounded-xl p-2">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-gray-400 text-sm">Exercícios</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.exercises}</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-600/20 rounded-xl p-2">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-gray-400 text-sm">Minutos</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.minutes}</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-600/20 rounded-xl p-2">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-gray-400 text-sm">Calorias</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.calories}</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-pink-600/20 rounded-xl p-2">
              <TrendingUp className="w-5 h-5 text-pink-400" />
            </div>
            <span className="text-gray-400 text-sm">Reps</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.reps}</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-cyan-600/20 rounded-xl p-2">
              <Target className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-gray-400 text-sm">Peso (kg)</span>
          </div>
          <p className="text-3xl font-bold text-white">{(stats.weight / 1000).toFixed(1)}</p>
        </div>
      </div>
    </div>
  );

  // Tela de Exercício Detalhado
  const renderExerciseView = () => {
    if (!selectedExercise) return null;

    return (
      <div className="space-y-6">
        {/* Imagem do Exercício */}
        <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl overflow-hidden h-64 flex items-center justify-center">
          <div className="text-8xl">{selectedExercise.image}</div>
          <button className="absolute top-4 right-4 bg-gray-900/50 backdrop-blur-sm p-2 rounded-xl hover:bg-gray-900 transition-colors">
            <Heart className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-lg">
            {selectedExercise.category}
          </span>
          {selectedExercise.popular && (
            <span className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Muito Popular
            </span>
          )}
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white">{selectedExercise.name}</h2>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['muscle', 'instructions', 'equipment', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setExerciseTab(tab)}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                exerciseTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab === 'muscle' && 'Músculo'}
              {tab === 'instructions' && 'Instruções'}
              {tab === 'equipment' && 'Equipamento'}
              {tab === 'analytics' && 'Analytics'}
            </button>
          ))}
        </div>

        {/* Conteúdo da Tab */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          {exerciseTab === 'muscle' && (
            <div>
              <h3 className="text-white font-bold mb-3">Músculo Alvo</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl w-16 h-16 flex items-center justify-center text-3xl">
                  💪
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedExercise.muscleGroup}</p>
                  <p className="text-gray-400 text-sm">Músculo primário</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Este exercício trabalha principalmente o {selectedExercise.muscleGroup.toLowerCase()}, 
                sendo ideal para desenvolvimento de força e hipertrofia muscular.
              </p>
            </div>
          )}

          {exerciseTab === 'instructions' && (
            <div>
              <h3 className="text-white font-bold mb-3">Como Executar</h3>
              <ol className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <span>Posicione-se corretamente no equipamento</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <span>Mantenha a postura adequada durante todo o movimento</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                  <span>Execute o movimento de forma controlada</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                  <span>Respire corretamente durante a execução</span>
                </li>
              </ol>
            </div>
          )}

          {exerciseTab === 'equipment' && (
            <div>
              <h3 className="text-white font-bold mb-3">Equipamento Necessário</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl w-16 h-16 flex items-center justify-center text-3xl">
                  🏋️
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedExercise.equipment}</p>
                  <p className="text-gray-400 text-sm">Equipamento principal</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Este exercício requer o uso de {selectedExercise.equipment.toLowerCase()} 
                para execução adequada e segura.
              </p>
            </div>
          )}

          {exerciseTab === 'analytics' && (
            <div>
              <h3 className="text-white font-bold mb-3">Suas Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Última execução</span>
                  <span className="text-white font-semibold">Há 2 dias</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total de séries</span>
                  <span className="text-white font-semibold">48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Carga máxima</span>
                  <span className="text-white font-semibold">80 kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Progresso</span>
                  <span className="text-emerald-400 font-semibold">+15%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão de Ação */}
        <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2">
          <Play className="w-5 h-5" />
          Iniciar Exercício
        </button>
      </div>
    );
  };

  // Tela de Plano de Treino
  const renderPlanView = () => (
    <div className="space-y-6">
      {/* Seletor de Plano */}
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Plano</label>
        <select className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border-2 border-gray-700 focus:border-blue-500 outline-none">
          <option>Hipertrofia - 5x por semana</option>
          <option>Força - 4x por semana</option>
          <option>Definição - 6x por semana</option>
        </select>
      </div>

      {/* Dias da Semana */}
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Dia</label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => (
            <button
              key={day}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Configurações */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Tempo</label>
          <select className="w-full bg-gray-800 text-white rounded-xl px-3 py-2 text-sm border-2 border-gray-700 focus:border-blue-500 outline-none">
            <option>60 min</option>
            <option>45 min</option>
            <option>90 min</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Músculos</label>
          <select className="w-full bg-gray-800 text-white rounded-xl px-3 py-2 text-sm border-2 border-gray-700 focus:border-blue-500 outline-none">
            <option>2</option>
            <option>1</option>
            <option>3</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Local</label>
          <select className="w-full bg-gray-800 text-white rounded-xl px-3 py-2 text-sm border-2 border-gray-700 focus:border-blue-500 outline-none">
            <option>Academia</option>
            <option>Casa</option>
            <option>Parque</option>
          </select>
        </div>
      </div>

      {/* Músculos Trabalhados */}
      <div>
        <label className="text-gray-400 text-sm mb-3 block">Músculos Trabalhados</label>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {['💪', '🏋️', '🦵', '💪', '🔥'].map((icon, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl w-16 h-16 flex items-center justify-center text-2xl flex-shrink-0"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Exercícios */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold">Exercícios (6)</h3>
          <button className="text-blue-400 text-sm font-semibold hover:text-blue-300">
            Editar
          </button>
        </div>
        <div className="space-y-3">
          {quickWorkouts.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
                  {exercise.image}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm">{exercise.name}</h4>
                  <p className="text-gray-400 text-xs">{exercise.muscleGroup}</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>{exercise.sets} séries</span>
                <span>{exercise.reps} reps</span>
                <span>{exercise.rest} descanso</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão de Ação */}
      <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2">
        <Play className="w-5 h-5" />
        Iniciar Treino
      </button>
    </div>
  );

  // Tela de Biblioteca
  const renderLibraryView = () => (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['muscle', 'equipment', 'favorites'] as LibraryTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setLibraryTab(tab)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              libraryTab === tab
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab === 'muscle' && 'Por Músculo'}
            {tab === 'equipment' && 'Equipamentos'}
            {tab === 'favorites' && 'Favoritos'}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      {libraryTab === 'muscle' && (
        <div className="space-y-3">
          {muscleGroups.map((group) => (
            <button
              key={group.id}
              className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-800 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl w-14 h-14 flex items-center justify-center text-2xl">
                  {group.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-bold">{group.name}</h3>
                  <p className="text-gray-400 text-sm">{group.exercises} exercícios</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </button>
          ))}
        </div>
      )}

      {libraryTab === 'equipment' && (
        <div className="text-center py-12">
          <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-10 h-10 text-gray-600" />
          </div>
          <p className="text-gray-400">Equipamentos em breve</p>
        </div>
      )}

      {libraryTab === 'favorites' && (
        <div className="text-center py-12">
          <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-600" />
          </div>
          <p className="text-gray-400">Nenhum favorito ainda</p>
          <p className="text-gray-500 text-sm mt-2">Adicione exercícios aos favoritos</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {viewMode !== 'home' && (
                <button 
                  onClick={() => {
                    if (viewMode === 'exercise') {
                      setViewMode('home');
                      setSelectedExercise(null);
                    } else {
                      setViewMode('home');
                    }
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-300" />
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-2">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {viewMode === 'home' && 'Treinos'}
                    {viewMode === 'stats' && 'Estatísticas'}
                    {viewMode === 'exercise' && 'Exercício'}
                    {viewMode === 'plan' && 'Plano de Treino'}
                    {viewMode === 'library' && 'Biblioteca'}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('stats')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'stats' ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <BarChart3 className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button 
              onClick={() => setViewMode('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                viewMode === 'home' ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Dumbbell className="w-6 h-6" />
              <span className="text-xs font-semibold">Treinos</span>
            </button>
            <button 
              onClick={() => setViewMode('library')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                viewMode === 'library' ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Target className="w-6 h-6" />
              <span className="text-xs font-semibold">Biblioteca</span>
            </button>
            <button 
              onClick={() => setViewMode('stats')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                viewMode === 'stats' ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs font-semibold">Stats</span>
            </button>
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Activity className="w-6 h-6" />
              <span className="text-xs font-semibold">Dashboard</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
