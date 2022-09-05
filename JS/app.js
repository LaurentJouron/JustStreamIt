const APIUrl = `http://localhost:8000/api/v1/titles/?`

function createElementWithBaliseIdAndClassName(idParent, balise, nameId, className){
    let element = document.createElement(balise);
    element.id = nameId
    element.className = className;
    idParent.appendChild(element);
}
function createModalElement(idParent){
    let modal = document.getElementById(`modal`)
    createElementWithBaliseIdAndClassName(modal, `img`, `modal`, `modal_picture modal_picture__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `h1`, `modal_title`, `modal_title modal_title__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_genres`, `modal_genres modal_genres__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_date_published`, `modal_date_published modal_date_published__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_rated`, `modal_rated modal_rated__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_score`, `modal_score modal_score__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_directors`, `modal_directors modal_directors__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_actors`, `modal_actors modal_actors__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_duration`, `modal_duration modal_duration__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_origine_countries`, `modal_origine_countries modal_origine_countries__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_results_of_box_office`, `modal_results_of_box_office modal_results_of_box_office__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_description`, `modal_description modal_description__${idParent}` )
}

function getValueAndAttributeInModalWindow(data) {
    const getMoviePicture = document.querySelector(`.modal_picture`);
    const getMovieTitle = document.querySelector(`.modal_title`);
    const getMovieGenres = document.querySelector(`.modal_genres`);
    const getMovieDatePublished = document.querySelector(`.modal_date_published`);
    const getMovieRated = document.querySelector(`.movie_rated`);
    const getMovieScore = document.querySelector(`.movie_score`);
    const getMovieDirectors = document.querySelector(`.movie_directors`);
    const getMovieActors = document.querySelector(`.movie_actors`);
    const getMovieDuration = document.querySelector(`.movie_duration`);
    const getMovieOrigineCountries = document.querySelector(`.movie_origine_countries`);
    const getMovieResultsOfBoxOffice = document.querySelector(`.movie_results_of_box_office`);
    const getMovieDescription = document.querySelector(`.movie_description`);

    getMoviePicture.src = data.results[0].image_url
    getMovieTitle.textContent = "Title: " + data.results[0].title;
    getMovieGenres.textContent = "Genres: " + data.results[0].genres;
    getMovieDatePublished.textContent = "Date published: " + data.results[0].date_published;
    getMovieRated.textcontent = "Rated: " + data.results[0].rated;
    getMovieScore.textContent = "Score: " + data.results[0].imdb_score;
    getMovieDirectors.textContent = "Directors: " + data.results[0].directors;
    getMovieActors.textContent = "Actors: " + data.results[0].actors;
    getMovieDuration.textContent = "Duration: " + data.results[0].duration + " min";
    getMovieOrigineCountries.textContent = "Countrie: " + data.results[0].countries;
    // getMovieResultsOfBoxOffice.textContent = "Box Office: " + data.results[0].;
    getMovieDescription.textContent = "Description: " + data.results[0].description;
}

/// Fecth qui fonctionne selon moi. Il me semble très chargée mais fonctionnelle.
async function getMovie(idParent, getCategorie) {
    const spinner = document.querySelector(`.spinner__${idParent}`)
    try {
        const response = await fetch(APIUrl+getCategorie)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
/// Remplissage du meilleure film (en haut)
                if (idParent === `best_movie`) {
                    const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
                    const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
                    getMovieTitle.textContent = data.results[0].title;
                    getMoviePicture.src = data.results[0].image_url;
                    createModalElement(idParent)
                    getValueAndAttributeInModalWindow(data);
                    
                } else {
/// Condition pour nommer la première catégorie
                    const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`)
                    if (idParent === `top_rated`) {
                        getCategortieTitle.textContent = `Top rated`
                     } else if (idParent === `first_categorie`) {
                        getCategortieTitle.textContent = `Comedy`
                    } else if (idParent === `second_categorie`){
                        getCategortieTitle.textContent = `Animation`
                    }  else if (idParent === `third_categorie`){
                        getCategortieTitle.textContent = `Sport`
                    }
                    /// We read about the five films in the package
                    for(let i = 0; i < 5; i++) {
                        let picture = document.createElement('img');
                        picture.id = data.results[i].id;     
                        picture.className = 'spinner--item modal-trigger';
                        picture.alt = data.results[i].title;
                        picture.src = data.results[i].image_url;
                        spinner.appendChild(picture);
                    }
                    let nextPage = data.next
                    {fetch(nextPage)
                        .then(response => {if(response.ok) {response.json()
                            .then(data => {
                                /// We read about the first 2 films of the package
                                for(i = 0; i < 2; i++) {
                                    let picture = document.createElement('img');
                                    picture.id = data.results[i].id;     
                                    picture.className = 'spinner--item modal-trigger';
                                    picture.alt = data.results[i].title;
                                    picture.src = data.results[i].image_url;
                                    spinner.appendChild(picture);
                                }
                            })

                        }})
                    }
                }
            })
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

