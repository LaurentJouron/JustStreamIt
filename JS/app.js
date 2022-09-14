/**
Les demandes du client sont:
OK => Visualisation en temps réel des films.
OK => Maquette à réaliser selon une image.
RESTE A FAIRE => 4 films visible et le reste en carousel HTML et CSS OK, rest JS.
OK => Récuperer les films sur une API selon la méthode AJAX afficher sur une page web.
OK => 1 film qui représente le meilleur toute catégorie confondue. En haut, de la page il y l'image, 
        le titre, un bouton pour ouvrir la modal et le résumé.
OK => 1 catégorie des films les mieux noté.
OK => 3 catégories au choix.
RESTE A FAIRE => Si on clique sur n'importe quel film, la modal s'ouvre avec les infos du film. 
OK => Modal.
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
OK => Bouton de fermeture sur la modal.
OK => Utiliser Vanilla pour gérer les évènements.
*/

const APIUrl = `http://localhost:8000/api/v1/titles/`

////////////////
// BEST MOVIE //
////////////////
/**
Toutes les informations recherchées ne se trouvent pas sur la première page. Il faut aller chercher sur une autre page 
qui fournis les informations détaillées du film.
-Deux solutions:
    - récupération du lien vers cette seconde page depuis la première (solution la plus simple que j'ai prise).
    - construction de l'URL, car le lien est l'APIUrl + ID du film.
Il faut faire un premier Fetch pour récuperer la première URL, et la passer en paramètre dans la fonction qui récupère
le détail des films grâce à un deuxième Fetch.
Pour le premier film, j'ai saisi le meilleur film en dur (`?sort_by=-imdb_score`) associé à l'APIUrl.
 */

/**
 * Obtention de l'URL du film et la passer dans `getBestMovieInformation` en paramètre pour récupérer les infos.
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
 * En passant en paramètre l'URL du film on attribue les infos aux balises HTML du meilleur film.
 * @param {str} idParent 
 * @param {str} movieUrl 
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
}

getBestMovie(`best_movie`)

/////////////////////
// CATEGORIE MOVIE //
/////////////////////
/**
La solution pour récupérer les infomations nécessaire est la même que ci-dessus, à la différence que 
l'on saisi en paramètre les catégories et les parents pour éviter de répéter le code.
Il faut faire une boucle pour aller chercher 7 films. J'aurais voulu faire une boucle (while <= 7),
car sur la première page il n'y a que 5 films. A ce jour je n'ai pas encore réussi.
Donc je me suis débrouillé comme j'ai pu, mais je récupère 10 films pour le moment.
J'ai essayé de simplifier les choses un maximum.
 */

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
 * @param {str} movieUrl 
 * @param {str} carousel 
 */
const getCarouselInformationMovie = async function (movieUrl, carousel) {
        const response = await fetch(movieUrl)
        let data = await response.json()
        let picture = document.createElement('img');
        let title = document.createElement('h4');
        picture.id = data.id;     
        picture.className = `item modal-trigger`;
        picture.src = data.image_url;
        title.className = `title_movie`
        title.textContent = data.title;
        carousel.appendChild(picture);
        carousel.appendChild(title);
 }
/**
 * Je boucle sur les fonctions de récupération d'images et les ajoute au carousel.
 * Je dois en avoir 7 alors que j'en ai 10. Je sais pourquoi mais je n'ai pas encore trouver la solution.
 * Pour faire le carousel il faudrait que je puisse donner un index à chaque image, maiss tel que la boucle est faite ça ne veux pas.
 * Dois-je faire les items en dure?
 * @param {str} idParent 
 * @param {str} getCategorie 
 */
async function getMovieCategorie(idParent, getCategorie, categorieName) {
    const carousel = document.querySelector(`.carousel_box__${idParent}`)
    getCategortieTitle(idParent, categorieName)
    try {
        for(let f = 1; f < 3; f++) {
            const response = await fetch(APIUrl + getCategorie + `&page=${f}`)
            let data = await response.json()
            for(i = 0; i < 5; i++) {
                movieURL = data.results[i].url
                getCarouselInformationMovie(movieURL, carousel)
            }
        }        
    } catch(error) {
        console.log(error)
    }
}

