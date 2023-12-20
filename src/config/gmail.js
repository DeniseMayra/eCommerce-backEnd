import nodemailer from 'nodemailer';
import { config } from './config.js';

export const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: config.gmail.account,
    pass: config.gmail.password
  },
  // variables que se habilitan en produccion
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});
