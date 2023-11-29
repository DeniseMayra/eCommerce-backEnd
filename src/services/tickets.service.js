import { ticketDAO } from '../dao/dao-manager.js';

export class TicketsService {

  static add(ticket) {
    return ticketDAO.addTicket(ticket);
  }

  static get() {
    return ticketDAO.getTickets();
  }
}
