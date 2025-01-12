import API from '../js/api.js';

// Sélection des éléments du DOM
const booksTable = document.getElementById('booksTable').getElementsByTagName('tbody')[0];
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const searchBtn = document.getElementById('searchBtn');

// Variable pour stocker l'ID du livre sélectionné
let selectedBookId = null;

// Chargement initial des livres
//document.addEventListener('DOMContentLoaded', loadBooks);

// Fonction pour charger et afficher les livres
function loadBooks()
{
    API.getAllBooks()
        .then(books => {
            displayBooks(books);
        })
        .catch(error => {
            alert('Erreur lors du chargement des livres');
            console.error(error);
        });
}

//fonction pour afficher les livres
function displayBooks(books) {
    // Vider le tableau
    booksTable.innerHTML = '';

    // Debug
    console.log('Données reçues:', books);

    // Vérifier si books est un tableau
    if (Array.isArray(books)) {
        console.log('!!C\'est un tableau!!');

        // Parcourir les livres
        books.forEach(book => {
            console.log('Détails du livre:', book);  // Affiche l'objet livre entier

            const row = booksTable.insertRow();
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author ? book.author.id : 'Inconnu'}</td> <!-- ID de l'auteur -->
                <td>${book.subject ? book.subject.id : 'Inconnu'}</td> <!-- ID du sujet -->
                <td>${book.isbn}</td>
                <td>${book.pageCount}</td>
                <td>${book.stockQuantity}</td>
                <td>${book.price}</td>
                <td>${book.publicationYear}</td>
            `;
            console.log('id:', book.id);
            console.log('title:', book.title);
            console.log('authorId:', book.author ? book.author.id : 'Inconnu');
            console.log('subjectId:', book.subject ? book.subject.id : 'Inconnu');
            console.log('isbn:', book.isbn);
            console.log('pageCount:', book.pageCount);
            console.log('stockQuantity:', book.stockQuantity);
            console.log('price:', book.price);
            console.log('publishYear:', book.publicationYear);

            // Ajouter l'événement click
            row.addEventListener('click', () => selectBook(book));
        });
    } else {
        console.error('Format de données inattendu:', books);
    }
}




// Sélection d'un livre
function selectBook(book)
{
    selectedBookId = book.id;
    document.getElementById('bookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthorId').value = book.authorId;
    document.getElementById('bookSubjectId').value = book.subjectId;
    document.getElementById('bookIsbn').value = book.isbn;
    document.getElementById('bookPageCount').value = book.pageCount;
    document.getElementById('bookStockQuantity').value = book.stockQuantity;
    document.getElementById('bookPrice').value = book.price;
    document.getElementById('bookPublicationYear').value = book.publicationYear;
}

// Ajout d'un livre
function addBook()
{
    const book = {
        title: document.getElementById('bookTitle').value,
        authorId: document.getElementById('bookAuthorId').value,
        subjectId: document.getElementById('bookSubjectId').value,
        isbn: document.getElementById('bookIsbn').value,
        pageCount: parseInt(document.getElementById('bookPageCount').value),  // Conversion en nombre
        stockQuantity: parseInt(document.getElementById('bookStockQuantity').value),  // Conversion en nombre
        price: parseFloat(document.getElementById('bookPrice').value),  // Conversion en nombre
        publicationYear: parseInt(document.getElementById('bookPublicationYear').value)  // Conversion en nombre
    };


    if (!book.title || !book.authorId || !book.subjectId || !book.isbn || !book.pageCount || !book.stockQuantity || !book.price || !book.publicationYear) {
        alert('Veuillez remplir tous les champs sauf l\'ID');
        return;
    }

    API.createBook(book)
        .then(() => {
            loadBooks();
        })
        .catch(error => {
            alert('Erreur lors de l\'ajout du livre');
            console.error(error);
        });
}

// Modification d'un livre
function updateBook()
{
    if (!selectedBookId) {
        alert('Veuillez sélectionner un livre à modifier');
        return;
    }

    const book = {
        title: document.getElementById('bookTitle').value,
        authorId: document.getElementById('bookAuthorId').value,
        subjectId: document.getElementById('bookSubjectId').value,
        isbn: document.getElementById('bookIsbn').value,
        pageCount: parseInt(document.getElementById('bookPageCount').value),  // Conversion en nombre
        stockQuantity: parseInt(document.getElementById('bookStockQuantity').value),  // Conversion en nombre
        price: parseFloat(document.getElementById('bookPrice').value),  // Conversion en nombre
        publicationYear: parseInt(document.getElementById('bookPublicationYear').value)  // Conversion en nombre
    };


    if (!book.title || !book.authorId || !book.subjectId || !book.isbn || !book.pageCount || !book.stockQuantity || !book.price || !book.publicationYear) {
        alert('Veuillez remplir tous les champs sauf l\'ID');
        return;
    }

    API.updateBook(selectedBookId, book)
        .then(() => {
            loadBooks();
        })
        .catch(error => {
            alert('Erreur lors de la modification du livre');
            console.error(error);
        });
}

// Suppression d'un livre
function deleteBook()
{
    if (!selectedBookId) {
        alert('Veuillez sélectionner un livre');
        return;
    }

    API.deleteBook(selectedBookId)
        .then(() => {
            loadBooks();
        })
        .catch(error => {
            alert('Erreur lors de la suppression du livre');
            console.error(error);
        });
}

// Recherche d'un livre
searchBtn.addEventListener('click', () => {
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('bookTitle').value;

    if (id)
    {
        API.getBookById(id)
            .then(books => {
                displayBooks(books);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du livre');
                console.error(error);
            });
    }
    else if (title)
    {
        API.getBookByTitle(title)
            .then(books => {
                displayBooks(books);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du livre');
                console.error(error);
            });
    }
    else if (!id && !title)
    {
        API.getAllBooks()
            .then(books => {
                displayBooks(books);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du livre');
                console.error(error);
            });
    }
});

// Ajout des événements
addBtn.addEventListener('click', addBook);
updateBtn.addEventListener('click', updateBook);
deleteBtn.addEventListener('click', deleteBook);
