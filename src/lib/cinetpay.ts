import { apiClient } from '../services/api';

const CINETPAY_API_URL = 'https://api-checkout.cinetpay.com/v2/payment';

interface PaymentConfig {
  amount: number;
  currency: string;
  description: string;
  return_url: string;
  transaction_id: string;
}

export const initializePayment = async (config: PaymentConfig) => {
  try {
    const response = await apiClient.post(CINETPAY_API_URL, {
      apikey: import.meta.env.VITE_CINETPAY_API_KEY,
      site_id: import.meta.env.VITE_CINETPAY_SITE_ID,
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error('CinetPay initialization failed:', error);
    throw error;
  }
};