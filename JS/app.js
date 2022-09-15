/**
Les demandes du client sont:
    Visualisation en temps réel des films.
    Maquette à réaliser selon une image.
    4 films visible et le reste en carousel HTML et CSS OK, rest JS.
    Récuperer les films sur une API selon la méthode AJAX afficher sur une page web.
    1 film qui représente le meilleur toute catégorie confondue. En haut, de la page il y l'image, 
        le titre, un bouton pour ouvrir la modal et le résumé.
    1 catégorie des films les mieux noté.
    3 catégories au choix.
    Si on clique sur n'importe quel film, la modal s'ouvre avec les infos du film. 
    Modal.
        - L’image de la pochette du film
        - Le Titre du film
        - Le genre complet du film
        - Sa date de sortie
        - Son Rated
        - Son score Imdb
        - Son réalisateur
        - La liste des acteurs
        - Sa durée
        - Le pays d’origine
        - Le résultat au Box Office
        - Le résumé du film
    Bouton de fermeture sur la modal.
    Utiliser Vanilla pour gérer les évènements.
*/

const APIUrl = `http://localhost:8000/api/v1/titles/`

///////////////////
// MODAL WINDOWS //
///////////////////
/**
La fenêtre modale s'ouvre avec toutes les informations nécessaires en passant en paramètre l'url du film.
Je passe l'URL en parametre la fonction et quand je click dessus elle s'active.
*/
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const getModalPicture = document.querySelector(`.modal_picture`);
const getModalTitle = document.querySelector(`.modal_title`);
const getModalDescription = document.querySelector(`.modal_description`);
const getModalActors = document.querySelector(`.modal_actors`);
const getModalDirectors = document.querySelector(`.modal_directors`);
const getModalDuration = document.querySelector(`.modal_duration`);
const getModalRated = document.querySelector(`.modal_rated`);
const getModalScore = document.querySelector(`.modal_score`);
const getModalDatePublished = document.querySelector(`.modal_date_published`);
const getModalGenres = document.querySelector(`.modal_genres`);
const getModalOrigineCountries = document.querySelector(`.modal_origine_countries`);
const getModalResultsOfBoxOffice = document.querySelector(`.modal_results_of_box_office`);

const getModalBox = async function(movieURL) {
    try {
        const response = await fetch(movieURL)
        let data = await response.json()
        getModalPicture.src = data.image_url;
        getModalTitle.textContent = "Title: " + data.title;
        getModalDescription.textContent = "Description: " + data.description;
        getModalActors.textContent = "Actors: " + data.actors;
        getModalDirectors.textContent = "Directors: " + data.directors;
        getModalDuration.textContent = "Duration: " + data.duration + " min";
        getModalRated.textcontent = "Rated: " + data.rated;
        getModalScore.textContent = "Score: " + data.imdb_score;
        getModalDatePublished.textContent = "Date published: " + data.date_published;
        getModalGenres.textContent = "Genres: " + data.genres;
        getModalOrigineCountries.textContent = "Countrie: " + data.countries;
        getModalResultsOfBoxOffice.textContent = "Box Office: " + data.avg_vote;  
    } catch(error) {
        console.log(error)
    }
}

modalTriggers.forEach((trigger) =>
trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
    modalContainer.classList.toggle("active")
}

////////////////
// BEST MOVIE //
////////////////

/**
 * J'ai saisi le meilleur film en dur (`?sort_by=-imdb_score`) associé à l'APIUrl.
 * Obtention de l'URL du film pour la passer dans `getBestMovieInformation` en paramètre.
 * @param {str} idParent 
 */
const getBestMovie = async function (idParent) {
    try {
        const response = await fetch(APIUrl+`?sort_by=-imdb_score`)
        let data = await response.json()
        movieURL = data.results[0].url
        getBestMovieInformation(idParent, movieURL)
    } catch(error) {
        console.log(error)
    }
}
/**
 * Passage en paramètre l'URL du film pour obtenir les infos et les attribuer aux balises HTML du meilleur film.
 * @param {str} idParent 
 * @param {HTMLElement} movieUrl 
 */
