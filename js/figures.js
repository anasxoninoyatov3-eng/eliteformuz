// Chiziqli (line-art) animatsion mashq ko'rsatmalari. Har bir mashq 2 ta poza (A va B), orasida silliq harakat.
// Nuqtalar: bosh, bo'yin, tos, chap tirsak, chap qo'l, o'ng tirsak, o'ng qo'l, chap tizza, chap oyoq, o'ng tizza, o'ng oyoq
(() => {
  const E = {
    squat: { n: "Skuat", A: [50,14,50,24,50,52,52,38,52,50,52,38,52,50,52,72,50,92,52,72,50,92], B: [47,43,42,52,30,70,56,54,68,52,56,54,68,52,54,70,48,92,54,70,48,92],
      how: "Oyoqlar yelka kengligida. Dumbani orqaga tortib, son yerga parallel bo'lguncha cho'kkalang. Tizzalar oyoq uchi ustida, orqa tekis. Tovon bilan itarilib turing." },
    pushup: { n: "Push-up", A: [84,48,76,54,40,66,76,72,76,88,76,72,76,88,26,77,12,88,26,77,12,88], B: [84,70,76,74,40,78,62,82,76,88,62,82,76,88,26,83,12,88,26,83,12,88],
      how: "Qo'llar yelkadan biroz kengroq. Tanani boshdan tovongacha tekis tuting. Ko'krak yerga yaqinlashguncha tushing, so'ng itarilib ko'tariling." },
    plank: { n: "Planka", A: [84,56,76,62,42,70,76,80,86,80,76,80,86,80,27,78,12,88,27,78,12,88], B: [84,58,76,64,42,72,76,80,86,80,76,80,86,80,27,80,12,88,27,80,12,88],
      how: "Tirsaklar yelka ostida. Tana to'g'ri chiziq: dumba ko'tarilmasin va cho'kmasin. Qorinni tortib, bir me'yorda nafas oling." },
    lunge: { n: "Lanj", A: [50,14,50,24,50,52,52,38,52,50,52,38,52,50,54,72,56,92,46,72,44,92], B: [50,32,50,42,50,62,52,50,52,60,52,50,52,60,70,66,70,92,34,84,20,92],
      how: "Katta qadam tashlang. Old tizza 90° gacha bukiladi, orqa tizza yerga yaqinlashadi. Tana tik. Oldingi tovon bilan itarilib qayting." },
    jack: { n: "Sakrab yoyilish", A: [50,12,50,22,50,50,44,36,42,48,56,36,58,48,46,72,44,92,54,72,56,92], B: [50,12,50,22,50,50,36,18,28,6,64,18,72,6,38,72,30,92,62,72,70,92],
      how: "Sakrab oyoqlarni yoying, qo'llarni tepada uchrashtiring. Sakrab qaytib, qo'llarni pastga tushiring. Yengil va ritmik." },
    tuck: { n: "Jump knee-tuck", A: [50,14,50,24,50,52,44,38,42,50,56,38,58,50,46,72,44,92,54,72,56,92], B: [50,2,50,12,50,38,44,26,42,38,56,26,58,38,52,50,48,62,60,50,56,62],
      how: "Yuqoriga sakrang va havoda tizzalarni ko'kragingizga torting. Tizzalarni bukib, yumshoq qo'nang. Qo'llar muvozanat uchun harakatlanadi." },
    bridge: { n: "Glute bridge", A: [10,82,18,84,46,86,30,88,42,88,30,88,42,88,62,66,70,90,62,66,70,90], B: [10,82,18,84,46,62,30,88,42,88,30,88,42,88,62,60,70,90,62,60,70,90],
      how: "Orqada yoting, tizzalar bukilgan. Tovonlar bilan itarilib, dumbani yelkadan tizzagacha to'g'ri chiziq bo'lguncha ko'taring. 1 soniya ushlang." }
  };
  const KEYS = [["skuat", "squat"], ["push-up", "pushup"], ["planka", "plank"], ["lanj", "lunge"], ["arqon", "jack"], ["knee-tuck", "tuck"], ["glute", "bridge"]];
  const find = (name) => { const s = name.toLowerCase(); const k = KEYS.find(([w]) => s.includes(w)); return k && k[1]; };
  const BONES = [[0,1],[1,2],[1,3],[3,4],[1,5],[5,6],[2,7],[7,8],[2,9],[9,10]];
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const an = (at, a, b) => still ? "" : `<animate attributeName="${at}" values="${a};${b};${a}" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="1.8s" repeatCount="indefinite"/>`;
  function svg(key) {
    const { A, B } = E[key];
    const L = BONES.map(([i, j]) => `<line x1="${A[2*i]}" y1="${A[2*i+1]}" x2="${A[2*j]}" y2="${A[2*j+1]}">${an("x1", A[2*i], B[2*i])}${an("y1", A[2*i+1], B[2*i+1])}${an("x2", A[2*j], B[2*j])}${an("y2", A[2*j+1], B[2*j+1])}</line>`).join("");
    const H = `<circle cx="${A[0]}" cy="${A[1]}" r="6" fill="#fff">${an("cx", A[0], B[0])}${an("cy", A[1], B[1])}</circle>`;
    return `<svg viewBox="0 0 100 100" role="img" aria-label="${E[key].n} mashqi" class="fig"><line x1="4" y1="93" x2="96" y2="93" class="ground"/><g stroke="#111" stroke-width="2.4" stroke-linecap="round" fill="none">${L}${H.replace("<circle", '<circle stroke="#111" stroke-width="2.4"')}</g></svg>`;
  }
  const rep = (s) => (s.match(/\d+[×x]\d+|\d+ ?(daq|s)\b/) || [""])[0];
  function card(list) {
    const first = list.map(find).find(Boolean);
    const rows = list.map((x, i) => { const k = find(x); return k ? `<button class="ex-btn" data-k="${k}">${x}</button>` : `<span class="ex-btn plain">${x}</span>`; }).join("");
    return `<div class="ex">${first ? `<div class="ex-fig">${svg(first)}</div><p class="ex-how">${E[first].how}</p>` : ""}<div class="ex-list">${rows}</div></div>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".ex-btn[data-k]"); if (!b) return;
    const ex = b.closest(".ex"); ex.querySelector(".ex-fig").innerHTML = svg(b.dataset.k); ex.querySelector(".ex-how").textContent = E[b.dataset.k].how;
    ex.querySelectorAll(".ex-btn").forEach((x) => x.classList.toggle("on", x === b));
  });
  document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("hero-demo"); if (!el) return;
    const ks = Object.keys(E), d = new Date(), k = ks[Math.floor(d / 864e5) % ks.length];
    el.innerHTML = `<div class="ex-fig">${svg(k)}</div><div class="demo-name">${E[k].n}</div><div class="demo-tag">Bugungi mashq</div><p class="ex-how">${E[k].how}</p>`;
  });
  window.Fig = { card, svg, find };
})();
