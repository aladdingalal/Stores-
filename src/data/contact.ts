export const WHATSAPP_NUMBER = '201033545500';
export const WHATSAPP_DISPLAY = '+20 10 3354 5500';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const getWhatsAppUrl = (customMessage?: string) => {
  if (!customMessage) return WHATSAPP_LINK;
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(customMessage)}`;
};