/**
 * J'aurai voulu éviter le troisième paramètre en car le nom à attribuer existe dans le deuxième.
 * J'ai essayé avec un replace ou un split mais je n'ai pas réussi.
 */
getMovieCategorie(`top_rated`, `?imdb_score_min=9&imdb_score_max=10`, `Top rated`)
getMovieCategorie(`first_categorie`, `?genre=Comedy&sort_by=-imdb_score`, `Comedy`)
getMovieCategorie(`second_categorie`, `?genre=Animation&sort_by=-imdb_score`, `Animation`)
getMovieCategorie(`third_categorie`, `?genre=Sport&sort_by=-imdb_score`, `Sport`)

////////////////////////////////
// TRY CATEGORIE FOR 7 MOVIES //
////////////////////////////////
/**
 * J'ai essayé de faire en sorte de n'avoir que 7 films qui ressortent mais je n'ai pass réussit.
 * J'avoue ne pas m'y être pllus approfondie que ça pour avoir le temps de paasser au slide du carousel.
 */

// const getMovieCategorie = async function (idParent, categorieName) {
//     const carousel = document.querySelector(`.carousel_box__${idParent}`)
//     getCategortieTitle(idParent, categorieName)
//     let page = 1
//     try {
//         for (let i = 0; i < 7; i++) {
//             const response = await fetch(APIUrl + `?genre=${categorieName}&sort_by=-imdb_score&page=${page}`)
//             let data = await response.json()
//             movieURL = data.results[i].url
//             getCarouselInformationMovie(movieURL, carousel)
//             if(i = 5) {
//                 page++
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
// getMovieCategorie(`first_categorie`, `Comedy`)


///////////////////
// MODAL WINDOWS //
///////////////////
/**
La modal s'ouvre avec toutes les informations nécessaires en passant en paramètre l'url du films.
Comme je te l'expliquais jeudi, quand les boxes sont en dure dans le fichier HTML,
il n'y a pas de soucis au moment du click mais pas depuis le fichier JS. Quoi qu'il arrive au moment du click, 
je dois récuperer l'URL ou ID et la passer en paramètre dans la fonction (getModalBox).
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

modalTriggers.forEach((trigger) =>
trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
    modalContainer.classList.toggle("active")
}

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
getModalBox(APIUrl+'1508669')

//////////////
// CAROUSEL //
//////////////
/**
Le scroll ne marche pas comme j'aimerais, mais il à le mérite de faire le job
Je n'aime pas faire quelque chose qui n'est pas propre, donc je te montrerais jeudi et on en parlera.
*/
/// TOP RATED
const nextTopRated = document.querySelector(`.next__top_rated`);
    nextTopRated.addEventListener('click', () => {
    document.querySelector(`.carousel_box__top_rated`).scrollLeft +=180;
})
const previewTopRated = document.querySelector(`.preview__top_rated`);
    previewTopRated.addEventListener('click', () => {
    document.querySelector(`.carousel_box__top_rated`).scrollLeft -=180;
})

/// FIRST CATEGORIE
const nextFirstCategorie = document.querySelector(`.next__first_categorie`);
nextFirstCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__first_categorie`).scrollLeft +=180;
})
const previewFirstCategorie = document.querySelector(`.preview__first_categorie`);
    previewFirstCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__first_categorie`).scrollLeft -=180;
})

/// SECONDE CATEGORIE
const nextSecondCategorie = document.querySelector(`.next__second_categorie`);
    nextSecondCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__second_categorie`).scrollLeft +=180;
})
const previewSecondCategorie = document.querySelector(`.preview__second_categorie`);
    previewSecondCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__second_categorie`).scrollLeft -=180;
})

/// THIRD CATEGORIE
const nextThirdCategorie = document.querySelector(`.next__third_categorie`);
    nextThirdCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__third_categorie`).scrollLeft +=180;
})
const previewThirdCategorie = document.querySelector(`.preview__third_categorie`);
    previewThirdCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__third_categorie`).scrollLeft -=180;
})

