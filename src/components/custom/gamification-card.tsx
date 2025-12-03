'use client';

import { Trophy, Zap, Target, Award, TrendingUp } from 'lucide-react';
import { User, Achievement } from '@/lib/types';

interface GamificationCardProps {
  user: User;
  achievements: Achievement[];
}

export default function GamificationCard({ user, achievements }: GamificationCardProps) {
  const xpPercentage = (user.xp / user.xpToNextLevel) * 100;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">Nível {user.level}</h3>
          <p className="text-purple-100 text-sm">Continue evoluindo!</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <Trophy className="w-8 h-8" />
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">{user.xp} XP</span>
          <span className="text-purple-100">{user.xpToNextLevel} XP</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
        <p className="text-xs text-purple-100 mt-2">
          Faltam {user.xpToNextLevel - user.xp} XP para o próximo nível
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Sequência</span>
          </div>
          <p className="text-3xl font-bold">{user.streak}</p>
          <p className="text-xs text-purple-100">dias seguidos</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Treinos</span>
          </div>
          <p className="text-3xl font-bold">{user.totalWorkouts}</p>
          <p className="text-xs text-purple-100">completados</p>
        </div>
      </div>

      {/* Achievements Preview */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Conquistas</span>
          </div>
          <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
            {unlockedAchievements}/{achievements.length}
          </span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {achievements.slice(0, 5).map((achievement) => (
            <div
              key={achievement.id}
              className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                achievement.unlocked
                  ? 'bg-yellow-400/20 border-2 border-yellow-400'
                  : 'bg-white/10 border-2 border-white/20 grayscale opacity-50'
              }`}
              title={achievement.title}
            >
              {achievement.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <span className="font-semibold text-sm">Desafio Diário</span>
        </div>
        <p className="text-sm text-purple-100">Complete 3 séries de qualquer exercício</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: '66%' }} />
          </div>
          <span className="text-xs font-semibold">2/3</span>
        </div>
      </div>
    </div>
  );
}
