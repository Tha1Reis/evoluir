'use client';

import { useState } from 'react';
import { Ruler, TrendingUp, Calendar, ChevronLeft, Plus, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BodyMeasurement {
  date: Date;
  weight: number;
  bodyFat: number;
  leanMass: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
}

export default function BodyMeasurementPage() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [measurements] = useState<BodyMeasurement[]>([
    {
      date: new Date(),
      weight: 75,
      bodyFat: 18.5,
      leanMass: 61.1,
      chest: 98,
      waist: 82,
      hips: 95,
      arms: 35,
      thighs: 58
    },
    {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      weight: 76,
      bodyFat: 19.2,
      leanMass: 61.4,
      chest: 98,
      waist: 84,
      hips: 96,
      arms: 35,
      thighs: 58
    }
  ]);

  const latestMeasurement = measurements[0];
  const previousMeasurement = measurements[1];

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      isNegative: change < 0
    };
  };

  const weightChange = calculateChange(latestMeasurement.weight, previousMeasurement.weight);
  const bodyFatChange = calculateChange(latestMeasurement.bodyFat, previousMeasurement.bodyFat);
  const leanMassChange = calculateChange(latestMeasurement.leanMass, previousMeasurement.leanMass);

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
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2">
                <Ruler className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medição Corporal</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Acompanhe sua evolução</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Resumo Atual */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Medição Atual</h2>
              <p className="opacity-90">{latestMeasurement.date.toLocaleDateString('pt-BR')}</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nova Medição
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Peso</p>
              <p className="text-3xl font-bold">{latestMeasurement.weight} kg</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className={`w-4 h-4 ${weightChange.isNegative ? 'rotate-180' : ''}`} />
                <span className="text-sm">{weightChange.value} kg</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Gordura Corporal</p>
              <p className="text-3xl font-bold">{latestMeasurement.bodyFat}%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className={`w-4 h-4 ${bodyFatChange.isNegative ? 'rotate-180' : ''}`} />
                <span className="text-sm">{bodyFatChange.value}%</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Massa Magra</p>
              <p className="text-3xl font-bold">{latestMeasurement.leanMass} kg</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className={`w-4 h-4 ${leanMassChange.isNegative ? 'rotate-180' : ''}`} />
                <span className="text-sm">{leanMassChange.value} kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Circunferências */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Circunferências (cm)</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{latestMeasurement.chest}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Peito</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{latestMeasurement.waist}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cintura</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 dark:bg-pink-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{latestMeasurement.hips}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quadril</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{latestMeasurement.arms}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Braços</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900/30 rounded-xl p-4 mb-2">
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{latestMeasurement.thighs}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Coxas</p>
            </div>
          </div>
        </div>

        {/* Histórico */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Histórico</h2>
          <div className="space-y-4">
            {measurements.map((measurement, idx) => (
              <div
                key={idx}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {measurement.date.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {idx === 0 && (
                    <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold">
                      Atual
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Peso</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{measurement.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Gordura</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{measurement.bodyFat}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Massa Magra</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{measurement.leanMass} kg</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculadora */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Como Calculamos</h2>
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              <strong>Percentual de Gordura:</strong> Calculado usando protocolo de dobras cutâneas ou bioimpedância
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Massa Magra:</strong> Peso total - (Peso × % Gordura / 100)
            </p>
          </div>
        </div>
      </main>

      {/* Modal - Nova Medição */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nova Medição</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="75.0"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gordura Corporal (%)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="18.5"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Circunferências (opcional)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Peito (cm)" className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                  <input type="number" placeholder="Cintura (cm)" className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                  <input type="number" placeholder="Quadril (cm)" className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                  <input type="number" placeholder="Braços (cm)" className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                  <input type="number" placeholder="Coxas (cm)" className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all">
                Salvar Medição
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
