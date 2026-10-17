import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig, ADMIN_EMAIL } from "./firebase-config.js";
import { PLANS } from "./plans.js";

let db, auth;
try { const app = initializeApp(firebaseConfig); db = getFirestore(app); auth = getAuth(app); }
catch (e) { console.log("Firebase sozlanmagan:", e); }

document.addEventListener("DOMContentLoaded", () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- Intersection Observer for Fade-In Animations ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Modals Logic ---
    const regModal = document.getElementById('reg-modal');
    const aiModal = document.getElementById('ai-modal');
    const dashboardPanel = document.getElementById('dashboard-panel');

    // Open Buttons
    const btnHeroCta = document.getElementById('btn-hero-cta');
    const btnPrimaryCta = document.getElementById('btn-primary-cta');
    const btnAiGuide = document.getElementById('btn-ai-guide');
    const btnLogin = document.getElementById('btn-login');
    const payBtns = document.querySelectorAll('.btn-pay');
    const bookableSlots = document.querySelectorAll('.bookable');

    // Close Buttons
    const closeBtns = document.querySelectorAll('.close-modal');
    const closeDashboardBtn = document.getElementById('close-dashboard');

    // Modal State Functions
    const openModal = (modal) => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = (modal) => {
        modal.classList.remove('show');
        if (!dashboardPanel.classList.contains('show')) {
            document.body.style.overflow = '';
        }
    };
    const openDashboard = () => {
        dashboardPanel.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    const closeDashboard = () => {
        dashboardPanel.classList.remove('show');
        document.body.style.overflow = '';
    };

    // Event Listeners for Opening Login
    [btnHeroCta, btnPrimaryCta, ...bookableSlots].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(regModal);
            });
        }
    });

    // Event Listener for Telegram Redirects (Pricing buttons and dashboard Telegram button)
    const allTgBtns = [...payBtns];
    const dashboardTgBtn = document.getElementById('btn-tg-receipt');
    if (dashboardTgBtn) allTgBtns.push(dashboardTgBtn);

    allTgBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('https://t.me/torvensnow7', '_blank');
            });
        }
    });

    if (btnAiGuide) {
        btnAiGuide.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aiModal);
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            openCabinet();
        });
    }

    // Event Listeners for Closing
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(regModal);
            closeModal(aiModal);
        });
    });

    if (closeDashboardBtn) {
        closeDashboardBtn.addEventListener('click', () => {
            closeDashboard();
        });
    }

    // Close on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === regModal) closeModal(regModal);
        if (e.target === aiModal) closeModal(aiModal);
        if (e.target === dashboardPanel) {
            closeDashboard();
        }
    });

    // --- Akkaunt: Firebase Authentication (Google) ---
    const $ = (id) => document.getElementById(id);
    const toast = (m, t) => window.showToast && window.showToast(m, t);
    const openCabinet = () => (auth && auth.currentUser ? openDashboard() : openModal(regModal));
    window.gymSub = { active: false };

    async function loadProfile(u) {
        window.gymSub = { active: false };
        if (!db) return;
        try {
            const ref = doc(db, "gym_users", u.email);
            const snap = await getDoc(ref);
            const d = snap.exists() ? snap.data() : {};
            if (d.subUntil && d.subUntil > Date.now()) window.gymSub = { active: true, plan: d.subPlan, until: d.subUntil };
            await setDoc(ref, {
                name: u.displayName || "", email: u.email, picture: u.photoURL || "",
                lastLogin: Date.now(), ...(snap.exists() ? {} : { registeredAt: new Date().toLocaleString("uz-UZ") })
            }, { merge: true });
        } catch (e) { console.error(e); }
    }

    function paint(u) {
        $("user-name-display").innerText = u ? (u.displayName || u.email) : "Foydalanuvchi";
        $("user-email-display").innerText = u ? u.email : "Kirilmagan";
        $("user-avatar-display").innerHTML = u && u.photoURL ? `<img src="${u.photoURL}" alt="" referrerpolicy="no-referrer">` : '<i class="fa-solid fa-user"></i>';
        $("personal-plan-box").style.display = u ? "block" : "none";
        if (u) $("plan-user-name").innerText = u.displayName || "Sizning";
        const s = window.gymSub, box = $("sub-status");
        box.className = "sub-box" + (s.active ? " on" : "");
        box.innerHTML = s.active
            ? `Obuna faol: <b>${(PLANS[s.plan] || {}).name || s.plan}</b>, ${new Date(s.until).toLocaleDateString("uz-UZ")} gacha`
            : `Obuna yo'q. <a href="#subscription">Obunani tanlang</a> va jadval, dastur, ovqat rejalariga kiring.`;
        box.querySelector("a")?.addEventListener("click", () => closeDashboard());
        const adm = $("admin-panel-btn");
        if (adm) adm.hidden = !(u && u.email === ADMIN_EMAIL);
        document.querySelectorAll(".btn-sub").forEach((b) => {
            b.textContent = s.active && s.plan === b.dataset.plan ? "Faol" : "Obunani olish";
        });
        window.renderProfileWorkouts && window.renderProfileWorkouts();
        document.dispatchEvent(new Event("subchange"));
    }

    if (auth) {
        onAuthStateChanged(auth, async (u) => {
            if (u) {
                localStorage.setItem("gymUser", JSON.stringify({ name: u.displayName, email: u.email, picture: u.photoURL }));
                await loadProfile(u);
            } else {
                localStorage.removeItem("gymUser");
                window.gymSub = { active: false };
            }
            paint(u);
        });
    } else { paint(null); }

    $("custom-google-btn")?.addEventListener("click", async () => {
        if (!auth) return toast("Firebase sozlanmagan: js/firebase-config.js ni to'ldiring", "error");
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            closeModal(regModal); openDashboard();
        } catch (e) {
            if (e.code !== "auth/popup-closed-by-user") toast("Kirib bo'lmadi: " + (e.code || e.message), "error");
        }
    });

    document.querySelector(".btn-logout")?.addEventListener("click", async () => {
        if (auth) await signOut(auth);
        closeDashboard();
        toast("Akkauntdan chiqdingiz", "info");
    });

    // Bandlovlarni Firestore'ga yozish (admin panel uchun)
    window.fbSaveBooking = (l) => db && setDoc(doc(db, "gym_bookings", String(l.id)), l).catch(console.error);
    window.fbUpdateBooking = (id, p) => db && setDoc(doc(db, "gym_bookings", String(id)), p, { merge: true }).catch(console.error);

    // --- Click.uz sozlamalari ---
    // ⚠️ Bu qiymatlarni click.uz biznes akkauntingizdan oling:
    // business.click.uz → Xizmatlar → Service ID va Merchant ID
    const CLICK_SERVICE_ID = "SIZNING_SERVICE_ID";   // masalan: "12345"
    const CLICK_MERCHANT_ID = "SIZNING_MERCHANT_ID"; // masalan: "67890"
    const CLICK_RETURN_URL = window.location.origin + window.location.pathname; // to'lovdan keyin qaytadigan sahifa

    // Click.uz to'lov sahifasiga yo'naltiruvchi funksiya
    function payWithClick(orderId, amountUzs) {
        const url = `https://my.click.uz/services/pay?` +
            `service_id=${CLICK_SERVICE_ID}` +
            `&merchant_id=${CLICK_MERCHANT_ID}` +
            `&amount=${amountUzs}` +
            `&transaction_param=${orderId}` +
            `&return_url=${encodeURIComponent(CLICK_RETURN_URL)}`;
        window.location.href = url;
    }

    // --- Obuna (Подписка) ---
    document.querySelectorAll(".btn-sub").forEach((b) => b.addEventListener("click", async () => {
        const u = auth && auth.currentUser;
        if (!u) return openModal(regModal);
        const p = PLANS[b.dataset.plan];

        // Firestore'ga so'rov yozish
        let orderId = Date.now() + "_" + b.dataset.plan;
        try {
            const docRef = await addDoc(collection(db, "gym_sub_requests"), {
                email: u.email,
                name: u.displayName || "",
                plan: b.dataset.plan,
                price: p.price,
                status: "pending",
                createdAt: Date.now()
            });
            orderId = docRef.id; // Firestore doc ID ni order ID sifatida ishlatamiz
        } catch (e) { console.error(e); }

        // Click.uz sozlamalari to'ldirilganmi tekshirish
        if (CLICK_SERVICE_ID === "SIZNING_SERVICE_ID" || CLICK_MERCHANT_ID === "SIZNING_MERCHANT_ID") {
            // Sozlamalar to'ldirilmagan — Telegram fallback
            toast("⚠️ Click.uz hali sozlanmagan. Telegram orqali bog'laning.", "info");
            const msg = `Salom! EliteForm "${p.name}" obunasini (${p.price.toLocaleString("uz-UZ")} so'm) olmoqchiman. Akkaunt: ${u.email}`;
            window.open("https://t.me/torvensnow7?text=" + encodeURIComponent(msg), "_blank");
            return;
        }

        // Click.uz to'loviga yo'naltirish
        toast("Click.uz sahifasiga yo'naltirilmoqda...", "info");
        setTimeout(() => payWithClick(orderId, p.price), 800);
    }));

    // --- AI Chat Logic (Groq API Integration) ---
    const aiForm = document.getElementById('ai-form');
    const aiInput = document.getElementById('ai-input');
    const aiChatBody = document.getElementById('ai-chat-body');

    const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE'; // .env faylidan oling
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    // ElevenLabs TTS Konfiguratsiyasi
    const ELEVENLABS_API_KEY = 'YOUR_ELEVENLABS_API_KEY_HERE'; // .env faylidan oling
    const VOICE_ID = 'nzFihrBIvB34imQBuxub';
    let currentAudio = null;

    // Chat tarixini saqlash
    const chatHistory = [
        {
            role: "system",
            content: `Sen EliteForm fitness markazining professional AI murabbiyisan. Sening asosiy vazifang:

1. **Ideal vazn hisoblash**: Foydalanuvchi bo'yini kiritganda, ideal vaznini shu formula bilan aniqla:
   - Ideal vazn = Bo'y (sm) - 100
   - Masalan: Bo'y 170 sm → Ideal vazn = 70 kg
   - Masalan: Bo'y 165 sm → Ideal vazn = 65 kg
   - Masalan: Bo'y 180 sm → Ideal vazn = 80 kg

2. **Holat aniqlash**: Haqiqiy vaznni ideal vazn bilan taqqoslaysan:
   - Haqiqiy vazn > Ideal vazn → OZISH kerak (necha kg ekanini aniq yoz)
   - Haqiqiy vazn < Ideal vazn → SEMIRISH kerak (necha kg ekanini aniq yoz)
   - Haqiqiy vazn = Ideal vazn (±2 kg) → NORMAL holat

3. **Mashg'ulot jadvali yaratish**: Natijaga qarab mashg'ulotlar jadvalini HTML TABLE ko'rinishida yaratasan.
   Jadval EliteForm ning darslar jadvali uslubida bo'lsin.
   
   Jadvalni shu formatda yoz (bu juda muhim!):
   <div class="ai-schedule-result">
     <div class="ai-status [status-class]">
       <span class="status-icon">[emoji]</span>
       <div>
         <div class="status-title">[Holat sarlavhasi]</div>
         <div class="status-desc">[necha kg ozish/semirish kerak yoki normal holat]</div>
       </div>
     </div>
     <table class="ai-workout-table">
       <thead>
         <tr><th>SOAT</th><th>DUSHANBA</th><th>CHORSHANBA</th><th>JUMA</th></tr>
       </thead>
       <tbody>
         <tr>
           <td class="time-cell">07:00 - 08:00</td>
           <td class="workout-cell [tur]"><strong>Mashq nomi</strong><span class="trainer-name">Tushuntirish</span></td>
           <td class="workout-cell [tur]"><strong>Mashq nomi</strong><span class="trainer-name">Tushuntirish</span></td>
           <td class="workout-cell [tur]"><strong>Mashq nomi</strong><span class="trainer-name">Tushuntirish</span></td>
         </tr>
         <!-- yana qatorlar... -->
       </tbody>
     </table>
     <div class="ai-nutrition-tip">
       <strong>🥗 Ovqatlanish tavsiyasi:</strong><br>
       [ovqatlanish tavsiyasi]
     </div>
   </div>

   [status-class] qiymatlari: "status-lose" (ozish kerak - qizil), "status-gain" (semirish kerak - ko'k), "status-normal" (normal - yashil)
   [tur] qiymatlari: "cardio" (kardio mashqlar), "strength" (kuch mashqlari), "yoga" (yoga/cho'zilish), "rest" (dam olish)

   Jadvalda kamida 4 ta vaqt oralig'i bo'lsin (07:00-08:00, 09:00-10:00, 15:00-16:00, 19:00-20:00).
   
   OZISH kerak bo'lsa: Ko'proq kardio (yugurish, velosiped, HIIT, boks, arqon sakrash), kam kuch mashqlari
   SEMIRISH kerak bo'lsa: Ko'proq kuch mashqlari (shtanga, gantel, skuat, bench press), kam kardio
   NORMAL holat: Balanslangan (yoga, cho'zilish, engil kardio, umumiy kuch)

4. **EliteForm darslariga yo'naltirish**: Jadvaldan keyin EliteForm ning mavjud darslarini ham tavsiya qil:
   - Yoga: Dushanba/Juma 09:00 (A.Kamila), Chorshanba 19:00 (N.Dildora)
   - Fitness: Chorshanba 09:00 (R.Alisher)
   - Fitness PRO: Dushanba 19:00 (R.Alisher)

Javobni har doim O'ZBEK TILIDA ber.
Faqat HTML teglaridan foydalanging. Markdown ISHLATMA.
Har doim do'stona va motivatsion bo'l. Emoji ishlatish mumkin 💪🏋️‍♂️`
        }
    ];

    if (aiForm) {
        aiForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userText = aiInput.value.trim();
            if (!userText) return;

            // Append User Message
            const userDiv = document.createElement('div');
            userDiv.className = 'chat-bubble user';
            userDiv.innerText = userText;
            aiChatBody.appendChild(userDiv);
            aiInput.value = '';

            // Scroll to bottom
            aiChatBody.scrollTop = aiChatBody.scrollHeight;

            // Show typing indicator
            const botDiv = document.createElement('div');
            botDiv.className = 'chat-bubble bot';
            botDiv.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
            aiChatBody.appendChild(botDiv);
            aiChatBody.scrollTop = aiChatBody.scrollHeight;

            // Chat tarixiga foydalanuvchi xabarini qo'shish
            chatHistory.push({ role: "user", content: userText });

            try {
                const response = await fetch(GROQ_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${GROQ_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: chatHistory,
                        temperature: 0.7,
                        max_tokens: 3000
                    })
                });

                const data = await response.json();
                const aiResponse = data.choices?.[0]?.message?.content || "Kechirasiz, muammo yuzaga keldi yoki javob yo'q.";

                // Chat tarixiga AI javobini qo'shish
                chatHistory.push({ role: "assistant", content: aiResponse });

                // HTML formatted javob - jadval bo'lsa to'g'ridan-to'g'ri render qilish
                let formattedResponse = aiResponse;
                if (formattedResponse.includes('<table') || formattedResponse.includes('<div class="ai-schedule')) {
                    // HTML strukturasi bor - to'g'ridan-to'g'ri render qilish
                    // Faqat jadvaldan tashqaridagi \n larni <br> ga almashtirish
                    formattedResponse = formattedResponse
                        .replace(/```html/g, '')
                        .replace(/```/g, '')
                        .trim();
                } else {
                    // Oddiy matn - \n larni <br> ga almashtirish
                    formattedResponse = formattedResponse.replace(/\n/g, '<br>');
                }

                botDiv.innerHTML = formattedResponse;
                // Bot bubble kengligini kattalashtirish (jadval bo'lsa)
                if (aiResponse.includes('<table') || aiResponse.includes('ai-schedule')) {
                    botDiv.style.maxWidth = '100%';
                }

                // Ovoz chiqarish
                if (aiResponse) {
                    speakText(aiResponse);
                }
            } catch (error) {
                botDiv.innerText = "Tarmoq xatosi yuzaga keldi. Iltimos qaytadan urinib ko'ring.";
                console.error("Groq API xatosi:", error);
            }

            aiChatBody.scrollTop = aiChatBody.scrollHeight;

            // Add listener to inside links to close modal and scroll
            const insideLinks = botDiv.querySelectorAll('a');
            insideLinks.forEach(l => {
                l.addEventListener('click', () => {
                    closeModal(document.getElementById('ai-modal'));
                });
            });
        });
    }

    async function speakText(text) {
        if (ELEVENLABS_API_KEY === 'SIZNING_ELEVENLABS_API_KALITINGIZ') return;

        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

        const cleanText = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').trim();

        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVENLABS_API_KEY
                },
                body: JSON.stringify({
                    text: cleanText,
                    model_id: 'eleven_multilingual_v2',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.9,
                        style: 0.0,
                        use_speaker_boost: true
                    }
                })
            });

            if (!response.ok) {
                return;
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            currentAudio = new Audio(audioUrl);
            currentAudio.play();
        } catch (error) {
            console.error("Ovozda xatolik:", error);
        }
    }

});