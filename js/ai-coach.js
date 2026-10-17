// ⚠️ DIQQAT — XAVFSIZLIK: Bu fayl (ai-coach.js) brauzerda ishlaydi, ya'ni bu
// yerga yozilgan HAR QANDAY API kalit "View Source" orqali har bir tashrif
// buyuruvchiga ko'rinadi. Shu sababli:
//   1) Bu yerga hech qachon haqiqiy kalit yozmang.
//   2) Avvalgi versiyada bu yerda ochiq (leaked) Gemini va ElevenLabs
//      kalitlari bor edi — ular allaqachon boshqa joyda ko'ringani uchun
//      ENDI ISHLATILMAYDI. Agar shu kalitlardan foydalanilgan bo'lsa,
//      ularni aistudio.google.com va elevenlabs.io saytlarida bekor qilib,
//      yangisini yarating.
//   3) Bu ai-coach.html sahifasi index.html'dan hozircha bog'lanmagan —
//      asosiy saytdagi shaxsiy jadval funksiyasi endi js/app.js ichida,
//      hech qanday tashqi kalitga bog'liq bo'lmagan holda ishlaydi.
//   4) Agar shu sahifani ishlatishni xohlasangiz, AI so'rovini albatta
//      kichik backend/serverless funksiya orqali yuborish kerak — shunda
//      kalit brauzerga chiqmaydi.

const API_KEY = ''; // Bu yerga hech qachon haqiqiy kalit qo'ymang (yuqoridagi izohni o'qing)
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// ElevenLabs TTS Konfiguratsiyasi
const ELEVENLABS_API_KEY = ''; // Bu yerga hech qachon haqiqiy kalit qo'ymang (yuqoridagi izohni o'qing)
const VOICE_ID = 'nzFihrBIvB34imQBuxub'; // Josh - Teacher for Kids

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let currentAudio = null;

// Matn kiritish maydonini avtomatik moslash
userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Yuborish tugmasi
sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

async function handleSendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Foydalanuvchi xabarini ekranga qo'shish
    appendMessage(text, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';

    // AI yuklanyapti degan indikatorni ko'rsatish
    const loadingId = showLoading();

    // AI ga so'rov yuborish
    if (!API_KEY) {
        setTimeout(() => {
            removeLoading(loadingId);
            appendMessage("Kechirasiz, tizimga ulanish uchun dasturchidan API kalit (API_KEY) o'rnatishini so'rashingiz kerak. API kalit aistudio.google.com saytidan olinadi.", 'ai');
        }, 1500);
        return;
    }

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Sen tajribali fitnes murabbiysan. Foydalanuvchiga vazn yo'qotish (ozish) yoki vazn olish (semirish) bo'yicha yordam berasan. Foydalanuvchi so'rovi: "${text}". Iltimos, o'zbek tilida, do'stona va foydali tarzda javob ber. Markdown formatidan foydalanib tartibli javob yozgin (ro'yxatlar qilib).`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                }
            })
        });

        const data = await response.json();
        removeLoading(loadingId);

        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            appendMessage(formatAIResponse(aiText), 'ai', true);
            // Ovozli xabarni ijro etish
            speakText(aiText);
        } else {
            appendMessage("Kechirasiz, menda xatolik yuz berdi. Iltimos qayta urinib ko'ring.", 'ai');
        }
    } catch (error) {
        removeLoading(loadingId);
        appendMessage("Tarmoq yoki server xatosi yuz berdi. API kalit to'g'ri kiritilganiga ishonch hosil qiling.", 'ai');
        console.error(error);
    }
}

async function speakText(text) {
    if (!ELEVENLABS_API_KEY) return;

    // Oldingi audioni to'xtatish
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    // Markdown belgilarini tozalash (ovoz uchun faqat matn kerak)
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').trim();

    try {
        console.log("ElevenLabs so'rov yuborilmoqda... Ovoz ID:", VOICE_ID);
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
            const errorData = await response.json();
            console.error("ElevenLabs API xatosi tafsiloti:", errorData);
            throw new Error(`ElevenLabs API xatosi: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        currentAudio = new Audio(audioUrl);
        currentAudio.play();
    } catch (error) {
        console.error("Ovoz chiqarishda xatolik:", error);
    }
}

function appendMessage(text, sender, isHTML = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `${sender}-message`);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('msg-content');

    if (isHTML) {
        contentDiv.innerHTML = text;
    } else {
        contentDiv.textContent = text;
    }

    // AI xabarlariga "Listen" tugmasini qo'shish
    if (sender === 'ai') {
        const listenBtn = document.createElement('button');
        listenBtn.className = 'listen-btn';
        listenBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            Listen
        `;
        listenBtn.onclick = () => {
            // HTML teglarini tozalab matnni yuborish
            const plainText = contentDiv.innerText.replace('Listen', '').trim();
            speakText(plainText);
        };
        contentDiv.appendChild(listenBtn);
    }

    msgDiv.appendChild(contentDiv);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showLoading() {
    const id = 'loading-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai-message';
    msgDiv.id = id;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'msg-content loading-indicator';
    contentDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

    msgDiv.appendChild(contentDiv);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return id;
}

function removeLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// Oddiy markdown formatterni qo'shish (bold va ro'yxatlar uchun)
function formatAIResponse(text) {
    // Bold matnlarni alishtirish (**text** -> <strong>text</strong>)
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Qatorlarni formatlash
    const lines = html.split('\n');
    let formattedHtml = '';
    let inList = false;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('* ') || line.startsWith('- ')) {
            if (!inList) {
                formattedHtml += '<ul>';
                inList = true;
            }
            formattedHtml += `<li>${line.substring(2)}</li>`;
        } else if (line.match(/^\d+\.\s/)) {
            if (!inList) {
                formattedHtml += '<ol>';
                inList = true;
            }
            formattedHtml += `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
        } else {
            if (inList) {
                formattedHtml += inList === 'ol' ? '</ol>' : '</ul>';
                inList = false;
            }
            if (line) {
                formattedHtml += `<p>${line}</p><br>`;
            }
        }
    });

    if (inList) {
        formattedHtml += '</ul>';
    }

    return formattedHtml;
}