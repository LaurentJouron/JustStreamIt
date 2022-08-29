/**
 * Function that feeds the whole box at the top and represents the best film.
 * @param {ID from HTML file} idParent 
 * @param {Results from the fetch} data 
 */
 function bestMovie(idParent, data) {
    const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
    const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
    const playLink = document.querySelector(`play`)

    getMovieTitle.textContent = data.results[0].title
    getMoviePicture.src = data.results[0].image_url
// data.results[0].imdb_url
}

/**
 * This function allows to assign the title of each category, while assigning the name best rated first.
 * @param {ID from HTML file} idParent 
 * @param {Results from the fetch} data 
 */
function categorieTitle (idParent, data) {
    const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`)
    if (idParent === "top_rated") {
        getCategortieTitle.textContent = `Top rated`
     } else {
        getCategortieTitle.textContent = data.results[0].genres[0]
    }
}

/**
 * @param {querySelector} 
 * @param {string} 
 */
 function createDivWithClass (parentElement, className) {
    let div = document.createElement('div')
    div.className = className
    parentElement.appendChild(div)
}


async function getMovie(idParent, getCategorie) {
    const APIUrl = `http://localhost:8000/api/v1/titles/?`
    const slideParentElement = document.querySelector(`.slide__${idParent}`)
    const slideIndicators = document.querySelector(`.slide-indicators__${idParent}`)
    let item = 0
    let j = 1
    try {
        const response = await fetch(APIUrl+getCategorie+`&page=${j}`)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
                if (idParent === `best_movie`) {
                    bestMovie(idParent, data) 
                } else {
                    categorieTitle(idParent, data)
                    while (item <= 7) {

                        createDivWithClass(slideParentElement, `slide--banner`)

                        let picture = document.createElement('img')
                        picture.id = data.results[item].id
                        picture.className = 'slide--item modal-trigger'
                        picture.alt = data.results[item].title
                        picture.src = data.results[item].image_url
                        slideParentElement.appendChild(picture)
                        
                        createDivWithClass(slideIndicators, `slide-indicator`)

                        if (item === 4) {j++}
                        item++
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

const playButton = document.querySelector(".play");
    playButton.addEventListener('click', () => {
        playButton.getElementsByClassName("play");
        data.results[0].imdb_url
})

getMovie(`best_movie`, `sort_by=-imdb_score`)
getMovie(`top_rated`, `imdb_score_min=9&imdb_score_max=10`)
getMovie(`first_categorie`, `genre=Comedy`)
getMovie(`second_categorie`, `genre=Animation`)
getMovie(`third_categorie`, `genre=War`)




// ///////////////////
// // MODAL WINDOWS //
// ///////////////////

// // Modal windows
// const modalPicture = document.getElementById('modal_picture');
// const modalTitle = document.getElementById('modal_title');
// const modalGenres = document.getElementById('modal_genres');
// const modalDatePublished = document.getElementById('modal_date_published');
// const modalRated = document.getElementById('rated');
// const modalScore = document.getElementById('modal_score');
// const modalDirectors = document.getElementById('modal_directors');
// const modalActors = document.getElementById('modal_actors');
// const modalDuration = document.getElementById('modal_duration');
// const modalOrigineCountries = document.getElementById('modal_origine_countries');
// const modalResultsOfBoxOffice = document.getElementById('modal_results_of_box_office');
// const modalDescription = document.getElementById('modal_description');

// function modalWindows(modalRequest) {fetch(modalRequest)
//         .then(response => {if(response.ok) {response.json()
//         .then(data => {
//             modalPicture.src = data.image_url;
//             modalTitle.textContent = "Title: " + data.title;
//             modalGenres.textContent = "Genres: " + data.genres;
//             modalDatePublished.textContent = "Date published: " + data.date_published;
//             modalRated.textContent = "Rated: " + data.rated;
//             modalScore.textContent = "Score: " + data.imdb_score;
//             modalDirectors.textContent = "Directors: " + data.directors;
//             modalActors.textContent = "Actors: " + data.actors;
//             modalDuration.textContent = "Duration: " + data.duration + " min";
//             modalOrigineCountries.textContent = "Countrie: " + data.countries;
//             // modalResultsOfBoxOffice.textContent = "Box Office: " + data.;
//             modalDescription.textContent = "Description: " + data.description;
//         })
//         }
//     })
// }

// const modalContainer = document.querySelector(".modal-container");
// const modalTriggers = document.querySelectorAll(".modal-trigger");

// modalTriggers.forEach((trigger) =>
//     trigger.addEventListener("click", toggleModal)
// )

// function toggleModal() {
//      modalContainer.classList.toggle("active")
// }

