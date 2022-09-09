// Les demandes du client sont:
// Visualisation en temps réel des films (fait).
// Maquette à réaliser selon une image (fait) * voir à mettre les flèches de direction sur le côté si indispensable.
// 4 films visible et le reste en carousel (à faire).
// Récuperer les films sur une API selon la méthode AJAX afficher sur une page web (fait).
// 1 film qui représente le meilleur toute catégorie confondue. En haut, de la page il y l'image, le titre, un bouton pour ouvrir la modal et le résumé (fait).
// 1 catégorie des films les mieux noté (fait).
// 3 catégorie au choix (fait).
// Si on clique sur n'importe quel film, la modal s'ouvre avec les infos du film dessus. Modal (faite), ouverture depuis n'importe quel films (à faire).
//      - L’image de la pochette du film
//      - Le Titre du film
//      - Le genre complet du film
//      - Sa date de sortie
//      - Son Rated
//      - Son score Imdb
//      - Son réalisateur
//      - La liste des acteurs
//      - Sa durée
//      - Le pays d’origine
//      - Le résultat au Box Office
//      - Le résumé du film
// Bouton de fermeture sur la modal (fait).
// Utiliser Vanilla pour gérer les évènements (à voir).


const APIUrl = `http://localhost:8000/api/v1/titles/`

