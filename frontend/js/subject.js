import API from '../js/api.js';

// Sélection des éléments du DOM
const subjectsTable = document.getElementById('subjectsTable').getElementsByTagName('tbody')[0];
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const searchBtn = document.getElementById('searchBtn');

// Variable pour stocker l'ID du sujet sélectionné
let selectedSubjectId = null;

// Chargement initial des sujets
//document.addEventListener('DOMContentLoaded', loadSubjects);

// Fonction pour charger et afficher les sujets
function loadSubjects()
{
    API.getAllSubjects()
        .then(subjects => {
            displaySubjects(subjects);
        })
        .catch(error => {
            alert('Erreur lors du chargement des sujets');
            console.error(error);
        });
}

//fonction pour afficher les sujets
function displaySubjects(subjects)
{
    // Vider le tableau
    subjectsTable.innerHTML = '';

    // Debug
    console.log('Données reçues:', subjects);

    // Vérifier si subjects est un objet
    if (typeof subjects === 'object' && subjects !== null) {
        console.log('!!C\'est un objet!!');

        // Parcourir les clés de l'objet (qui correspondent aux sujets)
        Object.values(subjects).forEach(subject => {
            const row = subjectsTable.insertRow();
            row.innerHTML = `
                <td>${subject.id}</td>
                <td>${subject.name}</td>
            `;
            console.log('id:', subject.id);
            console.log('name:', subject.name);

            // Ajouter l'événement click
            row.addEventListener('click', () => selectSubject(subject));
        });
    }
    else {
        console.error('Format de données inattendu:', subjects);
    }
}


// Sélection d'un sujet
function selectSubject(subject)
{
    selectedSubjectId = subject.id;
    document.getElementById('subjectId').value = subject.id;
    document.getElementById('subjectName').value = subject.name;
}


// Ajout d'un sujet
addBtn.addEventListener('click', () => {
    const name = document.getElementById('subjectName').value; // Correction ici
    if (!name) {
        alert('Veuillez remplir le nom du sujet');
        return;
    }
    console.log('Nom du sujet:', name);

    API.createSubject({ name })
        .then(() => {
            loadSubjects();
        })
        .catch(error => {
            alert('Erreur lors de l\'ajout du sujet');
            console.error(error);
        });
});


// Autres gestionnaires d'événements similaires pour update, delete et search...
//modification d'un sujet
updateBtn.addEventListener('click', () => {
    const name = document.getElementById('subjectName').value; // Correction ici
    if (!name) {
        alert('Veuillez remplir le nom du sujet');
        return;
    }
    console.log('Nom du sujet:', name);

    API.updateSubject(selectedSubjectId, { name })
        .then(() => {
            loadSubjects();
        })
        .catch(error => {
            alert('Erreur lors de la modification du sujet');
            console.error(error);
        });
});

// Suppression d'un sujet
deleteBtn.addEventListener('click', () => {
    if (!selectedSubjectId) {
        alert('Veuillez sélectionner un sujet');
        return;
    }

    API.deleteSubject(selectedSubjectId)
        .then(() => {
            loadSubjects();
        })
        .catch(error => {
            alert('Erreur lors de la suppression du sujet');
            console.error(error);
        });
});

// Recherche d'un sujet
searchBtn.addEventListener('click', () => {
    const id = document.getElementById('subjectId').value;
    const name = document.getElementById('subjectName').value;

    if (id)
    {
        API.getSubjectById(id)
            .then(subjects => {
                displaySubjects(subjects);

            })
            .catch(error => {
                alert('Erreur lors de la recherche du sujet');
                console.error(error);
            });
    }
    else if (name)
    {
        API.getSubjectByName(name)
            .then(subjects => {
                displaySubjects(subjects);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du sujet');
                console.error(error);
            });
    }
    else if (!id && !name)
    {
        API.getAllSubjects()
            .then(subjects => {
                displaySubjects(subjects);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du sujet');
                console.error(error);
            });
    }

});



