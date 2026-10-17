// ============================================
// ELITEFORM FITNESS - 1 OYLIK JADVAL TIZIMI
// ============================================

// Har bir akkaunt uchun alohida bandlovlar
function bkKey(){const u=JSON.parse(localStorage.getItem('gymUser')||'null');return 'bookedLessons:'+(u?u.email:'guest');}
function loadBookings(){try{return JSON.parse(localStorage.getItem(bkKey())||'[]');}catch(e){return [];}}
function saveBookings(v){localStorage.setItem(bkKey(),JSON.stringify(v));}
// --- 1 OYLIK MASHG'ULOT MA'LUMOTLARI ---
const MONTHLY_SCHEDULE = {
  // Hafta 1 - DUSHANBA, CHORSHANBA, JUMA (DCJ)
  week1_dcj: [
    {
      time: "07:00 - 08:00",
      dushanba: { name: "Yugurish", type: "cardio", trainer: "R.Alisher", desc: "Sovuqqа chidamlilikni oshirish" },
      chorshanba: { name: "Velosiped", type: "cardio", trainer: "N.Dildora", desc: "Quvvatni oshirish" },
      juma: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Intensiv yog'ni yoqish" }
    },
    {
      time: "09:00 - 10:00",
      dushanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Cho'zilish va balans" },
      chorshanba: { name: "Fitness", type: "strength", trainer: "R.Alisher", desc: "Kuchni oshirish" },
      juma: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Meditatsiya va tinchlantirish" }
    },
    {
      time: "15:00 - 16:00",
      dushanba: { name: "Dam olish", type: "rest", trainer: "-", desc: "Organizmi tiklash" },
      chorshanba: { name: "Arqon sakrash", type: "cardio", trainer: "N.Dildora", desc: "Tezlikni oshirish" },
      juma: { name: "Gantel", type: "strength", trainer: "R.Alisher", desc: "Kuchni oshirish" }
    },
    {
      time: "19:00 - 20:00",
      dushanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli mushak trening" },
      chorshanba: { name: "Yoga", type: "yoga", trainer: "N.Dildora", desc: "Cho'zilishni oshirish" },
      juma: { name: "Dam olish", type: "rest", trainer: "-", desc: "Organizmi tiklash" }
    }
  ],
  // Hafta 1 - SESHANBA, PAYSHANBA, SHANBA (SPS)
  week1_sps: [
    {
      time: "07:00 - 08:00",
      seshanba: { name: "Boks", type: "cardio", trainer: "R.Alisher", desc: "Tezlik va kuch" },
      payshanba: { name: "Yugurish", type: "cardio", trainer: "N.Dildora", desc: "Chidamlilikni oshirish" },
      shanba: { name: "Velosiped", type: "cardio", trainer: "R.Alisher", desc: "Quvvatni oshirish" }
    },
    {
      time: "09:00 - 10:00",
      seshanba: { name: "Shtanga", type: "strength", trainer: "R.Alisher", desc: "Kuch mashqlari" },
      payshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Cho'zilish va tinchlantirish" },
      shanba: { name: "Kids Fitness", type: "cardio", trainer: "B.Malika", desc: "Bolalar uchun" }
    },
    {
      time: "15:00 - 16:00",
      seshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Meditatsiya" },
      payshanba: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Intensiv mashq" },
      shanba: { name: "Gantel", type: "strength", trainer: "R.Alisher", desc: "Kuchni oshirish" }
    },
    {
      time: "19:00 - 20:00",
      seshanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      payshanba: { name: "Dam olish", type: "rest", trainer: "-", desc: "Organizmi tiklash" },
      shanba: { name: "Yoga", type: "yoga", trainer: "N.Dildora", desc: "Hafta yakunlash" }
    }
  ],
  // Hafta 2 - DCJ
  week2_dcj: [
    {
      time: "07:00 - 08:00",
      dushanba: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Intensiv yog' yoqish" },
      chorshanba: { name: "Boks", type: "cardio", trainer: "R.Alisher", desc: "Tezlik va muvofiqlashish" },
      juma: { name: "Yugurish", type: "cardio", trainer: "N.Dildora", desc: "Tomir kuchaytirishdir" }
    },
    {
      time: "09:00 - 10:00",
      dushanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      chorshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Cho'zilish va balans" },
      juma: { name: "Shtanga", type: "strength", trainer: "R.Alisher", desc: "Kuch oshirish" }
    },
    {
      time: "15:00 - 16:00",
      dushanba: { name: "Gantel", type: "strength", trainer: "R.Alisher", desc: "Qo'l mushaklari" },
      chorshanba: { name: "Arqon sakrash", type: "cardio", trainer: "N.Dildora", desc: "Koordinatsiya" },
      juma: { name: "Dam olish", type: "rest", trainer: "-", desc: "Organizmi tiklash" }
    },
    {
      time: "19:00 - 20:00",
      dushanba: { name: "Yoga", type: "yoga", trainer: "N.Dildora", desc: "Tinchlantirish" },
      chorshanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      juma: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Haftani jadal tugatish" }
    }
  ],
  // Hafta 2 - SPS
  week2_sps: [
    {
      time: "07:00 - 08:00",
      seshanba: { name: "Arqon sakrash", type: "cardio", trainer: "R.Alisher", desc: "Koordinatsiya" },
      payshanba: { name: "HIIT", type: "cardio", trainer: "N.Dildora", desc: "Yog' yoqish" },
      shanba: { name: "Boks", type: "cardio", trainer: "R.Alisher", desc: "Kuch va tezlik" }
    },
    {
      time: "09:00 - 10:00",
      seshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Cho'zilish" },
      payshanba: { name: "Shtanga", type: "strength", trainer: "R.Alisher", desc: "Kuch mashqlari" },
      shanba: { name: "Kids Yoga", type: "yoga", trainer: "A.Kamila", desc: "Bolalar uchun" }
    },
    {
      time: "15:00 - 16:00",
      seshanba: { name: "Fitness", type: "strength", trainer: "R.Alisher", desc: "Umumiy kuch" },
      payshanba: { name: "Yoga", type: "yoga", trainer: "N.Dildora", desc: "Meditatsiya" },
      shanba: { name: "Arqon sakrash", type: "cardio", trainer: "R.Alisher", desc: "Tezlikni oshirish" }
    },
    {
      time: "19:00 - 20:00",
      seshanba: { name: "Dam olish", type: "rest", trainer: "-", desc: "Organizmi tiklash" },
      payshanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      shanba: { name: "Dam olish", type: "rest", trainer: "-", desc: "Hafta yakunlanishi" }
    }
  ],
  // Hafta 3 - DCJ
  week3_dcj: [
    {
      time: "07:00 - 08:00",
      dushanba: { name: "Velosiped", type: "cardio", trainer: "N.Dildora", desc: "Bardosh oshirish" },
      chorshanba: { name: "Yugurish", type: "cardio", trainer: "R.Alisher", desc: "Chidamlilik" },
      juma: { name: "Arqon sakrash", type: "cardio", trainer: "N.Dildora", desc: "Koordinatsiya" }
    },
    {
      time: "09:00 - 10:00",
      dushanba: { name: "Shtanga", type: "strength", trainer: "R.Alisher", desc: "Kuch oshirish" },
      chorshanba: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Intensiv mashq" },
      juma: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Cho'zilish" }
    },
    {
      time: "15:00 - 16:00",
      dushanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Tinchlantirish" },
      chorshanba: { name: "Gantel", type: "strength", trainer: "R.Alisher", desc: "Qo'l kuchi" },
      juma: { name: "Boks", type: "cardio", trainer: "R.Alisher", desc: "Tezlik va kuch" }
    },
    {
      time: "19:00 - 20:00",
      dushanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      chorshanba: { name: "Dam olish", type: "rest", trainer: "-", desc: "Organizmi tiklash" },
      juma: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Haftani kuchli tugatish" }
    }
  ],
  // Hafta 3 - SPS
  week3_sps: [
    {
      time: "07:00 - 08:00",
      seshanba: { name: "Yugurish", type: "cardio", trainer: "R.Alisher", desc: "Ertalabki cardio" },
      payshanba: { name: "Velosiped", type: "cardio", trainer: "N.Dildora", desc: "Tomir kuchaytirish" },
      shanba: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Jadal yog' yoqish" }
    },
    {
      time: "09:00 - 10:00",
      seshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Balans va tinchlantirish" },
      payshanba: { name: "Fitness", type: "strength", trainer: "R.Alisher", desc: "Umumiy kuch" },
      shanba: { name: "Kids Fitness", type: "cardio", trainer: "B.Malika", desc: "Bolalar uchun" }
    },
    {
      time: "15:00 - 16:00",
      seshanba: { name: "Shtanga", type: "strength", trainer: "R.Alisher", desc: "Kuch mashqlari" },
      payshanba: { name: "Arqon sakrash", type: "cardio", trainer: "N.Dildora", desc: "Koordinatsiya" },
      shanba: { name: "Yoga", type: "yoga", trainer: "N.Dildora", desc: "Cho'zilish" }
    },
    {
      time: "19:00 - 20:00",
      seshanba: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Intensiv trening" },
      payshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Tinchlantirish" },
      shanba: { name: "Dam olish", type: "rest", trainer: "-", desc: "Hafta yakunlanishi" }
    }
  ],
  // Hafta 4 - DCJ
  week4_dcj: [
    {
      time: "07:00 - 08:00",
      dushanba: { name: "Boks", type: "cardio", trainer: "R.Alisher", desc: "Oydagi yakuniy kard" },
      chorshanba: { name: "HIIT", type: "cardio", trainer: "N.Dildora", desc: "Jadal trening" },
      juma: { name: "Velosiped", type: "cardio", trainer: "R.Alisher", desc: "Tomir kuchaytirish" }
    },
    {
      time: "09:00 - 10:00",
      dushanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      chorshanba: { name: "Shtanga", type: "strength", trainer: "R.Alisher", desc: "Kuch oshirish" },
      juma: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Cho'zilish va balans" }
    },
    {
      time: "15:00 - 16:00",
      dushanba: { name: "Arqon sakrash", type: "cardio", trainer: "N.Dildora", desc: "Tezlik va koordinatsiya" },
      chorshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Tinchlantirish" },
      juma: { name: "Gantel", type: "strength", trainer: "R.Alisher", desc: "Qo'l kuchi" }
    },
    {
      time: "19:00 - 20:00",
      dushanba: { name: "Dam olish", type: "rest", trainer: "-", desc: "Organizmi tiklash" },
      chorshanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      juma: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Oyni jadal yakunlash " }
    }
  ],
  // Hafta 4 - SPS
  week4_sps: [
    {
      time: "07:00 - 08:00",
      seshanba: { name: "HIIT", type: "cardio", trainer: "R.Alisher", desc: "Jadal trening" },
      payshanba: { name: "Boks", type: "cardio", trainer: "R.Alisher", desc: "Kuch va tezlik" },
      shanba: { name: "Yugurish", type: "cardio", trainer: "N.Dildora", desc: "Chidamlilik" }
    },
    {
      time: "09:00 - 10:00",
      seshanba: { name: "Fitness PRO", type: "strength", trainer: "R.Alisher", desc: "Kuchli trening" },
      payshanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Cho'zilish" },
      shanba: { name: "Kids Fitness", type: "cardio", trainer: "B.Malika", desc: "Bolalar uchun" }
    },
    {
      time: "15:00 - 16:00",
      seshanba: { name: "Yoga", type: "yoga", trainer: "N.Dildora", desc: "Tinchlantirish" },
      payshanba: { name: "Gantel", type: "strength", trainer: "R.Alisher", desc: "Qo'l kuchi" },
      shanba: { name: "Arqon sakrash", type: "cardio", trainer: "R.Alisher", desc: "Koordinatsiya" }
    },
    {
      time: "19:00 - 20:00",
      seshanba: { name: "Shtanga", type: "strength", trainer: "R.Alisher", desc: "Kuch mashqlari" },
      payshanba: { name: "HIIT", type: "cardio", trainer: "N.Dildora", desc: "Intensiv yakunlash" },
      shanba: { name: "Yoga", type: "yoga", trainer: "A.Kamila", desc: "Oyni tinchlantirish bilan yakunlash " }
    }
  ]
};

