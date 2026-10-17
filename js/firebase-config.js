// ============================================
// FIREBASE CONFIG — FAQAT SHU YERDA TAHRIRLANG
// ============================================
// app.js, schedule.js va admin.html shu faylni ishlatadi.
// Boshqa joyda firebaseConfig qaytadan yozilmasin — faqat shu fayl.
//
// Qayerdan olish mumkin:
// 1. https://console.firebase.google.com -> loyihangizni oching
// 2. ⚙️ Project settings -> "Your apps" -> Web (</>) -> "Config" ni tanlang
// 3. Quyidagi obyektni o'zingiznikiga almashtiring
//
// ESLATMA: bu "Web API key" — bazangiz Firestore xavfsizlik qoidalari
// (Security Rules) orqali himoyalanadi, u parol emas. Lekin shunga
// qaramay uni faqat shu bitta faylda saqlang.

export const firebaseConfig = {
    apiKey: "AIzaSyB5vQ7iTtrqG-Xun6uiCGRmaNCnuGSSs-I",
    authDomain: "eliteform-fitness-admin-panel.firebaseapp.com",
    projectId: "eliteform-fitness-admin-panel",
    storageBucket: "eliteform-fitness-admin-panel.firebasestorage.app",
    messagingSenderId: "1074788305391",
    appId: "1:1074788305391:web:ccff3640c7c26502234e1a",
    measurementId: "G-9SVCDNZX60"
};

export const ADMIN_EMAIL = "anasxoninoyatov3@gmail.com";
// Obuna tariflari (narxlarni o'zingizga moslang). Narx so'mda.
export const PLANS = {
    month:   { name: "1 oy",   days: 30,  price: 199000 },
    quarter: { name: "3 oy",   days: 90,  price: 499000 },
    year:    { name: "12 oy",  days: 365, price: 1590000 }
};
