// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmBFtPf11eu4tohfj17CMkG8FbsVl93O8",
  authDomain: "mijnroodborststje.firebaseapp.com",
  projectId: "mijnroodborststje",
  storageBucket: "mijnroodborststje.firebasestorage.app",
  messagingSenderId: "99812857188",
  appId: "1:99812857188:web:f7b3dd2662dd70bca59671",
  measurementId: "G-V1HHCF8Y93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Dagboek opslaan
function saveDiary() {
    const text = document.getElementById("diaryText").value; // Haalt de tekst op die de gebruiker heeft geschreven
    if (text) {
        db.collection("diary").add({
            text: text, // De tekst van het dagboek
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // De tijd waarop het is opgeslagen
        });
        document.getElementById("diaryText").value = ""; // Leeg het tekstveld na het opslaan
    }
}
// Uploaden van foto’s of video’s
function uploadFile() {
    const file = document.getElementById("fileUpload").files[0]; // Haalt het geselecteerde bestand op
    if (file) {
        const storageRef = storage.ref("uploads/" + file.name);  // Bestandsnaam + locatie in Firebase Storage
        storageRef.put(file).then(snapshot => {  // Bestanden uploaden naar Firebase Storage
            snapshot.ref.getDownloadURL().then(url => {  // Haalt de URL van het bestand op na upload
                // Sla de URL van het bestand op in Firestore
                db.collection("media").add({
                    url: url, 
                    timestamp: firebase.firestore.FieldValue.serverTimestamp() // De tijd waarop het bestand werd geüpload
                });
            });
        });
    }
}

function checkCode() {
    const code = document.getElementById("codeInput").value;
    if (code === "28/08/2024") {
        alert("Ik hou van jou, Robin ❤️");
        document.getElementById("login").classList.add("hidden");
        document.getElementById("mainContent").classList.remove("hidden");
        loadDiary();
        loadMedia();
    } else {
        alert("Foute code! Probeer opnieuw.");
    }
}

function showDiary() {
    document.getElementById("diarySection").classList.toggle("hidden");
}

function saveDiary() {
    const text = document.getElementById("diaryText").value;
    if (text) {
        db.collection("diary").add({ text: text, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
        document.getElementById("diaryText").value = "";
    }
}

function loadDiary() {
    db.collection("diary").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        document.getElementById("savedDiary").innerHTML = "";
        snapshot.forEach(doc => {
            document.getElementById("savedDiary").innerHTML += `<p>${doc.data().text}</p>`;
        });
    });
}

function showMedia() {
    document.getElementById("mediaSection").classList.toggle("hidden");
}

function uploadFile() {
    const file = document.getElementById("fileUpload").files[0];
    if (file) {
        const storageRef = storage.ref("uploads/" + file.name);
        storageRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                db.collection("media").add({ url: url, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
            });
        });
    }
}

function loadMedia() {
    db.collection("media").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        document.getElementById("mediaContent").innerHTML = "";
        snapshot.forEach(doc => {
            document.getElementById("mediaContent").innerHTML += `<img src="${doc.data().url}" width="200">`;
        });
    });
}
function uploadFile() {
    const file = document.getElementById("fileUpload").files[0]; // Haalt het bestand op
    if (file) {
        const storageRef = storage.ref("uploads/" + file.name);  // Bestandsnaam is het pad in Firebase
        storageRef.put(file).then(snapshot => {  // Uploaden naar Firebase Storage
            snapshot.ref.getDownloadURL().then(url => {  // Haalt de download URL op
                db.collection("media").add({
                    url: url, 
                    timestamp: firebase.firestore.FieldValue.serverTimestamp() 
                });
            });
        });
    }
}
