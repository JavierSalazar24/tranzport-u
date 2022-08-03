App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    await App.renderTickets();
  },
  loadWeb3: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("No está instalada una billetera. Intenta instalando Metamask");
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      const res = await fetch("TicketsContract.json");
      const ticketsContractJSON = await res.json();
      App.contracts.TicketsContract = TruffleContract(ticketsContractJSON);
      App.contracts.TicketsContract.setProvider(App.web3Provider);

      App.ticketsContract = await App.contracts.TicketsContract.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    if (document.getElementById("account")) {
      document.getElementById("account").innerText = App.account;
    }
  },
  renderTickets: async () => {
    const ticketsCounter = await App.ticketsContract.ticketsCounter();
    const ticketCounterNumber = ticketsCounter.toNumber();

    let html = "";

    for (let i = 2; i <= ticketCounterNumber; i++) {
      const ticket = await App.ticketsContract.tickets(i);
      const ticketId = ticket[0].toNumber();
      const ticketTitle = ticket[1];
      const ticketDescription = ticket[2];
      const ticketPrice = ticket[3].toNumber();
      const ticketCreatedAt = ticket[4];

      let ticketElement = `<div class="card bg-dark mb-2">
          <div class="card-header d-flex justify-content-between align-items-center pb-0">
            <h5>${ticketTitle}</h5>
          </div>
          <div class="card-body">
            <span>${ticketDescription}</span>
            <p>El costo fue de ${ticketPrice} ETH <i class="fab fa-ethereum"></i> <i class="fab fa-bitcoin"></i>.</p>
            <p class="mt-2 text-muted">El ticket fue comprado el ${new Date(
              ticketCreatedAt * 1000
            ).toLocaleString()} <i class="fal fa-calendar-alt"></i></p>
          </div>
        </div>`;
      html += ticketElement;
    }

    if (document.querySelector("#ticketsList")) {
      document.querySelector("#ticketsList").innerHTML = html;
    }
  },
  createTicket: async (title, description, price) => {
    try {
      const result = await App.ticketsContract.createTicket(
        title,
        description,
        price,
        {
          from: App.account,
        }
      );
      alert("Ticket comprado");
    } catch (error) {
      console.error(error);
    }
  },
  // toggleDone: async (element) => {
  //   const ticketId = element.dataset.id;
  //   await App.ticketsContract.toggleDone(ticketId, {
  //     from: App.account,
  //   });
  //   window.location.reload();
  // },
};

App.init();
