/**
 * assistatv.com.br — Configurações Globais
 * WhatsApp Oficial Homologado: 555199716477
 */

export const SITE_CONFIG = {
  name: 'Assista TV',
  legalName: 'Assista TV Serviços Digitais',
  domain: 'assistatv.com.br',
  url: 'https://assistatv.com.br',
  tagline: 'IPTV Premium em Até 3 Telas Simultâneas | Teste Grátis',
  description: 'IPTV 4K com canais ao vivo, futebol sem travamentos, filmes e séries em até 3 telas ao mesmo tempo. Suporte 100% humanizado no WhatsApp.',
  whatsapp: {
    number: '555199716477',
    display: '(51) 99716-477',
    defaultMessage: 'Olá! Vim pelo site assistatv.com.br e gostaria de solicitar meu teste grátis.'
  },
  routes: {
    home: '/',
    planos: '#planos',
    comoFunciona: '#como-funciona',
    faq: '#faq',
    termos: '/termos-uso/',
    privacidade: '/politica-privacidade/'
  }
} as const;

export function buildWhatsAppLink(message?: string): string {
  const msg = encodeURIComponent(message || SITE_CONFIG.whatsapp.defaultMessage);
  return `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${msg}`;
}

