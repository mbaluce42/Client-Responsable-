import API from '../js/api.js';

// Sélection des éléments du DOM
const authorsTable = document.getElementById('authorsTable').getElementsByTagName('tbody')[0];
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const searchBtn = document.getElementById('searchBtn');

// Variable pour stocker l'ID de l'auteur sélectionné
let selectedAuthorId = null;

// Chargement initial des auteurs
document.addEventListener('DOMContentLoaded', loadAuthors);

// Fonction pour charger et afficher les auteurs
function loadAuthors()
{
    API.getAllAuthors()
        .then(authors => {
            displayAuthors(authors);
        })
        .catch(error => {
            alert('Erreur lors du chargement des auteurs');
            console.error(error);
        });
}

//fonction pour afficher les auteurs
function displayAuthors(authors) {
    authorsTable.innerHTML = '';

    if (Array.isArray(authors)) {
        authors.forEach(author => {
            const row = authorsTable.insertRow();
            row.innerHTML = `
                <td>${author.id}</td>
                <td>${author.firstName}</td>
                <td>${author.lastName}</td>
                <td>${author.birthDate}</td>
            `;

            row.addEventListener('click', () => selectAuthor(author));
        });
    } else {
        console.error('Format de données inattendu:', authors);
    }
}




// Sélection d'un auteur
function selectAuthor(author) {
    selectedAuthorId = author.id;
    document.getElementById('authorId').value = author.id;
    document.getElementById('authorFirstName').value = author.firstName;
    document.getElementById('authorLastName').value = author.lastName;
    document.getElementById('authorBirthDate').value = author.birthDate;
}


// Ajout d'un auteur
function addAuthor() {
    const author = {
        firstName: document.getElementById('authorFirstName').value,
        lastName: document.getElementById('authorLastName').value,
        birthDate: document.getElementById('authorBirthDate').value
    };

    if (!author.firstName || !author.lastName || !author.birthDate) {
        alert('Veuillez remplir tous les champs sauf l\'ID');
        return;
    }

    API.createAuthor(author)
        .then(() => {
            loadAuthors();
        })
        .catch(error => {
            alert('Erreur lors de l\'ajout de l\'auteur');
            console.error(error);
        });
}


// Modification d'un auteur
function updateAuthor() {
    if (!selectedAuthorId) {
        alert('Veuillez sélectionner un auteur à modifier');
        return;
    }

    const author = {
        id: selectedAuthorId,
        firstName: document.getElementById('authorFirstName').value,
        lastName: document.getElementById('authorLastName').value,
        birthDate: document.getElementById('authorBirthDate').value
    };

    API.updateAuthor(selectedAuthorId, author)
        .then(() => {
            loadAuthors();
        })
        .catch(error => {
            alert('Erreur lors de la modification de l\'auteur');
            console.error(error);
        });
}


// Suppression d'un auteur
function deleteAuthor()
{
    if (!selectedAuthorId) {
        alert('Veuillez sélectionner un auteur');
        return;
    }

    API.deleteAuthor(selectedAuthorId)
        .then(() => {
            loadAuthors();
        })
        .catch(error => {
            alert('Erreur lors de la suppression de l\'auteur');
            console.error(error);
        });
}

// Recherche d'un auteur
function searchAuthor()
{
    const id = document.getElementById('authorId').value;
    const firstname = document.getElementById('authorFirstName').value;
    const lastname = document.getElementById('authorLastName').value;

    if (id)
    {
        API.getAuthorById(id)
            .then(authors => {
                displayAuthors(authors);
            })
            .catch(error => {
                alert('Erreur lors de la recherche de l\'auteur');
                console.error(error);
            });
    }
    else if (firstname && lastname)
    {
        API.getAuthorByLastFirstname(lastname, firstname)
            .then(authors => {
                displayAuthors(authors);
            })
            .catch(error => {
                alert('Erreur lors de la recherche de l\'auteur');
                console.error(error);
            });
    }
    else if (!id && !firstname && !lastname)
    {
        API.getAllAuthors()
            .then(authors => {
                displayAuthors(authors);
            })
            .catch(error => {
                alert('Erreur lors du chargement des auteurs');
                console.error(error);
            });
    }
    else
    {
        alert('Veuillez saisir un ID ou un prénom et un nom');
    }
}

// Ajout des événements
addBtn.addEventListener('click', addAuthor);
updateBtn.addEventListener('click', updateAuthor);
deleteBtn.addEventListener('click', deleteAuthor);
searchBtn.addEventListener('click', searchAuthor);