// Hafta tartibini aniqlash funksiyasi
function getCurrentWeekData() {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const weekNum = Math.ceil(dayOfMonth / 7); // 1-4 hafta
  const dayOfWeek = now.getDay(); // 0=Yakshanba, 1=Dushanba, ...6=Shanba

  // DCJ (1,3,5) = Dushanba, Chorshanba, Juma
  // SPS (2,4,6) = Seshanba, Payshanba, Shanba
  const isDCJ = [1, 3, 5].includes(dayOfWeek);
  const safeWeek = Math.min(weekNum, 4);
  const suffix = isDCJ ? '_dcj' : '_sps';
  return MONTHLY_SCHEDULE[`week${safeWeek}${suffix}`] || MONTHLY_SCHEDULE.week1_dcj;
}

// Barcha 4 haftalik DCJ ma'lumotlari
function getWeekData(weekNum, type) {
  const suffix = type === 'dcj' ? '_dcj' : '_sps';
  const key = `week${weekNum}${suffix}`;
  return MONTHLY_SCHEDULE[key] || MONTHLY_SCHEDULE.week1_dcj;
}

// ============================================
// PUSH NOTIFICATION TIZIMI
// ============================================

// Notification ruxsati so'rash
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Bu brauzer bildirishnomalarni qo\'llab-quvvatlamaydi');
    return false;
  }
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Mashg'ulotga notification yuborish
function sendWorkoutNotification(workoutName, time, trainer) {
  if (Notification.permission !== 'granted') return;

  const notification = new Notification(' EliteForm - Mashg\'ulot boshlanmoqda!', {
    body: ` ${time} - ${workoutName}\n Murabbiy: ${trainer}`,
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23000"/><text y=".9em" font-size="90"><i class="fa-solid fa-dumbbell"></i></text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%2300F0FF"/></svg>',
    vibrate: [200, 100, 200],
    requireManropeaction: true,
    tag: 'workout-reminder'
  });

  notification.onclick = function () {
    window.focus();
    notification.close();
  };

  setTimeout(() => notification.close(), 10000);
}

