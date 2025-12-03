'use client';

import { useState } from 'react';
import { UserPlus, Send, Users, ChevronLeft, Mail, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PersonalTrainerPage() {
  const router = useRouter();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [hasPersonal, setHasPersonal] = useState(false);

  const handleSendInvite = () => {
    // Simular envio de convite
    setShowInviteModal(false);
    setInviteEmail('');
    alert('Convite enviado com sucesso!');
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
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Trainer</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Conecte-se com seu personal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!hasPersonal ? (
          <>
            {/* Sem Personal */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-lg mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <UserPlus className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Conecte-se com seu Personal</h2>
                  <p className="opacity-90">Receba treinos personalizados e acompanhamento profissional</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Convidar Personal */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 mb-4">
                  <UserPlus className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Convidar Personal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Envie um convite para seu personal trainer acessar sua conta e montar seus treinos
                  </p>
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar Convite
                </button>
              </div>

              {/* Benefícios */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benefícios</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Treinos Personalizados</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receba treinos montados especificamente para você</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Acompanhamento Remoto</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Seu personal pode ajustar treinos em tempo real</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Feedback Profissional</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receba orientações e correções do seu personal</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Como Funciona */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Como Funciona</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Envie o Convite</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Digite o email do seu personal e envie o convite
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Aceita</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Seu personal recebe o convite e aceita a conexão
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Receba Treinos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Seu personal monta e atualiza seus treinos remotamente
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Com Personal Conectado */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  PT
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Trainer</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">personal@email.com</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Conectado</span>
                  </div>
                </div>
                <button className="text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300">
                  Desconectar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Treinos Criados</p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">3</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ajustes Esta Semana</p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">45</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dias Conectado</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modal - Convidar Personal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Convidar Personal</h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email do Personal Trainer
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="personal@email.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4">
                <p className="text-sm text-purple-900 dark:text-purple-300">
                  <strong>Importante:</strong> Seu personal receberá um email com instruções para aceitar o convite e acessar sua conta.
                </p>
              </div>

              <button
                onClick={handleSendInvite}
                disabled={!inviteEmail}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Convite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
