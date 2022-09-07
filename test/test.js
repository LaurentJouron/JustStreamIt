const APIUrl = `http://localhost:8000/api/v1/titles/?`

function createElementWithBaliseIdAndClassName(idParent, balise, className){
    let element = document.createElement(balise);
    element.className = className;
    idParent.appendChild(element);
}

function createModalElement(idParent){
    let modal = document.getElementById(`modal`)
    createElementWithBaliseIdAndClassName(modal, `button`, `close-modal modal-trigger`)
    createElementWithBaliseIdAndClassName(modal, `img`, `modal_picture modal_picture__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `h1`, `modal_title modal_title__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_description modal_description__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_actors modal_actors__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_directors modal_directors__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_duration modal_duration__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_rated modal_rated__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_score modal_score__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_date_published modal_date_published__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_genres modal_genres__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_origine_countries modal_origine_countries__${idParent}` )
    createElementWithBaliseIdAndClassName(modal, `p`, `modal_results_of_box_office modal_results_of_box_office__${idParent}` )
}
function getValueToModalElement(data) {
    const closeButton = document.querySelector(`.close-modal`);
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

    closeButton.textContent = `X`
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
    // getModalResultsOfBoxOffice.textContent = "Box Office: " + data.;
}

async function getBestMovie(idParent) {
    try {
        const response = await fetch(APIUrl+`sort_by=-imdb_score`)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
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
                        
                        createModalElement(idParent)
                        getValueToModalElement(data)                        
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


async function getMovieCategorie(idParent, getCategorie, categorieName) {
    const carousel = document.querySelector(`.carousel__${idParent}`)
    try {
        const response = await fetch(APIUrl+getCategorie)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
                const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`)
                getCategortieTitle.textContent = categorieName
                    for(let i = 0; i < 5; i++) {
                        movieURL = data.results[i].url
                        {fetch(movieURL)
                            .then(response => {if (response.ok) {response.json()
                                .then(data => {
                                    let picture = document.createElement('img');
                                    picture.id = data.id;     
                                    picture.className = 'item modal-trigger';
                                    picture.alt = data.title;
                                    picture.src = data.image_url;
                                    carousel.appendChild(picture);

                                })
                            }})
                        }
                    }
                    let nextPage = data.next
                    {fetch(nextPage)
                        .then(response => {if(response.ok) {response.json()
                            .then(data => {
                                /// We read about the first 2 films of the package
                                for(i = 0; i < 2; i++) {
                                    movieURL = data.results[i].url
                                    {fetch(movieURL)
                                    .then(response => {if (response.ok) response.json()
                                    .then(data => {
                                        picture = document.createElement('img');
                                        picture.id = data.id;     
                                        picture.className = 'item modal-trigger';
                                        picture.alt = data.title;
                                        picture.src = data.image_url;
                                        carousel.appendChild(picture); 
                                        })
                                    })
                                }}
                            })

                        }})
                    }
                }
            )
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

//////////////
// CAROUSEL //
//////////////

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


////////////////
// BEST MOVIE //
////////////////
getBestMovie(`best_movie`)

/////////////////////
// CATEGORIE MOVIE //
/////////////////////

/// Appel de la fonction Fecth pour les films les mieux notés et attribution de la fonction de rotation aux boutons
getMovieCategorie(`top_rated`, `imdb_score_min=9&imdb_score_max=10`, `Top rated`)
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
getMovieCategorie(`first_categorie`, `genre=Comedy&sort_by=-imdb_score`, `Comedy`)
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
getMovieCategorie(`second_categorie`, `genre=Animation&sort_by=-imdb_score`, `Animation`)
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
getMovieCategorie(`third_categorie`, `genre=Sport&sort_by=-imdb_score`, `Sport`)
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

///////////////////
// MODAL WINDOWS //
///////////////////
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
     modalContainer.classList.toggle("active")
}
