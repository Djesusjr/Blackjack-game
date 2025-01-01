(() => {
  ("use strict")

  let deck          = [];
  const tipos       = ["C", "D", "H", "S"],
        especiales  = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

// referencias al html mejor
  const btnpedircarta = document.querySelector("#pedircarta"),
        btndetener = document.querySelector("#detener"),
        btnNewGame = document.querySelector("#newgame");

  const divCartasJugadores = document.querySelectorAll('.divcartas')
        puntosHTML = document.querySelectorAll("small");

  const inicializaJuego = ( numJugadores = 2 ) => {
    deck = crearDeck()  
    puntosJugadores = Array(puntosHTML.length).fill(0);
    }
    console.log(puntosJugadores);


  const crearDeck = () => {
    deck = []
    for (let i = 2; i <= 10; i++) {
      for (const tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (const tipo of tipos) {
      for (const esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    // la funcion _.shuffle mezcla la baraja esta funcion se trajo de underscorejs
    return _.shuffle(deck);
  };

  const pedirCarta = () => {
    return (deck.length === 0) ?
      (() => { throw ("No hay cartas en el deck") })() :
      deck.pop();
  };
  
  const valorCarta = (carta) => {
    const valor = carta.slice(0, -1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);
  };

  const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno]
    return puntosJugadores[turno]
  }

  const crearCarta = (carta, turno) => {

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  }



  const turnoLaptop = (totalPuntos) => {
    let puntosLaptop = 0

    do {
      const carta = pedirCarta();
      puntosLaptop = acumularPuntos(carta, puntosJugadores.length - 1)
      crearCarta(carta, puntosJugadores.length - 1);
      if (totalPuntos > 21) break;
      }
    
    while ((puntosLaptop < totalPuntos) && (totalPuntos <= 21));

    setTimeout(() => {
      if (puntosLaptop === totalPuntos) {
        alert("Nadie gana :(");
      } else if (totalPuntos > 21) {
        alert("Computadora gana!");
      } else if (puntosLaptop > 21) {
        alert("Jugador Gana");
      } else {
        alert("Computadora Gana!");
      }
    }, 100);
  };

  btnpedircarta.addEventListener("click", () => {

    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0)
    
    crearCarta(carta,0)
    
    setTimeout(() => {
      if (puntosJugador > 21) {
        turnoLaptop(puntosJugador);
        btnpedircarta.disabled = true; //funcionalidad para deshabilitar el boton luego de pedir
        btndetener.disabled = true;  
      }
      else if (puntosJugador === 21) {
        turnoLaptop(puntosJugador);
        btnpedircarta.disabled = true;
        btndetener.disabled = true;
      }
    }, 100);
  });

  btndetener.addEventListener("click", () => {
    btnpedircarta.disabled = true;
    btndetener.disabled = true;
    turnoLaptop(puntosJugadores[0]);
  });

  

  btnNewGame.addEventListener("click", () => {
    console.clear();
    inicializaJuego(puntosHTML.length); // Asegúrate de reiniciar con el número correcto de jugadores
    divCartasJugadores.forEach((div) => (div.innerHTML = ""));
    puntosHTML.forEach((html) => (html.innerText = "0"));
    btnpedircarta.disabled = false;
    btndetener.disabled = false;
  });

})();
// el codigo se llama dentro de una funcion de flecha autoinvocada
