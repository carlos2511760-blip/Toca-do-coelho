
// Configuração do Firebase que pegamos do seu console
const firebaseConfig = {
  apiKey: "AIzaSyDkQCvfOSMoLLNdJUAJA1vVtQiIM4gWn0Q",
  authDomain: "jogo-fee62.firebaseapp.com",
  projectId: "jogo-fee62",
  storageBucket: "jogo-fee62.firebasestorage.app",
  messagingSenderId: "574734173996",
  appId: "1:574734173996:web:504e31ceec0ad148704e89",
  measurementId: "G-K20NN83867"
};

// Inicializando o Firebase (via CDN importado no HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let currentUser = null;

// Observador de estado de login
onAuthStateChanged(auth, async (user) => {
    const loginBtn = document.getElementById('login-status-btn');
    if (user) {
        currentUser = user;
        console.log("Usuário logado:", user.email);
        if (loginBtn) loginBtn.innerHTML = `👤 ${user.displayName || user.email.split('@')[0]}`;
        
        // Quando logar, baixa os dados da nuvem para o PC
        await syncFromCloud();
    } else {
        currentUser = null;
        if (loginBtn) loginBtn.innerHTML = "☁️ Entrar / Salvar";
    }
});

// LOGIN COM GOOGLE
window.loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        closeLoginModal();
    } catch (error) {
        alert("Erro ao entrar com Google: " + error.message);
    }
};

// LOGIN COM EMAIL/SENHA
window.loginWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        closeLoginModal();
    } catch (error) {
        alert("Erro: " + error.message);
    }
};

// CRIAR CONTA
window.registerWithEmail = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Conta criada com sucesso!");
        closeLoginModal();
    } catch (error) {
        alert("Erro ao criar conta: " + error.message);
    }
};

// SAIR
window.logout = () => {
    signOut(auth);
};

// --- SINCRONIZAÇÃO DE DADOS ---

// Envia o localStorage para o Firebase
window.syncToCloud = async () => {
    if (!currentUser) return;
    
    // Pegamos tudo que o jogo salvou no seu PC
    const gameData = {
        unlockedChars: {},
        totalGold: localStorage.getItem('toca_gold') || "0",
        bestTime: localStorage.getItem('toca_vic_time') || "999999",
        lastSync: new Date().toISOString()
    };
    
    // Pegamos os personagens (20 a 24)
    for(let i=20; i<=24; i++) {
        gameData.unlockedChars[`char${i}`] = localStorage.getItem(`toca_char${i}`) === 'true';
    }

    try {
        await setDoc(doc(db, "users", currentUser.uid), gameData);
        console.log("Dados salvos na nuvem!");
    } catch (e) {
        console.error("Erro ao sincronizar:", e);
    }
};

// Puxa do Firebase para o localStorage
async function syncFromCloud() {
    if (!currentUser) return;
    
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Atualiza o local com o que veio da nuvem
        if (data.totalGold) localStorage.setItem('toca_gold', data.totalGold);
        if (data.bestTime) localStorage.setItem('toca_vic_time', data.bestTime);
        
        if (data.unlockedChars) {
            Object.keys(data.unlockedChars).forEach(key => {
                const charId = key.replace('char', '');
                localStorage.setItem(`toca_char${charId}`, data.unlockedChars[key]);
            });
        }
        
        // Notifica o jogo que dados mudaram (se necessário recarregar UI)
        if (typeof initSecretCharacters === 'function') initSecretCharacters();
        console.log("Dados carregados da nuvem e aplicados localmente!");
    }
}
