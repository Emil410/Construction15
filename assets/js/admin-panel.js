import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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