// Kunlik mashg'ulotlari uchun eslatmalar o'rnatish
function setupDailyNotifications(userSchedule) {
  const now = new Date();

  userSchedule.forEach(workout => {
    if (!workout || !workout.time) return;

    const [startTime] = workout.time.split(' - ');
    const [hours, minutes] = startTime.split(':').map(Number);

    // Mashg'ulotdan 30 daqiqa oldin eslatma
    const reminderTime = new Date(now);
    reminderTime.setHours(hours, minutes - 30, 0, 0);

    // Mashg'ulot boshlanish vaqtida eslatma
    const startNotifTime = new Date(now);
    startNotifTime.setHours(hours, minutes, 0, 0);

    const msUntilReminder = reminderTime.getTime() - now.getTime();
    const msUntilStart = startNotifTime.getTime() - now.getTime();

    if (msUntilReminder > 0) {
      setTimeout(() => {
        sendWorkoutNotification(workout.name, workout.time, workout.trainer);
      }, msUntilReminder);
    }

    if (msUntilStart > 0) {
      setTimeout(() => {
        sendWorkoutNotification(`🚀 BOSHLANMOQDA: ${workout.name}`, workout.time, workout.trainer);
      }, msUntilStart);
    }
  });
}

// ============================================
// DOM - 1 OYLIK JADVAL RENDER
// ============================================

