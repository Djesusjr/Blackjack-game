  (() => {
    let deck = [];
    const tipos = ["C", "D", "H", "S"];
    especiales = ["A", "J", "Q", "K"];

    let puntosJugadores = []

    const divCartasJugador = document.querySelector("#jugador-carta"),
          smalls = document.querySelectorAll("small"),
          divCartasLaptop = document.querySelector("#computadora-carta"),
          btnpedircarta = document.querySelector("#pedircarta"),
          btndetener = document.querySelector("#detener"),
          btnNewGame = document.querySelector("#newgame");

    //this function initializes the game
    const inicializarGame = (numJugadores = 1) => {
      deck = []
      for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0)
      }
      console.log({puntosJugadores});
    };

    // esta funcion crea un nuevo deck
    const crearDeck = () => {
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

    // esta funcion me permite pedir una carta
    const pedirCarta = () => {
      if (deck.length === 0) {
        throw "no hay cartas en el deck";
      }
      return deck.shift();
    };
    
    // esta funcion toma determina si el valor de una carta es un numero o una letra
    const valorCarta = (carta) => {
      const valor = carta.slice(0, -1);
      return isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);
    };
    
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        // vamos sumando el valor de las cartas mostradas
        smalls[turno].innerText = puntosJugadores[turno]
        return puntosJugadores[turno]
      }



    btnpedircarta.addEventListener("click", () => {
      const carta = pedirCarta();
      let puntosJugador = acumularPuntos(carta,0)
      //añadimos el valor de puntos del juador a la etiqueta small del jugador
      const imgCarta = document.createElement("img");
      // creamos un nuevo elemento img
      imgCarta.src = `assets/cartas/${carta}.png`;
      // asignamos la ruta de donde tomara la imagen el elemento img
      imgCarta.classList.add("carta");
      // le asignamos una clase al elemento img
      divCartasJugador.append(imgCarta);
      // añadimos el elemento al dom o html
      setTimeout(() => {
        if (puntosJugador > 21) {
          alert("sorry! perdiste");
          btnpedircarta.disabled = true; //funcionalidad para deshabilitar el boton luego de pedir
          btndetener.disabled = true;
          turnoLaptop(puntosJugador);
        } else if (puntosJugador === 21) {
          alert("Genial, ganaste!");
          btnpedircarta.disabled = true;
          btndetener.disabled = true;
          turnoLaptop(puntosJugador);
        }
      }, 100);
    });


    const turnoLaptop = (totalPuntos) => {
      do {
        const carta = pedirCarta();
        puntosJugadores[-1] = acumularPuntos(carta,puntosJugadores.length-1)
        const imgCarta = document.createElement("img");
        // creamos un nuevo elemento img
        imgCarta.src = `assets/cartas/${carta}.png`;
        // asignamos la ruta de donde tomara la imagen el elemento img
        imgCarta.classList.add("carta");
        // le asignamos una clase al elemento img
        divCartasLaptop.append(imgCarta);
        // añadimos el elemento al dom o html
        if (totalPuntos > 21) {
          break;
        }
      } while (puntosJugadores[-1] < totalPuntos && totalPuntos <= 21);
      setTimeout(() => {
        if (puntosJugadores[-1] === puntosJugadores[0]) {
          alert("Nadie gana :(");
        } else if (totalPuntos > 21) {
          alert("Computadora gana!");
        } else if (puntosJugadores[-1] > 21) {
          alert("Jugador Gana");
        } else {
          alert("Computadora Gana!");
        }
      }, 100);
    };


    btndetener.addEventListener("click", () => {
      btnpedircarta.disabled = true;
      btndetener.disabled = true;
      turnoLaptop(puntosJugadores[0]);
    });

    

    btnNewGame.addEventListener("click", () => {
      console.clear();
      inicializarGame();
      divCartasJugador.innerHTML = "";
      divCartasLaptop.innerHTML = "";
      btnpedircarta.disabled = false;
      btndetener.disabled = false;
      smalls[0].innerText = 0;
      smalls[1].innerText = 0;
    });
  })();