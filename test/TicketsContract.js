const TicketsContract = artifacts.require("TicketsContract");

contract("TicketsContract", (accounts) => {
  before(async () => {
    this.ticketsContract = await TicketsContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = await this.ticketsContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get Tickets List", async () => {
    const ticketsCounter = await this.ticketsContract.ticketsCounter();
    const ticket = await this.ticketsContract.tickets(ticketsCounter);

    assert.equal(ticket.id.toNumber(), ticketsCounter.toNumber());
    assert.equal(ticket.title, "Compro un ticket");
    assert.equal(ticket.description, "Se compro un ticket de autobus");
    assert.equal(ticket.price.toNumber(), 2);
    // assert.equal(ticket.done, false);
    assert.equal(ticketsCounter, 1);
  });

  it("ticket created successfully", async () => {
    const result = await this.ticketsContract.createTicket(
      "Compro un ticket 2",
      "Se compro un ticket de autobus 2",
      2
    );
    const ticketEvent = result.logs[0].args;
    const ticketsCounter = await this.ticketsContract.ticketsCounter();

    assert.equal(ticketsCounter, 2);
    assert.equal(ticketEvent.id.toNumber(), 2);
    assert.equal(ticketEvent.title, "Compro un ticket 2");
    assert.equal(ticketEvent.description, "Se compro un ticket de autobus 2");
    assert.equal(ticketEvent.price.toNumber(), 2);
    // assert.equal(ticketEvent.done, false);
  });

  // it("ticket toggled done", async () => {
  //   const result = await this.ticketsContract.toggleDone(1);
  //   const ticketEvent = result.logs[0].args;
  //   const ticket = await this.ticketsContract.tickets(1);

  //   assert.equal(ticket.done, true);
  //   assert.equal(ticketEvent.id.toNumber(), 1);
  //   // assert.equal(ticketEvent.done, true);
  // });
});
