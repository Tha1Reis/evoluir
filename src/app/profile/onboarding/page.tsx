'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Dumbbell, 
  User, 
  Calendar, 
  Ruler, 
  Weight, 
  Target, 
  Activity, 
  Utensils,
  Clock,
  AlertCircle,
  Apple,
  Pill,
  Camera,
  Upload,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { getCurrentSession, updateOnboardingStatus } from '@/lib/auth';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  // Dados do formulário
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    age: '',
    sex: '',
    height: '',
    weight: '',
    bodyFat: '',
    
    // Objetivos
    goal: '',
    activityLevel: '',
    
    // Nutrição
    mealsPerDay: '',
    mealTimes: '',
    
    // Saúde
    hasInjuries: false,
    injuries: '',
    restrictions: '',
    allergies: '',
    
    // Medicamentos
    usesMedication: false,
    medications: [] as Array<{ name: string; dosage: string; schedule: string }>,
    
    // Foto
    photo: null as string | null,
    
    // Consentimento
    consent: false
  });

  useEffect(() => {
    const currentSession = getCurrentSession();
    if (!currentSession) {
      router.push('/auth/login');
      return;
    }
    setSession(currentSession);
    setFormData(prev => ({ ...prev, name: currentSession.user.name }));
  }, [router]);

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAddMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', schedule: '' }]
    }));
  };

  const handleRemoveMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.consent) {
      alert('Você precisa aceitar a Política de Privacidade para continuar');
      return;
    }

    setLoading(true);

    try {
      // Simula salvamento no backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Salva dados no localStorage (em produção, enviar para backend)
      localStorage.setItem('user_profile', JSON.stringify(formData));
      
      // Atualiza status de onboarding
      updateOnboardingStatus(true);
      
      // Redireciona para dashboard
      router.push('/dashboard');
    } catch (error) {
      alert('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Complete seu perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Etapa {step} de {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-lg p-2">
                  <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dados Pessoais</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="25"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Sexo
                  </label>
                  <select
                    value={formData.sex}
                    onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="175"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="75"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    % Gordura (opcional)
                  </label>
                  <input
                    type="number"
                    value={formData.bodyFat}
                    onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="18"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Objetivos */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-2">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Seus Objetivos</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Qual é seu objetivo principal?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'weight_loss', label: 'Emagrecimento', icon: '🔥' },
                    { value: 'muscle_gain', label: 'Ganhar massa', icon: '💪' },
                    { value: 'definition', label: 'Definição', icon: '⚡' },
                    { value: 'health', label: 'Saúde geral', icon: '❤️' }
                  ].map((goal) => (
                    <button
                      key={goal.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: goal.value })}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        formData.goal === goal.value
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{goal.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Nível de atividade física
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'sedentary', label: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
                    { value: 'light', label: 'Leve', desc: '1-3 dias por semana' },
                    { value: 'moderate', label: 'Moderado', desc: '3-5 dias por semana' },
                    { value: 'intense', label: 'Intenso', desc: '6-7 dias por semana' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, activityLevel: level.value })}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                        formData.activityLevel === level.value
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 dark:text-white">{level.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Nutrição */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2">
                  <Apple className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hábitos Alimentares</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Quantas refeições por dia?
                </label>
                <input
                  type="number"
                  value={formData.mealsPerDay}
                  onChange={(e) => setFormData({ ...formData, mealsPerDay: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="3-6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Horários aproximados das refeições
                </label>
                <textarea
                  value={formData.mealTimes}
                  onChange={(e) => setFormData({ ...formData, mealTimes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Ex: 8h, 12h, 15h, 19h"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Restrições alimentares
                </label>
                <textarea
                  value={formData.restrictions}
                  onChange={(e) => setFormData({ ...formData, restrictions: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Ex: vegetariano, sem lactose, etc."
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Alergias alimentares
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Ex: amendoim, frutos do mar, etc."
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Step 4: Saúde e Medicamentos */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-lg p-2">
                  <Pill className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saúde e Medicamentos</h2>
              </div>

              {/* Lesões */}
              <div>
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={formData.hasInjuries}
                    onChange={(e) => setFormData({ ...formData, hasInjuries: e.target.checked })}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Tenho lesões ou limitações físicas
                  </span>
                </label>
                {formData.hasInjuries && (
                  <textarea
                    value={formData.injuries}
                    onChange={(e) => setFormData({ ...formData, injuries: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Descreva suas lesões ou limitações"
                    rows={3}
                  />
                )}
              </div>

              {/* Medicamentos */}
              <div>
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={formData.usesMedication}
                    onChange={(e) => setFormData({ ...formData, usesMedication: e.target.checked })}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Uso medicamentos regularmente
                  </span>
                </label>

                {formData.usesMedication && (
                  <div className="space-y-3">
                    {formData.medications.map((med, index) => (
                      <div key={index} className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <input
                            type="text"
                            value={med.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Nome do medicamento"
                          />
                          <input
                            type="text"
                            value={med.dosage}
                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Dosagem"
                          />
                          <input
                            type="text"
                            value={med.schedule}
                            onChange={(e) => handleMedicationChange(index, 'schedule', e.target.value)}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Horário"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(index)}
                          className="text-red-600 dark:text-red-400 text-sm font-semibold hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddMedication}
                      className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-all"
                    >
                      + Adicionar medicamento
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Foto e Consentimento */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
                  <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Finalizar</h2>
              </div>

              {/* Foto */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Foto inicial (opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                  {formData.photo ? (
                    <div className="space-y-3">
                      <img 
                        src={formData.photo} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-xl mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, photo: null })}
                        className="text-red-600 dark:text-red-400 text-sm font-semibold"
                      >
                        Remover foto
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Clique para fazer upload
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        JPG, PNG ou HEIC até 10MB
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Consentimento */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Li e aceito a{' '}
                    <a href="/legal/privacy" target="_blank" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                      Política de Privacidade
                    </a>
                    {' '}e os{' '}
                    <a href="/legal/terms" target="_blank" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                      Termos de Uso
                    </a>
                    {' '}do Evoluir+
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Voltar
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
              >
                Próximo
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !formData.consent}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : 'Finalizar'}
                <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
