// Mashq va ovqat dasturlari. 1-kun hammaga ochiq, qolganlari obunachilar uchun.
(() => {
  const D = {
    ozish: { t: "Ozish", kcal: "1600–1900 kkal", mac: "Oqsil 30% · Uglevod 40% · Yog' 30%",
      w: [["1-kun · HIIT va press", ["Burpee 4×12", "Arqon sakrash 5×1 daq", "Planka 3×45 s", "Jump knee-tuck 4×10"]],
          ["2-kun · Pastki tana", ["Skuat 4×15", "Lanj 3×12 (har oyoq)", "Glute bridge 3×15", "Yugurish 25 daq"]],
          ["3-kun · Yoga va tiklanish", ["Quyosh salomi 5 doira", "Jangchi pozalari 3×40 s", "Chuqur nafas 5 daq"]],
          ["4-kun · Yuqori tana va kardio", ["Push-up 4×12", "Gantel tortish 3×12", "Boks 4×3 daq"]]],
      f: [["Nonushta", ["Tuxum omleti (2 ta), ko'katlar", "Suli bo'tqasi 40 g"]], ["Tushlik", ["Tovuq ko'kragi 150 g", "Grechka 80 g", "Sabzavot salat"]],
          ["Yengil tamaddi", ["Tvorog 150 g", "Olma"]], ["Kechki ovqat", ["Baliq 150 g", "Bug'langan sabzavot"]]] },
    massa: { t: "Massa olish", kcal: "2700–3100 kkal", mac: "Oqsil 25% · Uglevod 50% · Yog' 25%",
      w: [["1-kun · Ko'krak va triceps", ["Shtanga press 4×8", "Gantel press 3×10", "Brusya 3×10", "Triceps 3×12"]],
          ["2-kun · Orqa va biceps", ["Tortilish 4×8", "Shtanga qatori 4×8", "Biceps 3×12", "Giperekstenziya 3×15"]],
          ["3-kun · Oyoq", ["Skuat 5×6", "Rumin tortish 4×8", "Oyoq press 3×12", "Boldir 4×15"]],
          ["4-kun · Yelka va press", ["Yelka press 4×8", "Yon ko'tarish 3×15", "Shrag 3×12", "Osilib oyoq ko'tarish 3×12"]]],
      f: [["Nonushta", ["Tuxum (3 ta) va non", "Suli, banan, yong'oq"]], ["Tushlik", ["Mol go'shti 200 g", "Guruch 120 g", "Salat"]],
          ["Yengil tamaddi", ["Tvorog, asal", "Quritilgan meva"]], ["Kechki ovqat", ["Tovuq 200 g", "Kartoshka 200 g", "Sabzavot"]]] },
    shakl: { t: "Shaklni saqlash", kcal: "2100–2400 kkal", mac: "Oqsil 27% · Uglevod 45% · Yog' 28%",
      w: [["1-kun · Butun tana", ["Skuat 3×12", "Push-up 3×12", "Gantel qatori 3×12", "Planka 3×45 s"]],
          ["2-kun · Kardio", ["Yugurish 30 daq", "Arqon sakrash 4×1 daq", "Velosiped 15 daq"]],
          ["3-kun · Yoga", ["Cho'zilish kompleksi 30 daq", "Balans pozalari 3×40 s", "Meditatsiya 5 daq"]],
          ["4-kun · Kuch va barqarorlik", ["Lanj 3×12", "Gantel press 3×10", "Yon planka 3×30 s", "Glute bridge 3×15"]]],
      f: [["Nonushta", ["Yogurt, granola, mevalar"]], ["Tushlik", ["Baliq yoki tovuq 150 g", "Bulgur 80 g", "Salat"]],
          ["Yengil tamaddi", ["Yong'oq 30 g", "Meva"]], ["Kechki ovqat", ["Sabzavotli omlet", "Qora non"]]] }
  };
  let goal = "ozish", tab = "w";
  const root = () => document.getElementById("programs-container");
  function render() {
    const r = root(); if (!r) return;
    const g = D[goal], on = window.gymSub && window.gymSub.active;
    const items = g[tab];
    r.innerHTML = `<div class="pg-tabs" role="tablist">${Object.keys(D).map(k => `<button class="pg-tab ${k === goal ? "active" : ""}" data-g="${k}">${D[k].t}</button>`).join("")}</div>
      <div class="pg-tabs"><button class="pg-tab ${tab === "w" ? "active" : ""}" data-t="w">Mashqlar</button><button class="pg-tab ${tab === "f" ? "active" : ""}" data-t="f">Ovqat rejasi</button></div>
      <p class="pg-meta">${tab === "f" ? `Kunlik ${g.kcal} · ${g.mac}` : "Haftada 4 mashg'ulot, har biri 45–60 daqiqa. Dam olish kunlari yengil yurish."}</p>
      <div class="pg-grid">${items.map((d, i) => {
        const lock = i > 0 && !on;
        return `<div class="pg-day glass-panel ${lock ? "locked" : ""}"><h4>${d[0]}</h4>${Fig.card(d[1])}${lock ? `<div class="pg-lock"><a class="btn glow-btn" href="#subscription">Obuna bilan ochish</a></div>` : ""}</div>`;
      }).join("")}</div>`;
    r.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { goal = b.dataset.g; render(); });
    r.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { tab = b.dataset.t; render(); });
  }
  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("subchange", render);
})();
