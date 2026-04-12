
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
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let currentUser = null;

// Observador de estado de login
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        console.log("Usuário logado:", user.email);
        
        // Se o usuário não tem um nome público ainda, força ele a criar um
        if (!user.displayName) {
            if (window.switchScreen) window.switchScreen('nicknameScreen');
            return;
        }

        // Caso já tenha nome, exibe no topo e entra no jogo livremente!
        const badge = document.getElementById('user-profile-badge');
        const displayNameEl = document.getElementById('display-name');
        if (badge && displayNameEl) {
            badge.style.display = 'block';
            displayNameEl.innerText = user.displayName;
        }
        
        if (window.switchScreen) window.switchScreen('titleScreen');
        await syncFromCloud();
    } else {
        currentUser = null;
        if (window.switchScreen) window.switchScreen('authScreen');
        const badge = document.getElementById('user-profile-badge');
        if (badge) badge.style.display = 'none';
    }
});

// SET NICKNAME (Após registro)
window.setNickname = async (name) => {
    if (!name || name.trim().length < 3) return alert('O nome precisa ter pelo menos 3 caracteres!');
    if (!currentUser) return;
    try {
        await updateProfile(currentUser, { displayName: name.trim().toUpperCase() });
        
        const badge = document.getElementById('user-profile-badge');
        const displayNameEl = document.getElementById('display-name');
        if (badge && displayNameEl) {
            badge.style.display = 'block';
            displayNameEl.innerText = currentUser.displayName;
        }
        
        if (window.switchScreen) window.switchScreen('titleScreen');
        await syncFromCloud(); // Sincroniza ouro/personagens zerados ou prev
    } catch(e) {
        alert('Erro ao definir nome: ' + e.message);
    }
};

// LOGIN COM GOOGLE
window.loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        alert("Erro ao entrar com Google: " + error.message);
    }
};

// LOGIN COM EMAIL/SENHA
window.loginWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            alert("Email ou Senha incorretos. Tente novamente.");
        } else {
            alert("Erro ao entrar: " + error.message);
        }
    }
};

// CRIAR CONTA
window.registerWithEmail = async (email, password) => {
    if(password.length < 6) return alert("A senha precisa ter pelo menos 6 caracteres.");
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            alert("Esse e-mail JÁ POSSUI UMA CONTA! Use o botão ENTRAR ao lado, em vez do botão Criar.");
        } else {
            alert("Erro ao criar conta: " + error.message);
        }
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
        displayName: currentUser.displayName || 'ANON',
        email: currentUser.email,
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
