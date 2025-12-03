'use client';

import { Trophy, Check, TrendingUp, Crown } from 'lucide-react';
import { PricingPlan } from '@/lib/types';

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: 'monthly',
    icon: 'trophy',
    features: [
      'Treinos básicos',
      'Diário alimentar simples',
      'Ranking limitado',
      '1 medicamento monitorado',
      'Gamificação básica',
      'Acesso a 50 exercícios'
    ]
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 14.90,
    period: 'monthly',
    icon: 'check',
    popular: true,
    features: [
      'Diário alimentar completo',
      'Scanner de alimentos',
      'Treinos guiados',
      'Gamificação parcial',
      '3 medicamentos monitorados',
      'Acesso a 200 exercícios',
      'Estatísticas avançadas',
      'Suporte por email'
    ]
  },
  {
    id: 'intermediate',
    name: 'Intermediário',
    price: 29.90,
    period: 'monthly',
    icon: 'trending-up',
    features: [
      'Tudo do Básico +',
      'Planos personalizados de treino',
      'Planos personalizados de dieta',
      'Gamificação completa',
      'Medicamentos ilimitados',
      'Acesso a +500 exercícios',
      'Indicação de personal trainer',
      'Análise de progresso com IA',
      'Exportação de dados',
      'Teste grátis 7 dias'
    ]
  },
  {
    id: 'advanced',
    name: 'Avançado',
    price: 49.90,
    period: 'monthly',
    icon: 'crown',
    features: [
      'Tudo do Intermediário +',
      'Personal trainer dedicado',
      'Consultoria nutricional',
      'Acompanhamento em tempo real',
      'Vídeo chamadas mensais',
      'Planos ajustados semanalmente',
      'Acesso prioritário a novos recursos',
      'Comunidade exclusiva',
      'Desafios premium',
      'Teste grátis 7 dias'
    ]
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'trophy':
      return <Trophy className="w-8 h-8" />;
    case 'check':
      return <Check className="w-8 h-8" />;
    case 'trending-up':
      return <TrendingUp className="w-8 h-8" />;
    case 'crown':
      return <Crown className="w-8 h-8" />;
    default:
      return <Trophy className="w-8 h-8" />;
  }
};

export default function PricingTable() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece grátis e evolua conforme suas necessidades. Todos os planos incluem gamificação e acompanhamento completo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl ring-4 ring-emerald-400'
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-2xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  Mais Popular
                </div>
              )}

              <div className={`mb-6 ${plan.popular ? 'text-white' : 'text-emerald-600'}`}>
                {getIcon(plan.icon)}
              </div>

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  R$ {plan.price.toFixed(2)}
                </span>
                <span className={`text-sm ${plan.popular ? 'text-emerald-100' : 'text-gray-500'}`}>
                  /mês
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'text-emerald-200' : 'text-emerald-600'
                    }`} />
                    <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                }`}
              >
                {plan.price === 0 ? 'Comece grátis' : `Assinar ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12 text-sm">
          Todos os planos pagos incluem teste grátis de 7 dias. Cancele quando quiser.
        </p>
      </div>
    </section>
  );
}
