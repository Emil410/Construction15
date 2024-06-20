import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
    const projectId = window.location.pathname.split('/').pop();

    const projectRef = ref(db, 'projects/' + projectId);
    onValue(projectRef, (snapshot) => {
        const projectData = snapshot.val();
        if (projectData) {
            displayProjectData(projectData);
        }
    }, (error) => {
        console.error('Error:', error);
    });
});

function displayProjectData(projectData) {
    const projectNameElem = document.getElementById('projectName');
    const aboutProjectElem = document.getElementById('aboutProject');
    const projectInfoElem = document.getElementById('projectInfo');
    const projectImageElem = document.getElementById('projectImage');

    if (projectNameElem) projectNameElem.textContent = projectData.projectName;
    if (aboutProjectElem) aboutProjectElem.textContent = projectData.aboutProject;

    if (projectInfoElem) {
        projectInfoElem.innerHTML = `
            <li><strong>Müştəri:</strong> ${projectData.clientName}</li>
            <li><strong>Memar:</strong> ${projectData.architectName}</li>
            <li><strong>Qurucu:</strong> ${projectData.builderName}</li>
            <li><strong>Büdcə:</strong> ${projectData.budget}</li>
        `;
    }

    if (projectImageElem) {
        const imageRef = storageRef(storage, projectData.imageUrl);
        getDownloadURL(imageRef)
            .then((url) => {
                projectImageElem.src = url;
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }
}