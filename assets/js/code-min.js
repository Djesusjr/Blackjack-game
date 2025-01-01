(() => {
  "use strict";
  let e = [],
    l = ["C", "D", "H", "S"],
    a = ["A", "J", "Q", "K"],
    t = [],
    r = document.querySelector("#pedircarta"),
    d = document.querySelector("#detener"),
    n = document.querySelector("#newgame"),
    s = document.querySelectorAll(".divcartas"),
    puntosHTML = document.querySelectorAll("small");
  let i = (l = 2) => {
    (e = c()), (t = Array(puntosHTML.length).fill(0));
  };
  console.log(t);
  let c = () => {
      e = [];
      for (let t = 2; t <= 10; t++) for (let r of l) e.push(t + r);
      for (let d of l) for (let n of a) e.push(n + d);
      return _.shuffle(e);
    },
    o = () =>
      0 === e.length
        ? (() => {
            throw "No hay cartas en el deck";
          })()
        : e.pop(),
    $ = (e) => {
      let l = e.slice(0, -1);
      return isNaN(l) ? ("A" === l ? 11 : 10) : Number(l);
    },
    u = (e, l) => ((t[l] += $(e)), (puntosHTML[l].innerText = t[l]), t[l]),
    f = (e, l) => {
      let a = document.createElement("img");
      (a.src = `assets/cartas/${e}.png`),
        a.classList.add("carta"),
        s[l].append(a);
    },
    h = (e) => {
      let l = 0;
      do {
        let a = o();
        if (((l = u(a, t.length - 1)), f(a, t.length - 1), e > 21)) break;
      } while (l < e && e <= 21);
      setTimeout(() => {
        l === e
          ? alert("Nadie gana :(")
          : e > 21
          ? alert("Computadora gana!")
          : l > 21
          ? alert("Jugador Gana")
          : alert("Computadora Gana!");
      }, 100);
    };
  r.addEventListener("click", () => {
    let e = o(),
      l = u(e, 0);
    f(e, 0),
      setTimeout(() => {
        l > 21
          ? (h(l), (r.disabled = !0), (d.disabled = !0))
          : 21 === l && (h(l), (r.disabled = !0), (d.disabled = !0));
      }, 100);
  }),
    d.addEventListener("click", () => {
      (r.disabled = !0), (d.disabled = !0), h(t[0]);
    }),
    n.addEventListener("click", () => {
      console.clear(),
        i(puntosHTML.length),
        s.forEach((e) => (e.innerHTML = "")),
        puntosHTML.forEach((e) => (e.innerText = "0")),
        (r.disabled = !1),
        (d.disabled = !1);
    });
})();
