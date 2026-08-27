export const WHATSAPP_NUMBER = '201033545500';
export const WHATSAPP_RAW_PHONE = '01033545500';
export const WHATSAPP_DISPLAY = '+20 10 3354 5500';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const VODAFONE_CASH_NUMBER = '01033545500';
export const INSTAPAY_ADDRESS = '01033545500@instapay';
export const INSTAPAY_PHONE = '01033545500';

export const getWhatsAppUrl = (customMessage?: string) => {
  if (!customMessage) return WHATSAPP_LINK;
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(customMessage)}`;
};
