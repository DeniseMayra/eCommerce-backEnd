import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server:{
    secretSession: process.env.SECRET_SESSION,
    persistence: process.env.PERSISTENCE
  },
  mongo:{
    url: process.env.MONGO_URL
  },
  github:{
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  token:{
    secretToken: process.env.SECRET_JSONWEBTOKEN
  },
  gmail:{
    account: process.env.GMAIL_ACCOUNT,
    password: process.env.GMAIL_PASS
  },
  twilio: {
    account: process.env.TWILIO_ACCOUNT_ID,
    token: process.env.TWILIO_TOKEN,
    phone: process.env.TWILIO_PHONE,
  },
  client: {
    phone: process.env.CLIENT_PHONE
  }
};