const getBestMovieInformation = async function(idParent, movieUrl){
    const response = await fetch(movieUrl)
    let data = await response.json()
    const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
    const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
    const getMovieDescription = document.querySelector(`.movie_description__${idParent}`)
    
    getMovieTitle.textContent = data.title;
    getMoviePicture.src = data.image_url;
    getMovieDescription.textContent = data.description
    getModalBox(movieUrl)
}
getBestMovie(`best_movie`)

/////////////////////
// CATEGORIE MOVIE //
/////////////////////
/**
 * Attribution des titres de chaques catégorie.
 * @param {str} idParent 
 * @param {str} categorieName 
 */
const getCategortieTitle = async function(idParent, categorieName) {
    const categorieTitle = document.querySelector(`.categorie_title__${idParent}`)
    categorieTitle.textContent = categorieName
}

/**
 * Je vais chercher les images et informations nécessaire pour l'ajout d'image dans le carousel.
 * @param {HTMLElement} movieUrl 
 * @param {str} carousel 
 */
const getCarouselInformationMovie = async function (movieUrl, carousel) {
    const response = await fetch(movieUrl)
    let data = await response.json()
    let image = new Image();
    image.id = data.id;     
    image.className = `item modal-trigger`;
    image.src = data.image_url;
    image.addEventListener(`click`, function(){
        getModalBox(movieUrl)
        toggleModal()
    })
    carousel.appendChild(image);
 }

/**
 * @param {str} idParent 
 * @param {str} getCategorie
 * @param {str} categorieName
 */
 async function getMovieCategorie(idParent, getCategorie, categorieName) {
    const carousel = document.querySelector(`.carousel_box__${idParent}`)
    getCategortieTitle(idParent, categorieName)
    try {
        const response = await fetch(APIUrl + getCategorie)
        let data = await response.json()
        for(i = 0; i < 5; i++) {
            movieURL = data.results[i].url
            getCarouselInformationMovie(movieURL, carousel)
        }
        nextPage = data.next
        {
            const response = await fetch(nextPage)
            let data = await response.json()
            for(i = 0; i < 2; i++) {
                movieURL = data.results[i].url
                getCarouselInformationMovie(movieURL, carousel)
            }
        }
    } catch(error) {
        console.log(error)
    }
}

getMovieCategorie(`top_rated`, `?imdb_score_min=9&imdb_score_max=10`, `Top rated`)
getMovieCategorie(`first_categorie`, `?genre=Comedy&sort_by=-imdb_score`, `Comedy`)
getMovieCategorie(`second_categorie`, `?genre=Animation&sort_by=-imdb_score`, `Animation`)
getMovieCategorie(`third_categorie`, `?genre=Sport&sort_by=-imdb_score`, `Sport`)


//////////////
// CAROUSEL //
//////////////

/// TOP RATED
const nextTopRated = document.querySelector(`.next__top_rated`);
    nextTopRated.addEventListener('click', () => {
    document.querySelector(`.carousel_box__top_rated`).scrollLeft += 180;
})
const previewTopRated = document.querySelector(`.preview__top_rated`);
    previewTopRated.addEventListener('click', () => {
    document.querySelector(`.carousel_box__top_rated`).scrollLeft -= 180;
})

/// FIRST CATEGORIE
const nextFirstCategorie = document.querySelector(`.next__first_categorie`);
nextFirstCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__first_categorie`).scrollLeft += 180;
})
const previewFirstCategorie = document.querySelector(`.preview__first_categorie`);
    previewFirstCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__first_categorie`).scrollLeft -= 180;
})

/// SECONDE CATEGORIE
const nextSecondCategorie = document.querySelector(`.next__second_categorie`);
    nextSecondCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__second_categorie`).scrollLeft += 180;
})
const previewSecondCategorie = document.querySelector(`.preview__second_categorie`);
    previewSecondCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__second_categorie`).scrollLeft -= 180;
})

/// THIRD CATEGORIE
const nextThirdCategorie = document.querySelector(`.next__third_categorie`);
    nextThirdCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__third_categorie`).scrollLeft += 180;
})
const previewThirdCategorie = document.querySelector(`.preview__third_categorie`);
    previewThirdCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__third_categorie`).scrollLeft -= 180;
})