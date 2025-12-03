'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Droplet, 
  Plus, 
  TrendingUp, 
  Calendar,
  ArrowLeft,
  Target,
  CheckCircle2
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function WaterPage() {
  const router = useRouter();
  const [period, setPeriod] = useState<'7' | '14' | '30'>('7');
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Mock data - em produção viria do backend
  const [waterData, setWaterData] = useState({
    today: 2100,
    goal: 3000,
    history: {
      '7': [2500, 2800, 2200, 3000, 2600, 2400, 2100],
      '14': [2500, 2800, 2200, 3000, 2600, 2400, 2100, 2900, 2700, 2300, 2800, 2500, 2600, 2100],
      '30': Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 2000)
    }
  });

  const percentage = (waterData.today / waterData.goal) * 100;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addWater = (amount: number) => {
    setWaterData(prev => ({
      ...prev,
      today: prev.today + amount
    }));
    showToast(`+${amount}ml adicionados!`);
    setShowCustomInput(false);
    setCustomAmount('');
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount);
    if (amount > 0 && amount <= 2000) {
      addWater(amount);
    }
  };

  // Dados do gráfico
  const chartData = {
    labels: period === '7' 
      ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
      : period === '14'
      ? Array.from({ length: 14 }, (_, i) => `Dia ${i + 1}`)
      : Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Água consumida (ml)',
        data: waterData.history[period],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Meta diária',
        data: Array(waterData.history[period].length).fill(waterData.goal),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}ml`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 4000,
        ticks: {
          callback: function(value: any) {
            return value + 'ml';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <div className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">{toast}</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-3 mb-4">
            <Droplet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Hidratação
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe seu consumo de água diário
          </p>
        </div>

        {/* Card Principal - Hoje */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Hoje</h2>
              <p className="text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{waterData.today}ml</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">de {waterData.goal}ml</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progresso</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{Math.round(percentage)}%</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Botões de Adição Rápida */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[150, 250, 500].map((amount) => (
              <button
                key={amount}
                onClick={() => addWater(amount)}
                className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                +{amount}ml
              </button>
            ))}
          </div>

          {/* Botão Custom */}
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full border-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 py-3 rounded-xl font-semibold hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Adicionar quantidade personalizada
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Ex: 375"
                className="flex-1 px-4 py-3 border-2 border-blue-300 dark:border-blue-700 rounded-xl focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleCustomAdd}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all"
              >
                Adicionar
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomAmount('');
                }}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Card de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Meta Diária</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{waterData.goal}ml</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Média Semanal</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {Math.round(waterData.history['7'].reduce((a, b) => a + b, 0) / 7)}ml
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Dias na Meta</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {waterData.history['7'].filter(v => v >= waterData.goal).length}/7
            </p>
          </div>
        </div>

        {/* Card do Gráfico */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Histórico</h2>
            <div className="flex gap-2">
              {(['7', '14', '30'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    period === p
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {p} dias
                </button>
              ))}
            </div>
          </div>

          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
