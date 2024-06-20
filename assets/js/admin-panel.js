import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3AUP5u5iQq6LPdDf68xM82hMFeC0vM3A",
    authDomain: "gold-design-db-6479f.firebaseapp.com",
    databaseURL: "https://gold-design-db-6479f-default-rtdb.firebaseio.com",
    projectId: "gold-design-db-6479f",
    storageBucket: "gold-design-db-6479f.appspot.com",
    messagingSenderId: "411521916559",
    appId: "1:411521916559:web:285c12fb66b196d323dafa"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

function displayMessages() {
    const messageList = document.querySelector("#messageList");
    messageList.innerHTML = "";
    const messagesRef = ref(db, 'messages');
    onChildAdded(messagesRef, (childSnapshot) => {
        const messageData = childSnapshot.val();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `
            <div class="message-info">
                <span class="message-label">Name:</span>
                <span class="message-content">${messageData.name}</span>
            </div>
            <div class="message-info">
                <span class="message-label">Email:</span>
                <span class="message-content">${messageData.email}</span>
            </div>
            <div class="message-info">
                <span class="message-label">Subject:</span>
                <span class="message-content">${messageData.subject}</span>
            </div>
            <div class="message-info">
                <span class="message-label">Message:</span>
                <span class="message-content">${messageData.message}</span>
            </div>
        `;
        messageList.appendChild(messageElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayMessages();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('fileForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const file = document.getElementById('fileInput').files[0];
    const projectName = document.getElementById('projectName').value;
    const aboutProject = document.getElementById('aboutProject').value;
    const clientName = document.getElementById('clientName').value;
    const architectName = document.getElementById('architectName').value;
    const builderName = document.getElementById('builderName').value;
    const budget = document.getElementById('budget').value;
    const projectData = {
        projectName: projectName,
        aboutProject: aboutProject,
        clientName: clientName,
        architectName: architectName,
        builderName: builderName,
        budget: budget
    };
    try {
        if (file) {
            const storageReference = storageRef(storage, 'images/' + file.name);
            const snapshot = await uploadBytes(storageReference, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            projectData.imageUrl = downloadURL;
        }
        await addDoc(collection(firestore, 'projects'), projectData);
        const database = getDatabase();
        const databaseRef = ref(database, 'Projects');
        await set(databaseRef, projectData);
        alert('Əlavə olundu!');
    } catch (error) {
        console.error('Səhf: ', error);
    }
});