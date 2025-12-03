'use client';

import { 
  Dumbbell, 
  Apple, 
  Pill, 
  Trophy, 
  Zap, 
  Target,
  Users,
  TrendingUp,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import PricingTable from '@/components/custom/pricing-table';
import ThemeToggle from '@/components/custom/theme-toggle';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header/Navbar */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 transition-colors">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-2">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Evoluir+
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                Planos
              </a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                Sobre
              </a>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button 
                onClick={() => setShowQuestionnaireModal(true)}
                className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors"
              >
                Entrar
              </button>
              <Link href="/dashboard">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl">
                  Começar Grátis
                </button>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-600 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                Planos
              </a>
              <a href="#about" className="block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                Sobre
              </a>
              <button 
                onClick={() => setShowQuestionnaireModal(true)}
                className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors"
              >
                Entrar
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Gamificação Avançada</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Evolua seu corpo e sua{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  mente
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                O app completo para treinos, nutrição e monitoramento de medicamentos. 
                Com gamificação que realmente motiva você a alcançar seus objetivos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/dashboard">
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                    Começar Agora
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button 
                  onClick={() => setShowQuestionnaireModal(true)}
                  className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                >
                  Ver Demo
                </button>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">50k+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Usuários ativos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">4.9★</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avaliação média</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">1M+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Treinos completados</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-1">Nível 12</h3>
                    <p className="text-purple-100">Continue evoluindo!</p>
                  </div>
                  <Trophy className="w-12 h-12" />
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">2450 XP</span>
                    <span className="text-purple-100">3000 XP</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-xs text-purple-100">dias de sequência</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Target className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-xs text-purple-100">treinos completos</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Treino Completo!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">+150 XP ganhos</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2">
                    <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Nova Conquista!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sequência de 7 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Combine treinos, nutrição e medicamentos com a gamificação mais motivadora do mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 w-fit mb-4">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Treinos Personalizados</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Acesso a +500 exercícios com vídeos e instruções. Monte seu treino ou deixe seu personal criar para você.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Vídeos demonstrativos
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Rastreamento de progresso
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Temporizador de descanso
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-3 w-fit mb-4">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Nutrição Completa</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Monitore todas as suas macros, calorias e hidratação. Scanner de alimentos e planos personalizados.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  Scanner de código de barras
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  Banco com milhares de alimentos
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  Gráficos de progresso
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-3 w-fit mb-4">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Monitoramento de Medicamentos</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Controle aplicações de Ozempic, Mounjaro e outros medicamentos. Lembretes automáticos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  Lembretes personalizados
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  Histórico completo
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  Notas e observações
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 w-fit mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Gamificação Avançada</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Sistema de XP, níveis, conquistas e desafios diários. A motivação que você precisa para não desistir.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  +100 conquistas únicas
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Ranking global e local
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Desafios semanais
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-3 w-fit mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Personal Trainer</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Indique seu personal para que ele monte treinos personalizados diretamente no app.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Comunicação direta
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Treinos customizados
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Feedback em tempo real
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 w-fit mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Análise com IA</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Inteligência artificial analisa seu progresso e sugere ajustes personalizados para melhores resultados.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Insights personalizados
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Previsão de resultados
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Recomendações automáticas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <PricingTable />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para evoluir?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Junte-se a milhares de pessoas que já transformaram suas vidas com o Evoluir+
          </p>
          <Link href="/dashboard">
            <button className="bg-white text-emerald-600 px-12 py-5 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-2xl hover:scale-105 inline-flex items-center gap-3">
              Começar Gratuitamente
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
          <p className="text-emerald-100 mt-6 text-sm">
            Sem cartão de crédito necessário • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-2">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Evoluir+</span>
              </div>
              <p className="text-gray-400 text-sm">
                O app completo para sua evolução física e mental.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Atualizações</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Carreiras</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Evoluir+. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal - Questionário */}
      {showQuestionnaireModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQuestionnaireModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Questionário Personalizado</h3>
              <button onClick={() => setShowQuestionnaireModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Responda algumas perguntas para montarmos seu treino, dieta e monitoramento de medicamentos personalizados!
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Plano de treino personalizado
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Dieta adaptada aos seus objetivos
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Monitoramento de medicamentos
              </div>
            </div>
            <Link href="/dashboard">
              <button 
                onClick={() => setShowQuestionnaireModal(false)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
              >
                Começar Questionário
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