function renderMonthlySchedule() {
  const container = document.getElementById('monthly-schedule-container');
  if (!container) return;

  const now = new Date();
  const currentMonth = now.toLocaleString('uz-UZ', { month: 'long' });
  const currentYear = now.getFullYear();

  let html = `
    <div class="monthly-header">
      <h3><i class="fa-solid fa-calendar-days"></i> ${currentMonth} ${currentYear} — To'liq 1 oylik jadval</h3>
      <p>4 haftalik to'liq mashg'ulot dasturi</p>
    </div>
  `;

  for (let week = 1; week <= 4; week++) {
    html += `
      <div class="week-block">
        <div class="week-title">
          <span class="week-num">${week}-hafta</span>
          <span class="week-range">${getWeekRange(week, now)}</span>
        </div>
        <div class="week-tabs">
          <button class="week-tab active" onclick="switchWeekTab(${week}, 'dcj', this)" id="tab-${week}-dcj">
            Du · Chor · Juma
          </button>
          <button class="week-tab" onclick="switchWeekTab(${week}, 'sps', this)" id="tab-${week}-sps">
            Ses · Pay · Shan
          </button>
        </div>
        <div id="week-content-${week}-dcj" class="week-schedule-table">
          ${renderWeekTable(week, 'dcj')}
        </div>
        <div id="week-content-${week}-sps" class="week-schedule-table" style="display:none">
          ${renderWeekTable(week, 'sps')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

function getWeekRange(weekNum, now) {
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() + (weekNum - 1) * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = (d) => `${d.getDate()}-${d.toLocaleString('uz-UZ', { month: 'short' })}`;
  return `${fmt(start)} — ${fmt(end)}`;
}

function renderWeekTable(weekNum, type) {
  const data = getWeekData(weekNum, type);
  const isDCJ = type === 'dcj';
  const days = isDCJ
    ? ['dushanba', 'chorshanba', 'juma']
    : ['seshanba', 'payshanba', 'shanba'];
  const dayLabels = isDCJ
    ? ['Dushanba', 'Chorshanba', 'Juma']
    : ['Seshanba', 'Payshanba', 'Shanba'];

  const typeColors = {
    cardio: { color: '#FF6B6B', bg: 'rgba(255,107,107,0.1)', icon: '<i class="fa-solid fa-person-running"></i>' },
    strength: { color: '#FF6A3D', bg: 'rgba(255,106,61,0.1)', icon: '<i class="fa-solid fa-bolt"></i>' },
    yoga: { color: '#B06BFF', bg: 'rgba(176,107,255,0.1)', icon: '<i class="fa-solid fa-spa"></i>' },
    rest: { color: '#8E92A3', bg: 'rgba(142,146,163,0.08)', icon: '<i class="fa-solid fa-moon"></i>' }
  };

  let html = `<div class="sched-table-wrap">
    <div class="sched-row sched-head">
      <div class="sched-cell time-col">SOAT</div>
      <div class="sched-cell">${dayLabels[0]}</div>
      <div class="sched-cell">${dayLabels[1]}</div>
      <div class="sched-cell">${dayLabels[2]}</div>
    </div>`;

  data.forEach(row => {
    html += `<div class="sched-row">
      <div class="sched-cell time-col"><span class="time-badge">${row.time}</span></div>`;

    days.forEach(day => {
      const slot = row[day];
      if (!slot || slot.type === 'rest') {
        html += `<div class="sched-cell"><div class="sched-slot rest-slot">
          <span class="slot-icon"><i class="fa-solid fa-moon"></i></span>
          <span class="slot-name">Dam olish</span>
          <span class="slot-desc">Organizmi tiklash</span>
        </div></div>`;
      } else {
        const c = typeColors[slot.type] || typeColors.cardio;
        html += `<div class="sched-cell">
          <div class="sched-slot ${slot.type}-slot" style="border-color:${c.color}20; background:${c.bg}" 
               onclick="bookLesson('${slot.name}', '${row.time}', '${slot.trainer}')">
            <span class="slot-icon">${c.icon}</span>
            <span class="slot-name" style="color:${c.color}">${slot.name}</span>
            <span class="slot-trainer"><i class="fa-solid fa-user-tie"></i> ${slot.trainer}</span>
            <span class="slot-desc">${slot.desc}</span>
            <button class="slot-book-btn" style="border-color:${c.color}; color:${c.color}">Band olish</button>
          </div>
        </div>`;
      }
    });

    html += `</div>`;
  });

  html += `</div>`;
  return html;
}

function switchWeekTab(weekNum, type, btn) {
  // Toggle tabs
  const parent = btn.closest('.week-block');
  parent.querySelectorAll('.week-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Toggle content
  parent.querySelector(`#week-content-${weekNum}-dcj`).style.display = type === 'dcj' ? 'block' : 'none';
  parent.querySelector(`#week-content-${weekNum}-sps`).style.display = type === 'sps' ? 'block' : 'none';
}

// Dars band qilish
function bookLesson(name, time, trainer) {
  const user = JSON.parse(localStorage.getItem('gymUser') || 'null');
  if (!user) {
    // Login modalni ochish
    document.getElementById('reg-modal')?.classList.add('show');
    document.body.style.overflow = 'hidden';
    return;
  }

  if (!window.gymSub || !window.gymSub.active) {
    showToast('Dars band qilish uchun obuna kerak', 'warning');
    document.getElementById('subscription')?.scrollIntoView({behavior:'smooth'});
    return;
  }
  // Band qilingan darslar ro'yxatiga qo'shish
  let bookedLessons = loadBookings();

  // Takrorlanishni tekshirish
  const already = bookedLessons.find(l => l.name === name && l.time === time);
  if (already) {
    showToast(` "${name}" allaqachon band qilingan!`, 'info');
    return;
  }

  const newLesson = {
    id: Date.now(),
    name,
    time,
    trainer,
    userEmail: user.email,
    bookedAt: new Date().toLocaleString('uz-UZ'),
    status: 'confirmed',       // bandlov holati: confirmed / cancelled
    attendance: 'pending'      // qatnashish holati: pending / attended / missed
  };

  bookedLessons.push(newLesson);
  saveBookings(bookedLessons);

  // Bandlovni Firebase'ga ham yozish (admin panelda ko'rinishi uchun)
  if (window.fbSaveBooking) {
    window.fbSaveBooking(newLesson);
  }

  showToast(` "${name}" — ${time} dars band qilindi!`, 'success');

  // Profilni yangilash
  renderProfileWorkouts();

  // Notification o'rnatish
  requestNotificationPermission().then(granted => {
    if (granted) {
      setupDailyNotifications([{ name, time, trainer, id: newLesson.id }]);
      showToast(' Mashg\'ulot eslatmasi yoqildi!', 'info');
    }
  });

  // Davomatni tekshirib turish (mashg'ulot vaqti kelganda so'raladi)
  scheduleAttendanceCheck(newLesson);
}

// ============================================
// DAVOMATNI TEKSHIRISH — mashg'ulot vaqti kelganda
// foydalanuvchidan "bordingizmi?" so'raladi va Firebase/localStorage'ga yoziladi
// ============================================
function scheduleAttendanceCheck(lesson) {
  const [startTime] = lesson.time.split(' - ');
  const [hours, minutes] = startTime.split(':').map(Number);
  const now = new Date();
  const start = new Date(now);
  start.setHours(hours, minutes, 0, 0);

  // Mashg'ulot boshlanganidan 10 daqiqa o'tib so'raymiz (davom etayotgan bo'ladi)
  const askTime = new Date(start.getTime() + 10 * 60 * 1000);
  const msUntilAsk = askTime.getTime() - now.getTime();
  if (msUntilAsk > 0 && msUntilAsk < 24 * 60 * 60 * 1000) {
    setTimeout(() => showAttendanceConfirm(lesson), msUntilAsk);
  }
}

function showAttendanceConfirm(lesson) {
  // Agar avvalroq javob berilgan bo'lsa qayta so'ramaymiz
  let bookedLessons = loadBookings();
  const current = bookedLessons.find(l => l.id === lesson.id);
  if (!current || current.attendance !== 'pending') return;

  let box = document.getElementById('attendance-confirm-box');
  if (box) box.remove();

  box = document.createElement('div');
  box.id = 'attendance-confirm-box';
  box.className = 'attendance-confirm-box';
  box.innerHTML = `
    <div class="acb-icon"><i class="fa-solid fa-dumbbell"></i></div>
    <div class="acb-text">
      <strong>${lesson.name}</strong> (${lesson.time}) darsiga bordingizmi?
    </div>
    <div class="acb-actions">
      <button class="acb-btn acb-yes"><i class="fa-solid fa-circle-check"></i> Bordim</button>
      <button class="acb-btn acb-no"><i class="fa-solid fa-circle-xmark"></i> Bormadim</button>
    </div>
  `;
  document.body.appendChild(box);
  requestAnimationFrame(() => box.classList.add('show'));

  box.querySelector('.acb-yes').onclick = () => setAttendance(lesson.id, 'attended');
  box.querySelector('.acb-no').onclick = () => setAttendance(lesson.id, 'missed');
}

function setAttendance(id, value) {
  let bookedLessons = loadBookings();
  bookedLessons = bookedLessons.map(l => l.id === id ? { ...l, attendance: value } : l);
  saveBookings(bookedLessons);

  if (window.fbUpdateBooking) {
    window.fbUpdateBooking(id, { attendance: value });
  }

  const box = document.getElementById('attendance-confirm-box');
  if (box) { box.classList.remove('show'); setTimeout(() => box.remove(), 300); }

  showToast(value === 'attended' ? ' Ajoyib, davom etaverng!' : ' Keyingi safar unutmang!', value === 'attended' ? 'success' : 'warning');
  renderProfileWorkouts();
}
window.setAttendance = setAttendance;

// Sahifa ochilganda, avval band qilingan lekin hali boshlanmagan darslar uchun
// davomat tekshiruvini qayta o'rnatish (masalan foydalanuvchi sahifani yopib qaytgan bo'lsa)
function rescheduleAllAttendanceChecks() {
  const bookedLessons = loadBookings();
  bookedLessons.filter(l => l.attendance === 'pending').forEach(l => scheduleAttendanceCheck(l));
}

// Band qilingan darsni bekor qilish
function cancelLesson(id) {
  let bookedLessons = loadBookings();
  bookedLessons = bookedLessons.filter(l => l.id !== id);
  saveBookings(bookedLessons);

  if (window.fbUpdateBooking) {
    window.fbUpdateBooking(id, { status: 'cancelled' });
  }

  renderProfileWorkouts();
  showToast(' Dars bekor qilindi', 'warning');
}

// ============================================
// PROFIL — MASHG'ULOTLAR KO'RSATISH
// ============================================

function renderProfileWorkouts() {
  const container = document.getElementById('profile-workouts-list');
  if (!container) return;

  const bookedLessons = loadBookings();

  if (bookedLessons.length === 0) {
    container.innerHTML = `
      <div class="no-workouts">
        <div class="no-workout-icon"><i class="fa-solid fa-clipboard-list"></i></div>
        <p>Hali birorta dars band qilinmagan</p>
        <small>Jadvaldan dars tanlang va band qiling</small>
      </div>
    `;
    return;
  }

  const typeColors = {
    cardio: '#FF6B6B',
    strength: '#FF6A3D',
    yoga: '#B06BFF',
    rest: '#8E92A3'
  };

  const typeIcons = { cardio: '<i class="fa-solid fa-person-running"></i>', strength: '<i class="fa-solid fa-bolt"></i>', yoga: '<i class="fa-solid fa-spa"></i>', rest: '<i class="fa-solid fa-moon"></i>' };

  const attendanceBadge = {
    pending: '<span class="pwc-status pending"><i class="fa-solid fa-hourglass-half"></i> Kutilmoqda</span>',
    attended: '<span class="pwc-status attended"><i class="fa-solid fa-circle-check"></i> Bordi</span>',
    missed: '<span class="pwc-status missed"><i class="fa-solid fa-circle-xmark"></i> Bormadi</span>'
  };

  container.innerHTML = bookedLessons.map(lesson => {
    const badge = attendanceBadge[lesson.attendance] || attendanceBadge.pending;
    return `
      <div class="profile-workout-card" id="lesson-${lesson.id}">
        <div class="pwc-left">
          <div class="pwc-icon"><i class="fa-solid fa-bolt"></i></div>
          <div class="pwc-info">
            <div class="pwc-name">${lesson.name}</div>
            <div class="pwc-time"><i class="fa-solid fa-clock"></i> ${lesson.time}</div>
            <div class="pwc-trainer"><i class="fa-solid fa-user-tie"></i> ${lesson.trainer}</div>
          </div>
        </div>
        <div class="pwc-right">
          ${badge}
          <button class="pwc-cancel" onclick="cancelLesson(${lesson.id})">Bekor qilish</button>
        </div>
      </div>
    `;
  }).join('');

  // Stat yangilash
  const countEl = document.getElementById('booked-count');
  if (countEl) countEl.textContent = bookedLessons.length;
}

// ============================================
// TOAST XABAR
// ============================================

function showToast(message, type = 'success') {
  let toast = document.getElementById('gym-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gym-toast';
    document.body.appendChild(toast);
  }

  const colors = {
    success: '#FF6A3D',
    error: '#FF3366',
    warning: '#FFB347',
    info: '#B06BFF'
  };

  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: rgba(11, 11, 15, 0.95);
    border: 1px solid ${colors[type] || colors.success};
    color: white;
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 0.95rem;
    z-index: 9999;
    backdrop-filter: blur(12px);
    box-shadow: 0 0 20px ${colors[type]}44;
    transform: translateY(100px);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    max-width: 320px;
  `;

  toast.textContent = message;

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
  });

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
  }, 3500);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderMonthlySchedule();
  renderProfileWorkouts();
  rescheduleAllAttendanceChecks();

  // Notification ruxsatini so'rash (foydalanuvchi login bo'lganda)
  const savedUser = localStorage.getItem('gymUser');
  if (savedUser) {
    requestNotificationPermission();
  }
});

// Global export
window.bookLesson = bookLesson;
window.cancelLesson = cancelLesson;
window.switchWeekTab = switchWeekTab;
window.requestNotificationPermission = requestNotificationPermission;
window.renderProfileWorkouts = renderProfileWorkouts;
window.setAttendance = setAttendance;
window.showToast = showToast;
