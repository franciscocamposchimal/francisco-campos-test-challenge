import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: process.env.PORT || 3002,
  host: process.env.MS_HOST || 'localhost',
  msPort: process.env.MS_PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
}));
