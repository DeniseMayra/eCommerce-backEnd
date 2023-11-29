import { ticketModel } from '../models/ticket.model.js';

export class TicketManagerMongo {
  constructor() {
    this.model = ticketModel;
  };

  addTicket = async (object) => {
    try {
      const result = await this.model.create(object);
      return result;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getTickets = async() => {
    try{
      const result = await this.model.find();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }
}
