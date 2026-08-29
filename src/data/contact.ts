export const WHATSAPP_NUMBER = '201501867676';
export const WHATSAPP_RAW_PHONE = '01501867676';
export const WHATSAPP_DISPLAY = '+20 15 0186 7676';
export const PHONE_NUMBER_DISPLAY = '01501867676';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const VODAFONE_CASH_NUMBER = '01501867676';
export const INSTAPAY_ADDRESS = '01501867676@instapay';
export const INSTAPAY_PHONE = '01501867676';

export const getWhatsAppUrl = (customMessage?: string) => {
  if (!customMessage) return WHATSAPP_LINK;
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(customMessage)}`;
};
