'use client';

import { useState } from 'react';
import { HelpCircle, Mail, MessageCircle, Book, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HelpPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Treinos',
      questions: [
        {
          q: 'Como criar um treino personalizado?',
          a: 'Vá em Treinos > Criar Treino e escolha entre criar manualmente ou deixar a IA sugerir. Você pode adicionar exercícios, definir séries por repetições ou tempo, e salvar para usar depois.'
        },
        {
          q: 'Como funciona o sistema de séries avançadas?',
          a: 'Você pode criar séries decrescentes (ex: 15-12-10), progressivas, ou por tempo (ex: 40s-60s-90s). Basta escolher o tipo ao adicionar o exercício.'
        },
        {
          q: 'Posso ter um personal trainer no app?',
          a: 'Sim! Você pode convidar seu personal trainer, que poderá montar e ajustar seus treinos remotamente.'
        }
      ]
    },
    {
      category: 'Nutrição',
      questions: [
        {
          q: 'Como funciona o NutriCam?',
          a: 'Tire uma foto do seu prato e a IA estimará automaticamente calorias, macros (proteína, carboidratos, gordura) e peso da refeição.'
        },
        {
          q: 'Como ajustar minhas metas nutricionais?',
          a: 'Vá em Configurações > Preferências > Preferências Nutricionais e ajuste suas metas de calorias, proteína, carboidratos e gordura.'
        }
      ]
    },
    {
      category: 'Medicamentos',
      questions: [
        {
          q: 'Como registrar medicamentos?',
          a: 'Na tela principal, clique em "Adicionar Medicamento" no card de Medicamentos. Preencha nome, dosagem e frequência.'
        },
        {
          q: 'Como funciona o lembrete de aplicação?',
          a: 'O app enviará notificações automáticas baseadas na frequência configurada para cada medicamento.'
        }
      ]
    },
    {
      category: 'Gamificação',
      questions: [
        {
          q: 'Como ganhar XP?',
          a: 'Você ganha XP completando treinos, registrando refeições, mantendo sequências diárias e desbloqueando conquistas.'
        },
        {
          q: 'O que são conquistas?',
          a: 'Conquistas são marcos que você desbloqueia ao atingir objetivos específicos, como completar 50 treinos ou manter uma sequência de 7 dias.'
        }
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Primeiros Passos',
      description: 'Configure seu perfil e defina suas metas',
      duration: '5 min'
    },
    {
      title: 'Criando seu Primeiro Treino',
      description: 'Aprenda a montar treinos personalizados',
      duration: '8 min'
    },
    {
      title: 'Usando o NutriCam',
      description: 'Registre refeições com fotos',
      duration: '3 min'
    },
    {
      title: 'Sistema de Gamificação',
      description: 'Entenda XP, níveis e conquistas',
      duration: '6 min'
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-2">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Central de Ajuda</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tire suas dúvidas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Suporte Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <a
            href="mailto:suporte@evoluirmais.com"
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">suporte@evoluirmais.com</p>
          </a>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 w-fit mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Suporte via WhatsApp</p>
          </a>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 w-fit mb-4">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Tutoriais</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Guias passo a passo</p>
          </div>
        </div>

        {/* Busca */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por dúvidas..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {(searchQuery ? filteredFaqs : faqs).map((category, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" />
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.questions.map((item, qIdx) => (
                    <details
                      key={qIdx}
                      className="group bg-gray-50 dark:bg-gray-900 rounded-xl p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <summary className="font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                        {item.q}
                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tutoriais */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tutoriais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorials.map((tutorial, idx) => (
              <div
                key={idx}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tutorial.title}
                  </h3>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                    {tutorial.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {tutorial.description}
                </p>
                <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
                  Assistir tutorial
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
