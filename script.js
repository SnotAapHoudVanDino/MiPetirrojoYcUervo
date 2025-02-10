const firebaseConfig = {
    apiKey: "AIzaSyAmBFtPf11eu4tohfj17CMkG8FbsVl93O8",
    authDomain: "mijnroodborststje.firebaseapp.com",
    projectId: "mijnroodborststje",
    storageBucket: "mijnroodborststje.appspot.com",
    messagingSenderId: "99812857188",
    appId: "1:99812857188:web:f7b3dd2662dd70bca59671",
    measurementId: "G-V1HHCF8Y93"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

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