/// Fonction de rotation des images
let angle = 0;
function picturesGallery(sign, idParent) { 
    spinner = document.querySelector(`.spinner__${idParent}`);
    if (!sign) { angle = angle + 51.428 
    } else { 
        angle = angle - 51.428
    }
    spinner.setAttribute(`style`,`-webkit-transform: rotateY(${angle}deg)`); 
        `-moz-transform: rotateY(${angle}deg)`; 
        `transform: rotateY(${angle}deg)`;
}

/// Appel de la fonction Fecth pour le meilleur film
getMovie(`best_movie`, `sort_by=-imdb_score`)


/// Appel de la fonction Fecth pour les films les mieux notés et attribution de la fonction de rotation aux boutons
getMovie(`top_rated`, `imdb_score_min=9&imdb_score_max=10`)
const previewTopRated = document.querySelector(`.preview__top_rated`);
previewTopRated.addEventListener('click', () => {
    previewTopRated.querySelector(`.preview__top_rated`)
    picturesGallery('', 'top_rated')
    })


const nextTopRated = document.querySelector(`.next__top_rated`);
nextTopRated.addEventListener('click', () => {
    nextTopRated.querySelector(`.next__top_rated`)
    picturesGallery(`-`, `top_rated`)
    })


/// Appel de la fonction Fecth pour les films de la première catégorie et attribution de la fonction de rotation aux boutons
getMovie(`first_categorie`, `genre=Comedy&sort_by=-imdb_score`)
const previewFirstCategorie = document.querySelector(`.preview__first_categorie`);
previewFirstCategorie.addEventListener('click', () => {
    previewFirstCategorie.querySelector(`.preview__first_categorie`)
        picturesGallery('',`first_categorie`)
    })

const nextFirstCategorie = document.querySelector(`.next__first_categorie`);
nextFirstCategorie.addEventListener('click', () => {
    nextFirstCategorie.querySelector(`.next__first_categorie`)
        picturesGallery(`-`, `first_categorie`)
    })


/// Appel de la fonction Fecth pour les films de la seconde catégorie et attribution de la fonction de rotation aux boutons
getMovie(`second_categorie`, `genre=Animation&sort_by=-imdb_score`)
const previewSecondCategorie = document.querySelector(`.preview__second_categorie`);
previewSecondCategorie.addEventListener('click', () => {
    previewSecondCategorie.querySelector(`.preview__second_categorie`)
        picturesGallery('', `second_categorie`)
    })

const nextSecondCategorie = document.querySelector(`.next__second_categorie`);
nextSecondCategorie.addEventListener('click', () => {
    nextSecondCategorie.querySelector(`.next__second_categorie`)
        picturesGallery(`-`, `second_categorie`)
    })


/// Appel de la fonction Fecth pour les films de la troisième catégorie et attribution de la fonction de rotation aux boutons
getMovie(`third_categorie`, `genre=sport&sort_by=-imdb_score`)
const previewThirdCategorie = document.querySelector(`.preview__third_categorie`);
previewThirdCategorie.addEventListener('click', () => {
    previewThirdCategorie.querySelector(`.preview__third_categorie`)
        picturesGallery('', `third_categorie`)
    })

const nextThirdCategorie = document.querySelector(`.next__third_categorie`);
nextThirdCategorie.addEventListener('click', () => {
    nextThirdCategorie.querySelector(`.next__third_categorie`)
        picturesGallery(`-`, `third_categorie`)
    })

// ///////////////////
// // MODAL WINDOWS //
// ///////////////////
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
     modalContainer.classList.toggle("active")
}
