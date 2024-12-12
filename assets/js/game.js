let baraja = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// esta funcion crea un nuevo deck o baraja
const crearBaraja = () => {
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      baraja.push(i + tipo);
    }
  }
  for (const tipo of tipos) {
    for (const esp of especiales) {
      baraja.push(esp + tipo);
    }
  }

  // la funcion _.shuffle mezcla la baraja esta funcion se trajo de underscorejs
  baraja = _.shuffle(baraja);
  return baraja;
};

crearBaraja();

// esta funcion me permite pedir una carta
const pedirCarta = () => {
  //   console.log(baraja);
  let carta = baraja.shift(); //eliminamos el primer elemento de la baraja y lo asignamos a la variable carta
  //  console.log(carta); //imprimimos la carta
  return carta;
};
// pedirCarta()

const valorCarta = (carta) => {
  const valor = carta.slice(0, -1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);
};

const divCartasJugador = document.querySelector("#jugador-carta");
const btnpedircarta = document.querySelector("#pedircarta");
const smalls = document.querySelectorAll("small");
let totalPuntos = 0; //incializamos el total de puntos en 0

btnpedircarta.addEventListener("click", () => {
  const carta = pedirCarta();
  //guardamos la carta solicitada
  // const valor = valorCarta(carta);
  // sacamos el valor de la carta
  totalPuntos += valorCarta(carta);
  // vamos sumando el valor de las cartas mostradas
  smalls[0].innerText = totalPuntos;
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
    if (totalPuntos > 21) {
      alert("sorry! perdiste");
      btnpedircarta.disabled = true; //funcionalidad para deshabilitar el boton luego de pedir
      btndetener.disabled = true;
      turnoLaptop(totalPuntos);
    } else if (totalPuntos === 21) {
      alert("Genial, ganaste!");
      btnpedircarta.disabled = true;
      btndetener.disabled = true;
      turnoLaptop(totalPuntos);
    }
  },100)
});

let puntosLaptop = 0;
const divCartasLaptop = document.querySelector("#computadora-carta");

const turnoLaptop = (totalPuntos) => {
  do {
    const carta = pedirCarta();

    puntosLaptop += valorCarta(carta);
    // vamos sumando el valor de las cartas mostradas
    smalls[1].innerText = puntosLaptop;
    //añadimos el valor de puntos del juador a la etiqueta small del jugador
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
  } while (puntosLaptop < totalPuntos && totalPuntos <= 21);
  setTimeout(() => {
    if (puntosLaptop === totalPuntos) {
      alert("Nadie gana :(");
    } else if (totalPuntos > 21) {
      alert("Computadora gana");
    } else if (puntosLaptop > 21) {
      alert("Jugador Gana");
    } else {
      alert("Computadora Gana");
    }
  }, 100);
};

const btndetener = document.querySelector("#detener");

btndetener.addEventListener("click", () => {
  btnpedircarta.disabled = true;
  btndetener.disabled = true;
  turnoLaptop(totalPuntos);
});


const btnNewGame = document.querySelector('#newgame')

btnNewGame.addEventListener('click', () => {
  console.clear()
  baraja = []
  baraja = crearBaraja()
  divCartasJugador.innerHTML = ''
  divCartasLaptop.innerHTML = ''
  btnpedircarta.disabled = false
  btndetener.disabled = false
  totalPuntos = 0
  puntosLaptop = 0
  smalls[0].innerText=0
  smalls[1].innerText = 0;
})