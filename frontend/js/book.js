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
                <td>${book.publishYear}</td>
            `;
            console.log('id:', book.id);
            console.log('title:', book.title);
            console.log('authorId:', book.author ? book.author.id : 'Inconnu');
            console.log('subjectId:', book.subject ? book.subject.id : 'Inconnu');
            console.log('isbn:', book.isbn);
            console.log('pageCount:', book.pageCount);
            console.log('stockQuantity:', book.stockQuantity);
            console.log('price:', book.price);
            console.log('publishYear:', book.publishYear);

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
    document.getElementById('bookAuthorId').value = book.author.id
    document.getElementById('bookSubjectId').value = book.subject.id;
    document.getElementById('bookISBN').value = book.isbn;
    document.getElementById('bookPages').value = book.pageCount;
    document.getElementById('bookStock').value = book.stockQuantity;
    document.getElementById('bookPrice').value = book.price;
    document.getElementById('bookYear').value = book.publishYear
}

// Ajout d'un livre
function addBook()
{
    const book = {
        title: document.getElementById('bookTitle').value,
        authorId: parseInt(document.getElementById('bookAuthorId').value),
        subjectId: parseInt(document.getElementById('bookSubjectId').value),
        isbn: document.getElementById('bookISBN').value,
        pageCount: parseInt(document.getElementById('bookPages').value),  // Conversion en nombre
        stockQuantity: parseInt(document.getElementById('bookStock').value),  // Conversion en nombre
        price: parseFloat(document.getElementById('bookPrice').value),  // Conversion en nombre
        publishYear: parseInt(document.getElementById('bookYear').value)  // Conversion en nombre
    };

    // Vérifier si au moins un champ est rempli
    if (
        book.title.trim() === '' ||
        isNaN(book.authorId) ||
        isNaN(book.subjectId) ||
        book.isbn.trim() === '' ||
        isNaN(book.pageCount) ||
        isNaN(book.stockQuantity) ||
        isNaN(book.price) ||
        isNaN(book.publishYear)
    ) {
        alert('Veuillez remplir tous les champs');
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
        title: document.getElementById('bookTitle').value ? document.getElementById('bookTitle').value : "null",
        authorId: parseInt(document.getElementById('bookAuthorId').value) ? parseInt(document.getElementById('bookAuthorId').value) : -1,
        subjectId: parseInt(document.getElementById('bookSubjectId').value) ? parseInt(document.getElementById('bookSubjectId').value) : -1,
        isbn: document.getElementById('bookISBN').value ? document.getElementById('bookISBN').value : "null",
        pageCount: parseInt(document.getElementById('bookPages').value) ? parseInt(document.getElementById('bookPages').value) : -1,  // Conversion en nombre
        stockQuantity: parseInt(document.getElementById('bookStock').value) ? parseInt(document.getElementById('bookStock').value) : -1,  // Conversion en nombre
        price: parseFloat(document.getElementById('bookPrice').value) ? parseFloat(document.getElementById('bookPrice').value) : -1,  // Conversion en nombre
        publicationYear: parseInt(document.getElementById('bookYear').value) ? parseInt(document.getElementById('bookYear').value) : -1  // Conversion en nombre
    };

    // Vérifier si au moins un champ est rempli
    if (book.title === "null" && book.authorId === -1 && book.subjectId === -1 && book.isbn === "null" && book.pageCount === -1 && book.stockQuantity === -1 && book.price === -1 && book.publicationYear === -1) {
        alert('Veuillez remplir au moins un champ à modifier');
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
    const  price = document.getElementById('bookPrice').value;
    const authorId = document.getElementById('bookAuthorId').value;
    const subjectId = document.getElementById('bookSubjectId').value;
    const isbn = document.getElementById('bookISBN').value;


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
    else if (authorId)
    {
        API.getBookByAuthorId(authorId)
            .then(books => {
                displayBooks(books);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du livre');
                console.error(error);
            });
    }
    else if (subjectId)
    {
        API.getBookBySubjectId(subjectId)
            .then(books => {
                displayBooks(books);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du livre');
                console.error(error);
            });
    }
    else if (isbn)
    {
        API.getBookByISBN(isbn)
            .then(books => {
                displayBooks(books);
            })
            .catch(error => {
                alert('Erreur lors de la recherche du livre');
                console.error(error);
            });
    }
    else if (price)
    {
        API.getBookByPrice(price)
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