////////////////
// BEST MOVIE //
////////////////
// Toutes les informations ne se trouvent pas sur la première page, mais en allant chercher sue une page précise qui correspond à un film en particulier.
// deux solutions:
//      - récupération du lien vers cette seconde page depuis la première (solution la plus simple que j'ai prise).
//      - construction de l'URL car le lien est l'APIUrl + ID du film.
// Ce qui représente un premier Fetch pour récuperer la première URL et un deuxième pour avoir toutes les infos demandés.
// Pour le premier film, j'ai saisi le meilleur film en dur (`?sort_by=-imdb_score`) associé à l'APIUrl.
async function getBestMovie(idParent) {
    try {
        const response = await fetch(APIUrl+`?sort_by=-imdb_score`)
        if (response.ok) {response.json()
            .then(data => {
                movieURL = data.results[0].url
                {fetch(movieURL)
                    .then(response => {if(response.ok) {response.json()
                    .then(data => {
                        const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
                        const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
                        const getMovieDescription = document.querySelector(`.movie_description__${idParent}`)

                        getMovieTitle.textContent = data.title;
                        getMoviePicture.src = data.image_url;
                        getMovieDescription.textContent = data.description
                        movieURL = data.url             
                    })
                }})}
            }) 
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

getBestMovie(`best_movie`)


/////////////////////
// CATEGORIE MOVIE //
/////////////////////
// La solution pour récupérer les infomations nécessaire est la même que ci-dessus, à la différence que 
// l'on saisi en paramètres les catégories et les parents pour éviter la répétition du code.
// Nous avons besoin de toutes les infos pour la modal. En tout cas c'est ce que je voulais faire au début. 
// A ce stade ce n'est plus nécéssaire, car comme vu plus haut, nous pouvons construire l'URL. (A voir ensemble)
// Il y a une boucle pour aller chercher 7 films. J'aurais voulu faire une boucle (while < 7), car sur la première page il n'y a que 5 films.
// Je n'ai pas réussi à le faire donc je me suis débrouillé comme j'ai pu. Ca marche même si ce n'est pas le top.
// Toutefois, selon la discussion que nous avons eu jeudi, je vais essayer de simplifier les choses.
// Idéalement et avec du recule, j'aurais fait des petites fonctions pour une lecture du code plus simple.
// Je me suis déjà demandé s'il fallait le faire ou pas mais ça me demanderait de refaire quasiment tout le code.

const getCategortieTitle = async function(idParent, categorieName) {
    const categorieTitle = document.querySelector(`.categorie_title__${idParent}`)
    categorieTitle.textContent = categorieName
}
const getCarouselInformationMovie = async function (movieUrl, carousel) {
        const response = await fetch(movieUrl)
        let data = await response.json()
        console.log(data)
        let picture = document.createElement('img');
        picture.id = data.id;     
        picture.className = 'item modal-trigger';
        picture.alt = data.title;
        picture.src = data.image_url;
        carousel.appendChild(picture);
 }

async function getMovieCategorie(idParent, getCategorie) {
    const carousel = document.querySelector(`.carousel__${idParent}`)
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

getMovieCategorie(`top_rated`, `?imdb_score_min=9&imdb_score_max=10`)
getCategortieTitle(`top_rated`, `Top rated`)

getMovieCategorie(`first_categorie`, `?genre=Comedy&sort_by=-imdb_score`)
getCategortieTitle(`first_categorie`, `Comedy`)

getMovieCategorie(`second_categorie`, `?genre=Animation&sort_by=-imdb_score`)
getCategortieTitle(`second_categorie`, `Animation`)

getMovieCategorie(`third_categorie`, `?genre=Sport&sort_by=-imdb_score`)
getCategortieTitle(`third_categorie`, `Sport`)

///////////////////
// MODAL WINDOWS //
///////////////////
// La modal s'ouvre avec toutes les informations nécessaires en passant en paramètre l'url du films.
// Comme je te l'expliquais jeudi, quand les bosens sont en dure dans le fichier HTML , il n'y a pas de soucis au moment du click, 
// mais pas en création depuis le fichier JS. Quoi qu'il arrive au moment du click, je dois récuperer l'URL ou ID et la passer en paramètre dans la fonction (getModalBox).


// const modalContainer = document.querySelector(".modal-container");
// const modalTriggers = document.querySelectorAll(".modal-trigger");

// modalTriggers.forEach((trigger) =>
// trigger.addEventListener("click", toggleModal)
// )

// function toggleModal() {
//     modalContainer.classList.toggle("active")
// }

// async function getModalBox(movieURL) {
//     try {
//         const response = await fetch(movieURL)
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`)
//         }
//         if (response.ok) {response.json()
//             .then(data => {
//                 getModalPicture.src = data.image_url;
//                 getModalTitle.textContent = "Title: " + data.title;
//                 getModalDescription.textContent = "Description: " + data.description;
//                 getModalActors.textContent = "Actors: " + data.actors;
//                 getModalDirectors.textContent = "Directors: " + data.directors;
//                 getModalDuration.textContent = "Duration: " + data.duration + " min";
//                 getModalRated.textcontent = "Rated: " + data.rated;
//                 getModalScore.textContent = "Score: " + data.imdb_score;
//                 getModalDatePublished.textContent = "Date published: " + data.date_published;
//                 getModalGenres.textContent = "Genres: " + data.genres;
//                 getModalOrigineCountries.textContent = "Countrie: " + data.countries;
//                 // getModalResultsOfBoxOffice.textContent = "Box Office: " + data.;  
//             })
//             } else {
//                 console.error('Retour du serveur : ', response.status)
//             }
//         } catch(error) {
//             errorMsg.textContent = `${error}`
//     }
// }
// getModalBox(APIUrl+'1508669')

//////////////////////
// CAROUSEL VANILLA //
//////////////////////
// const carousel = document.querySelector('.carousel');
// const carouselContent = document.querySelector('.carousel-content');
// const img = document.querySelectorAll('.img');
// let arrayOfSlides = Array.prototype.slice.call(img);
// let carouselDisplaying;
// let screenSize;
// setScreenSize();
// let lengthOfimg;

// function addClone() {
//     let lastSlide = carouselContent.lastElementChild.cloneNode(true);
//     lastSlide.style.left = (-lengthOfSlide) + "px";
//     carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
// }

// function removeClone() {
//   let firstSlide = carouselContent.firstElementChild;
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
//     let lastSlide = carouselContent.lastElementChild;
//     lastSlide.parentNode.removeChild(lastSlide);
//     carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
//     removeClone();
//     let firstSlide = carouselContent.firstElementChild;
//     firstSlide.addEventListener('transitionend', activateAgain);
//     moveSlidesRight();
//   }
// }

// function activateAgain() {
//   let firstSlide = carouselContent.firstElementChild;
//   moving = true;
//   firstSlide.removeEventListener('transitionend', activateAgain);
// }

// let leftNav = document.querySelector('.preview');
// leftNav.addEventListener('click', moveRight);

// function moveLeft() {
//   if ( moving ) {
//     moving = false;
//     removeClone();
//     let firstSlide = carouselContent.firstElementChild;
//     firstSlide.addEventListener('transitionend', replaceToEnd);
//     moveSlidesLeft();
//   }
// }

// function replaceToEnd() {
//   let firstSlide = carouselContent.firstElementChild;
//   firstSlide.parentNode.removeChild(firstSlide);
//   carouselContent.appendChild(firstSlide);
//   firstSlide.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
//   addClone();
//   moving = true;
//   firstSlide.removeEventListener('transitionend', replaceToEnd);
// }

////////////////////////
// CAROUSEL EN MANEGE //
////////////////////////
// let angle = 0;
// function picturesGallery(sign, idParent) { 
//     spinner = document.querySelector(`.spinner__${idParent}`);
//     if (!sign) { angle = angle + 51.428 
//     } else { 
//         angle = angle - 51.428
//     }
//     spinner.setAttribute(`style`,`-webkit-transform: rotateY(${angle}deg)`); 
//         `-moz-transform: rotateY(${angle}deg)`; 
//         `transform: rotateY(${angle}deg)`;
// }

// const previewTopRated = document.querySelector(`.preview__top_rated`);
// previewTopRated.addEventListener('click', () => {
//     previewTopRated.querySelector(`.preview__top_rated`)
//     picturesGallery('', 'top_rated')
// })


// const nextTopRated = document.querySelector(`.next__top_rated`);
// nextTopRated.addEventListener('click', () => {
//     nextTopRated.querySelector(`.next__top_rated`)
//     picturesGallery(`-`, `top_rated`)
// })


/////////////////////////////
// CAROUSEL TEST GRAFIKART //
/////////////////////////////
// class Carousel {
//     constructor (element, options = {}) {
//         this.element = element
//         this.options = object.assign({}, {
//             slidesToScroll: 4,
//             slidesToVisible: 3,
//             loop: false
//         }, options)
        
//         let children = [].slice.call(element.children)
//         this.currentItem = 0
//         this.root = this.createDivWithClass('carousel')
//         this.container = this.createDivWithClass('carousel__panorama')
//         this.root.appendChild(this.container)
//         this.element.appendChild(this.root)
//         this.moveCallBacks = []
//         this.items = children.map((child) => {
//             let item = this.createDivWithClass('carousel__panorama--item')
//             item.appendChild(child)
//             this.container.appendChild(item)
//             return item
//         })
//         this.setStyle()
//         this.createNavigation()
//         this.moveCallBacks.forEach(callBack => callBack(0))
//     }

//     setStyle () {
//         let ratio = this.items.length / this.options.slidesToVisible
//         this.container.style.width = (ratio * 100) + "%"
//         this.items.forEach(item => item.style.width = ((100 / this.options.slidesToVisible) / ratio) + "%")   
//     }

//     createNavigation() {
//         let nextButton = this.createDivWithClass('carousel__next')
//         let prevButton = this.createDivWithClass('carousel__prev')
//         this.root.appendChild(nextButton)
//         this.root.appendChild(prevButton)
//         nextButton.addEventListener('click', this.next.bind(this))
//         prevButton.addEventListener('click', this.prev.bind(this))
        
//         this.onMove(index => {
//             if(index === 0) {
//                 prevButton.classList.add('carousel__prev--hidden')
//             } else {
//                 prevButton.classList.remove('carousel__prev--hidden')
//             }
//             if (this.item[this.currentItem + this.options.slidesToVisible] === undefined){
//                 nextButton.classList.add('carousel__next--hidden')
//             } else {
//                 nextButton.classList.add('carousel__next--hidden')
//             }
//         })
//     }

//     next () {
//         this.gotToItem(this.currentItem + this.options.slidesToScroll)

//     }

//     prev () {
//         this.gotToItem(this.currentItem - this.options.slidesToScroll)
//     }

//     gotToItem(index) {
//         if (index < 0) {
//             index = this.items.length - this.options.visible
//         } else if (index >= this.items.length || this.item[this.currentItem + this.options.slidesToVisible] === undefined) {
//             index = 0
//         }

//         let translateX = index * 100 / this.items.length
//         this.container.style.transfom = 'translate3d(' + translateX + ' %, 0, 0)'
//         this.currentItem = index
//         this.moveCallBacks.forEach(callBack => callBack(index))
//     }

//     onMove(callBack) {
//         this.moveCallBacks.push(callBack)
//     }

//     createDivWithClass (className) {
//         let div = document.createElement('div')
//         div.setAttribute('class', className)
//         return div
//     }
// }
    
// document.addEventListener('DOMContentLoaded', function () {
//     new Carousel(document.querySelector('.top_rated'), {
//         slidesToScroll: 3,
//         slidesToVisible: 4,
//         loop: false
//     })

//     new Carousel(document.querySelector('.first_categorie'), {
//         slidesToScroll: 3,
//         slidesToVisible: 4,
//         loop: false
//     })
//     new Carousel(document.querySelector('.second_categorie'), {
//         slidesToScroll: 3,
//         slidesToVisible: 4,
//         loop: false
//     })
//     new Carousel(document.querySelector('.third_categorie'), {
//         slidesToScroll: 3,
//         slidesToVisible: 4,
//         loop: false
//     })
// })
