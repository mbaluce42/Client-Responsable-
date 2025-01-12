// Configuration de l'API
const API_BASE_URL = 'http://localhost:8080/api';

// Classe pour gérer les appels à l'API
class API
{
    // Méthode utilitaire pour faire les requêtes AJAX
    static makeRequest(method, url, data = null)
    {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (data != null)// Si on a des données à envoyer
            {
                //xhr.setRequestHeader('Content-Type', 'application/json');// Définir le type de contenu (Body) pour les requêtes POST et PUT
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');// Définir le type de contenu (Body) pour les requêtes POST et PUT

            }

            xhr.onreadystatechange = function()
            {
                if (xhr.readyState === 4)
                {
                    console.log('Response:', xhr.responseText);
                    if (xhr.status >= 200 && xhr.status < 300)
                    {
                        // Convertir en JSON si possible, sinon retourner le texte
                        try
                        {
                            const response = JSON.parse(xhr.responseText);
                            resolve(response);// Renvoie la réponse JSON
                        }
                        catch
                        {
                            resolve(xhr.responseText);// Renvoie la réponse texte
                        }
                    }
                    else
                    {
                        reject(new Error(`Request failed with status ${xhr.status}`));
                    }
                }
            };

            xhr.onerror = () => reject(new Error('Request failed'));
            if (data)
            {
                xhr.send(JSON.stringify(data));
            }
            else {
                xhr.send();
            }
        });
    }

    // SUBJECTS
    static getAllSubjects()
    {
        return this.makeRequest('GET', `${API_BASE_URL}/subjects`);
    }

    static getSubjectById(id)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/subjects?id=${id}`);
    }

    static getSubjectByName(name)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/subjects?name=${name}`);
    }

    static createSubject(data)
    {
        return this.makeRequest('POST', `${API_BASE_URL}/subjects`, data);
    }

    static updateSubject(id, data)
    {
        return this.makeRequest('PUT', `${API_BASE_URL}/subjects?id=${id}`, data);
    }

    static deleteSubject(id)
    {
        return this.makeRequest('DELETE', `${API_BASE_URL}/subjects?id=${id}`);
    }

//--------------------------------------------------------------------------------------------------------------------------------------------

    // AUTHORS
    static getAllAuthors()
    {
        return this.makeRequest('GET', `${API_BASE_URL}/authors`);
    }

    static getAuthorById(id)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/authors?id=${id}`);
    }

    static getAuthorByLastFirstname(lastname, firstname)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/authors?lastName=${lastname}&firstName=${firstname}`);
    }

    static createAuthor(data)
    {
        return this.makeRequest('POST', `${API_BASE_URL}/authors`, data);
    }

    static updateAuthor(id, data)
    {
        return this.makeRequest('PUT', `${API_BASE_URL}/authors?id=${id}`, data);
    }

    static deleteAuthor(id)
    {
        return this.makeRequest('DELETE', `${API_BASE_URL}/authors?id=${id}`);
    }

//--------------------------------------------------------------------------------------------------------------------------------------------

    // BOOKS
    static getAllBooks()
    {
        return this.makeRequest('GET', `${API_BASE_URL}/books`);
    }

    static getBookById(id)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/books?id=${id}`);
    }

    static getBookByTitle(title)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/books?title=${title}`);
    }

    static getBookByPrice(price)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/books?maxPrice=${price}`);
    }

    static getBookBySubjectId(subjectId)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/books?subjectId=${subjectId}`);
    }

    static getBookByAuthorId(authorId)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/books?authorId=${authorId}`);
    }

    static getBookByISBN(isbn)
    {
        return this.makeRequest('GET', `${API_BASE_URL}/books?isbn=${isbn}`);
    }

    static createBook(data)
    {
        return this.makeRequest('POST', `${API_BASE_URL}/books`, data);
    }

    static updateBook(id, data)
    {
        return this.makeRequest('PUT', `${API_BASE_URL}/books?id=${id}`, data);
    }

    static deleteBook(id)
    {
        return this.makeRequest('DELETE', `${API_BASE_URL}/books?id=${id}`);
    }
}

export default API;