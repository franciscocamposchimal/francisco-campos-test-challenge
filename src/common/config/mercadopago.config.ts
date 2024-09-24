import { registerAs } from '@nestjs/config';

export default registerAs('mercadopago', () => ({
  publicKey: process.env.MP_PUBLIC_KEY,
  accessToken: process.env.MP_ACCESS_TOKEN,
  nodeEnv: process.env.NODE_ENV || 'development',
}));
