'use client';

import { useState } from 'react';
import { Camera, Plus, X, Apple, Flame, Target, ChevronLeft, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NutritionPage() {
  const router = useRouter();
  const [showNutriCam, setShowNutriCam] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handlePhotoAnalysis = () => {
    setAnalyzing(true);
    // Simular análise de imagem
    setTimeout(() => {
      setAnalysisResult({
        food: 'Prato de frango com arroz e salada',
        calories: 450,
        protein: 35,
        carbs: 48,
        fat: 12,
        weight: 350
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleSaveAnalysis = () => {
    // Salvar análise
    setShowNutriCam(false);
    setAnalysisResult(null);
  };

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
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-2">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nutrição</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Registre suas refeições</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* NutriCam Card */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold">NutriCam</h2>
              <p className="text-sm opacity-90">Análise automática por foto</p>
            </div>
          </div>
          <p className="mb-4 opacity-90">
            Tire uma foto do seu prato e deixe a IA estimar calorias, macros e peso automaticamente!
          </p>
          <button
            onClick={() => setShowNutriCam(true)}
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Abrir NutriCam
          </button>
        </div>

        {/* Refeições do Dia */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Refeições de Hoje</h2>
            <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {/* Exemplo de refeição */}
            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Café da Manhã</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">08:30</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">420</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">kcal</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2 text-center">
                  <p className="font-semibold text-purple-900 dark:text-purple-300">25g</p>
                  <p className="text-xs text-purple-700 dark:text-purple-400">Proteína</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 text-center">
                  <p className="font-semibold text-blue-900 dark:text-blue-300">45g</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">Carbos</p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-2 text-center">
                  <p className="font-semibold text-amber-900 dark:text-amber-300">15g</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400">Gordura</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metas Diárias */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Metas Diárias</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">Calorias</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">1450 / 2200 kcal</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full" style={{ width: '66%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">Proteína</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">95 / 150g</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '63%' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal NutriCam */}
      {showNutriCam && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">NutriCam</h3>
              <button 
                onClick={() => {
                  setShowNutriCam(false);
                  setAnalysisResult(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!analysisResult ? (
              <div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center mb-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Tire uma foto do seu prato</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">ou selecione da galeria</p>
                </div>
                <button
                  onClick={handlePhotoAnalysis}
                  disabled={analyzing}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all disabled:opacity-50"
                >
                  {analyzing ? 'Analisando...' : 'Selecionar Foto'}
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{analysisResult.food}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Peso estimado: {analysisResult.weight}g</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{analysisResult.calories}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">kcal</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{analysisResult.protein}g</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Proteína</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{analysisResult.carbs}g</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Carbos</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{analysisResult.fat}g</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Gordura</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSaveAnalysis}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all"
                >
                  Salvar Refeição
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
