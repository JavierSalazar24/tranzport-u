// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TicketsContract {
    uint256 public ticketsCounter = 0;

    struct Ticket {
        uint256 id;
        string title;
        string description;
        uint256 price;
        uint256 createdAt;
    }

    event TicketCreated(
        uint256 id,
        string title,
        string description,
        uint256 price,
        uint256 createdAt
    );
    // event TicketToggledDone(uint256 id, bool done);

    mapping(uint256 => Ticket) public tickets;

    constructor() {
        createTicket("Compro un ticket", "Se compro un ticket de autobus", 2);
    }

    function createTicket(
        string memory _title,
        string memory _description,
        uint256 _price
    ) public {
        ticketsCounter++;
        tickets[ticketsCounter] = Ticket(
            ticketsCounter,
            _title,
            _description,
            _price,
            block.timestamp
        );
        emit TicketCreated(
            ticketsCounter,
            _title,
            _description,
            _price,
            block.timestamp
        );
    }

    // function toggleDone(uint256 _id) public {
    //     Ticket memory _ticket = tickets[_id];
    //     tickets[_id] = _ticket;
    //     emit TicketToggledDone(_id, _ticket.done);
    // }
}
