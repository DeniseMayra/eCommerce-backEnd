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
  }
};