//////////////////////
// CAROUSEL VANILLA //
//////////////////////
/**
Comme tu le sais la version au dessus fonctionne mais elle sacade, ce qui fait que je ne trouve pas ça correct.
J'ai fait la version ci-dessous, elle ne fonctionne pas mais ça me parait plus dans ce que je veux faire. 
*/

// const carousel = document.querySelector('.carousel');
// const carouselBox = document.querySelector('.carousel_box');
// const img = document.querySelectorAll('.img');
// let arrayOfSlides = Array.prototype.slice.call(img);
// let carouselDisplaying;
// let screenSize;
// setScreenSize();
// let lengthOfimg;

// function addClone() {
//     let lastSlide = carouselBox.lastElementChild.cloneNode(true);
//     lastSlide.style.left = (-lengthOfSlide) + "px";
//     carouselBox.insertBefore(lastSlide, carouselBox.firstChild);
// }

// function removeClone() {
//   let firstSlide = carouselBox.firstElementChild;
//   firstSlide.parentNode.removeChild(firstSlide);
// }

// function moveSlidesRight() {
//   let img = document.querySelectorAll('.img');
//   let slidesArray = Array.prototype.slice.call(img);
//   let width = 0;

//   slidesArray.forEach(function(el, i){
//     el.style.left = width + "px";
//     width += lengthOfSlide;
//   });
//   addClone();
// }
// moveSlidesRight();

// function moveSlidesLeft() {
//   let img = document.querySelectorAll('.img');
//   let slidesArray = Array.prototype.slice.call(img);
//   slidesArray = slidesArray.reverse();
//   let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

//   slidesArray.forEach(function(el, i){
//     maxWidth -= lengthOfSlide;
//     el.style.left = maxWidth + "px";
//   });
// }

// window.addEventListener('resize', setScreenSize);

// function setScreenSize() {
//   if ( window.innerWidth >= 500 ) {
//     carouselDisplaying = 3;
//   } else if ( window.innerWidth >= 300 ) {
//     carouselDisplaying = 2;
//   } else {
//     carouselDisplaying = 1;
//   }
//   getScreenSize();
// }

// function getScreenSize() {
//   let img = document.querySelectorAll('.img');
//   let slidesArray = Array.prototype.slice.call(img);
//   lengthOfSlide = ( carousel.offsetWidth  / carouselDisplaying );
//   let initialWidth = -lengthOfSlide;
//   slidesArray.forEach(function(el) {
//     el.style.width = lengthOfSlide + "px";
//     el.style.left = initialWidth + "px";
//     initialWidth += lengthOfSlide;
//   });
// }


// let rightNav = document.querySelector('.next');
// rightNav.addEventListener('click', moveLeft);

// let moving = true;
// function moveRight() {
//   if ( moving ) {
//     moving = false;
//     let lastSlide = carouselBox.lastElementChild;
//     lastSlide.parentNode.removeChild(lastSlide);
//     carouselBox.insertBefore(lastSlide, carouselBox.firstChild);
//     removeClone();
//     let firstSlide = carouselBox.firstElementChild;
//     firstSlide.addEventListener('transitionend', activateAgain);
//     moveSlidesRight();
//   }
// }

// function activateAgain() {
//   let firstSlide = carouselBox.firstElementChild;
//   moving = true;
//   firstSlide.removeEventListener('transitionend', activateAgain);
// }

// let leftNav = document.querySelector('.preview');
// leftNav.addEventListener('click', moveRight);

// function moveLeft() {
//   if ( moving ) {
//     moving = false;
//     removeClone();
//     let firstSlide = carouselBox.firstElementChild;
//     firstSlide.addEventListener('transitionend', replaceToEnd);
//     moveSlidesLeft();
//   }
// }

// function replaceToEnd() {
//   let firstSlide = carouselBox.firstElementChild;
//   firstSlide.parentNode.removeChild(firstSlide);
//   carouselBox.appendChild(firstSlide);
//   firstSlide.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
//   addClone();
//   moving = true;
//   firstSlide.removeEventListener('transitionend', replaceToEnd);
// }