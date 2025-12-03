'use client';

import { useState } from 'react';
import { Settings, User, Lock, Globe, Dumbbell, Apple, Bell, Shield, Trash2, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'security', name: 'Segurança', icon: Lock },
    { id: 'preferences', name: 'Preferências', icon: Settings },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'privacy', name: 'Privacidade', icon: Shield },
    { id: 'danger', name: 'Zona de Perigo', icon: Trash2 },
  ];

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
              <div className="bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl p-2">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie sua conta</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{section.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              {activeSection === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Perfil</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        JS
                      </div>
                      <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all">
                        Alterar Foto
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nome</label>
                      <input
                        type="text"
                        defaultValue="João Silva"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="joao@email.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>

                    <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Segurança</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Senha Atual</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nova Senha</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirmar Nova Senha</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>

                    <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all">
                      Alterar Senha
                    </button>

                    <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6 mt-6">
                      <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
                        Esqueci minha senha
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Preferências</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Idioma</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                        <option>Português (Brasil)</option>
                        <option>English</option>
                        <option>Español</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tema</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button className="p-4 border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-center">
                          <Sun className="w-6 h-6 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">Claro</span>
                        </button>
                        <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-center hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
                          <Moon className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">Escuro</span>
                        </button>
                        <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-center hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
                          <Settings className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">Auto</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        Preferências de Treino
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                          <span className="text-gray-700 dark:text-gray-300">Lembrar último treino</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                          <span className="text-gray-700 dark:text-gray-300">Sugestões automáticas de treino</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Apple className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        Preferências Nutricionais
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                          <span className="text-gray-700 dark:text-gray-300">Vegetariano</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                          <span className="text-gray-700 dark:text-gray-300">Vegano</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                          <span className="text-gray-700 dark:text-gray-300">Sem glúten</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notificações</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Lembretes de Treino</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receba lembretes para treinar</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Lembretes de Água</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Lembrete para beber água</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Lembretes de Medicamentos</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notificações de aplicação</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Conquistas</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notificações de conquistas</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Privacidade</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Perfil Público</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Permitir que outros vejam seu perfil</p>
                      </div>
                      <input type="checkbox" className="w-12 h-6 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Compartilhar Progresso</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Compartilhar conquistas</p>
                      </div>
                      <input type="checkbox" className="w-12 h-6 rounded-full" />
                    </div>

                    <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6 mt-6 space-y-3">
                      <button className="w-full text-left text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-between">
                        <span>Política de Privacidade</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <button className="w-full text-left text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-between">
                        <span>Termos de Uso</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <button className="w-full text-left text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-between">
                        <span>Segurança dos Dados</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'danger' && (
                <div>
                  <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Zona de Perigo</h2>
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">Excluir Conta</h3>
                      <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                        Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
                      </p>
                      <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all">
                        Excluir Minha Conta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
