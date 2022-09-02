/// Fecth qui fonctionne selon moi. Il me semble très chargée mais fonctionnelle.
async function getMovie(idParent, getCategorie) {
    const APIUrl = `http://localhost:8000/api/v1/titles/?`
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
                    const getBestMovieModal = document.querySelector(`info`)
                    const playLink = document.querySelector(`play_link`)
                
                    getMovieTitle.textContent = data.results[0].title
                    getMoviePicture.src = data.results[0].image_url
                    // playLink = data.results[0].url
                    // getBestMovieModal =  data.results[0].imdb_url 

                } else {
/// Condition pour nommer la première catégorie
                    const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`)
 
                    if (idParent === "top_rated") {
                        getCategortieTitle.textContent = `Top rated`
                     } else {
                        getCategortieTitle.textContent = data.results[0].genres[0]
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

/// Bouton play sur lequel j'aimerais attribuer l'url du film
const playButton = document.querySelector(".play_link");
    playButton.addEventListener('click', () => {
        playButton.getElementsByClassName("play_link");
        data.results[0].imdb_url
    }
)

/// Fonction pour gérer les images.

// function previewItem(idParent) {
//     const preview = document.querySelector(`.preview__${idParent}`);
//     preview.addEventListener('click', () => {
//         preview.querySelector(`.preview__top_rated`)
//         picturesGallery('')
//     })
// }

// function nextItem(idParent) {
//     const next = document.querySelector(`.next__${idParent}`);
//         next.addEventListener('click', () => {
//             next.querySelector(`.next__top_rated`)
//             picturesGallery(`-`)
//     })
// }


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
getMovie(`first_categorie`, `genre=Comedy`)
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
getMovie(`second_categorie`, `genre=Animation`)
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
getMovie(`third_categorie`, `genre=War`)
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

// Modal windows
const modalPicture = document.getElementById('modal_picture');
const modalTitle = document.getElementById('modal_title');
const modalGenres = document.getElementById('modal_genres');
const modalDatePublished = document.getElementById('modal_date_published');
const modalRated = document.getElementById('rated');
const modalScore = document.getElementById('modal_score');
const modalDirectors = document.getElementById('modal_directors');
const modalActors = document.getElementById('modal_actors');
const modalDuration = document.getElementById('modal_duration');
const modalOrigineCountries = document.getElementById('modal_origine_countries');
const modalResultsOfBoxOffice = document.getElementById('modal_results_of_box_office');
const modalDescription = document.getElementById('modal_description');

function modalWindows(modalRequest) {fetch(modalRequest)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            modalPicture.src = data.image_url;
            modalTitle.textContent = "Title: " + data.title;
            modalGenres.textContent = "Genres: " + data.genres;
            modalDatePublished.textContent = "Date published: " + data.date_published;
            modalRated.textContent = "Rated: " + data.rated;
            modalScore.textContent = "Score: " + data.imdb_score;
            modalDirectors.textContent = "Directors: " + data.directors;
            modalActors.textContent = "Actors: " + data.actors;
            modalDuration.textContent = "Duration: " + data.duration + " min";
            modalOrigineCountries.textContent = "Countrie: " + data.countries;
            // modalResultsOfBoxOffice.textContent = "Box Office: " + data.;
            modalDescription.textContent = "Description: " + data.description;
        })
        }
    })
}

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
     modalContainer.classList.toggle("active")
}
