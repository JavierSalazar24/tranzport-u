document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

/**
 * Ticket form
 */

if (document.querySelector("#ticketFormNaranja")) {
  const ticketFormNaranja = document.querySelector("#ticketFormNaranja");

  ticketFormNaranja.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = "Usted compró un ticket de autobús.";
    const description = "Se compró un ticket de autobús para la ruta naranja.";
    const price = 2;
    App.createTicket(title, description, price);
  });
}

if (document.querySelector("#ticketFormAzul")) {
  const ticketFormAzul = document.querySelector("#ticketFormAzul");

  ticketFormAzul.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = "Usted compró un ticket de autobús.";
    const description = "Se compró un ticket de autobús para la ruta azul.";
    const price = 2;
    App.createTicket(title, description, price);
  });
}

if (document.querySelector("#ticketFormVerde")) {
  const ticketFormVerde = document.querySelector("#ticketFormVerde");

  ticketFormVerde.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = "Usted compró un ticket de autobús.";
    const description = "Se compró un ticket de autobús para la ruta verde.";
    const price = 2;
    App.createTicket(title, description, price);
  });
}

if (document.querySelector("#ticketFormRojo")) {
  const ticketFormRojo = document.querySelector("#ticketFormRojo");

  ticketFormRojo.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = "Usted compró un ticket de autobús.";
    const description = "Se compró un ticket de autobús para la ruta roja.";
    const price = 2;
    App.createTicket(title, description, price);
  });
}
