/**
 * assistatv.com.br — Tabela Oficial de Planos
 * Preservando os estilos neon de referência e a grade de preços
 */

export interface PricingPlan {
  id: string;
  duration: string;
  screens: number;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  desc: string;
  popular?: boolean;
  color: string;
  shadow: string;
  features: string[];
  ctaRoute: string;
  ctaText: string;
  whatsappMessage: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'mensal',
    duration: '1 Mês',
    screens: 1,
    price: 30,
    oldPrice: 50,
    discountPercentage: 40,
    desc: 'Ideal para testar',
    popular: false,
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-cyan-500/50',
    features: [
      '1 Tela em 4K/HD',
      'Canais + Filmes + Séries',
      'Futebol Ao Vivo sem Travamentos',
      'Suporte via WhatsApp'
    ],
    ctaRoute: '/ir/plano-mensal/',
    ctaText: 'ASSINAR AGORA! 🚀',
    whatsappMessage: 'Olá! Quero assinar o plano de 1 Mês por R$ 30! Vim do assistatv.com.br'
  },
  {
    id: 'trimestral',
    duration: '3 Meses',
    screens: 2,
    price: 70,
    oldPrice: 120,
    discountPercentage: 42,
    desc: 'Economia garantida',
    popular: false,
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/50',
    features: [
      '2 Telas Simultâneas',
      'Qualidade 4K Ultra HD',
      'Suporte Prioritário no WhatsApp',
      'Grade Completa de Filmes e Séries'
    ],
    ctaRoute: '/ir/plano-trimestral/',
    ctaText: 'ASSINAR AGORA! 🚀',
    whatsappMessage: 'Olá! Quero assinar o plano de 3 Meses por R$ 70! Vim do assistatv.com.br'
  },
  {
    id: 'semestral',
    duration: '6 Meses',
    screens: 3,
    price: 130,
    oldPrice: 240,
    discountPercentage: 46,
    desc: 'SUPER DESCONTO!',
    popular: true,
    color: 'from-pink-500 via-yellow-500 to-cyan-500',
    shadow: 'shadow-pink-500/80',
    features: [
      '3 Telas Simultâneas para Toda a Casa',
      'Qualidade 4K/HD e 60 FPS Reais',
      'Todos os Jogos do Brasileirão e Champions',
      'Suporte Humano VIP 7 Dias'
    ],
    ctaRoute: '/ir/plano-semestral/',
    ctaText: 'ASSINAR AGORA! 🚀',
    whatsappMessage: 'Olá! Quero aproveitar o plano de 6 Meses por R$ 130 (Mais Vendido)! Vim do assistatv.com.br'
  },
  {
    id: 'anual',
    duration: '12 Meses',
    screens: 3,
    price: 240,
    oldPrice: 480,
    discountPercentage: 50,
    desc: 'METADE DO PREÇO!',
    popular: false,
    color: 'from-green-500 to-emerald-500',
    shadow: 'shadow-green-500/50',
    features: [
      '3 Telas Simultâneas Liberadas',
      'Equivalente a apenas R$ 20,00/mês',
      'Sem reajustes durante 1 ano inteiro',
      'Acesso Imediato em Menos de 3 Minutos'
    ],
    ctaRoute: '/ir/plano-anual/',
    ctaText: 'ASSINAR AGORA! 🚀',
    whatsappMessage: 'Olá! Quero garantir a oferta do plano de 12 Meses por R$ 240 (50% OFF)! Vim do assistatv.com.br'
  }
];

