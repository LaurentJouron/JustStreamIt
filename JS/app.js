//////////////////////////
// VARIABLE DECLARATION //
//////////////////////////

// API URL
const APIUrl = `http://localhost:8000/api/v1/titles/`

/// BEST MOVIE
const getMoviePicture = document.querySelector(`.movie_picture__best_movie`)
const getMovieTitle = document.querySelector(`.movie_title__best_movie`)
const getMovieDescription = document.querySelector(`.movie_description__best_movie`)

/// SLIDE CAROUSEL
// Top rated
const nextTopRated = document.querySelector(`.next__top_rated`);
const previewTopRated = document.querySelector(`.preview__top_rated`);

// First categorie
const nextFirstCategorie = document.querySelector(`.next__first_categorie`);
const previewFirstCategorie = document.querySelector(`.preview__first_categorie`);

// Second categorie
const nextSecondCategorie = document.querySelector(`.next__second_categorie`);
const previewSecondCategorie = document.querySelector(`.preview__second_categorie`);

// Third categorie
const nextThirdCategorie = document.querySelector(`.next__third_categorie`);
const previewThirdCategorie = document.querySelector(`.preview__third_categorie`);

/// MODAL WINDOWS
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

/////////////////////////
// BEST MOVIE FUNCTION //
/////////////////////////

/**
    In order to get the best API movie, I pass the API search url in hard, which I 
    returns the exact URL of the movie. This URL is used to load the requested information into the page header.
    The complete information is not on the first page.
 */
const getBestMovie = async function () {
    try {
        const response = await fetch(APIUrl + `?sort_by=-imdb_score`)
        let data = await response.json()
        movieURL = data.results[0].url
        getBestMovieInformation(movieURL)
    } catch(error) {
        console.log(error)
    }
}

/**
    Setting the URL of a movie to get the info 
    and assign them to the HTML tags of the best movie.
    @param {HTMLElement} movieUrl 
 */
const getBestMovieInformation = async function(movieUrl){
    const response = await fetch(movieUrl)
    let data = await response.json()

    getMovieTitle.textContent = data.title;
    getMoviePicture.src = data.image_url;
    getMovieDescription.textContent = data.description
    getModalBox(movieUrl)
}

/////////////////////
// CATEGORIE MOVIE //
/////////////////////

/**
    By passing the name of the category and the ID of its parent, 
    each category is assigned titles.
    This function is called in image search to be consistent in naming.
    @param {str} idParent 
    @param {str} categorieName 
 */
const getCategortieTitle = async function(idParent, categorieName) {
    const categorieTitle = document.querySelector(`.categorie_title__${idParent}`)
    categorieTitle.textContent = categorieName
}

/**
    This function is used to feed the carousel images.
    It uses the getCategorieTitle function to assign category titles at the same time.
    It also uses the getModalBox and toggleModal functions that load all the information
    and makes it visible by clicking on it.
    @param {HTMLElement} movieUrl 
    @param {str} carousel 
 */
const getCarouselInformationMovie = async function (movieUrl, carousel) {
    const response = await fetch(movieUrl)
    let data = await response.json()
    let image = new Image(); 
    image.className = `item`;
    image.src = data.image_url;
    image.addEventListener(`click`, function(){
        getModalBox(movieUrl)
        toggleModal()
    })
    carousel.appendChild(image);
 }

/**
    It is the age center of filling categories. It is function appeals to others, 
    because it is thanks to it that we will get the URL of each film
    and by looping on these functions, we attribute the images, and titles to the site.
    @param {str} idParent 
    @param {str} getCategorie
    @param {str} categorieName
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

///////////////////
// MODAL WINDOWS //
///////////////////

/**
    By default, the window is invisible. To make it visible you must make it active with the toggleModal function.
    By setting the URL of a movie, we get all the information that is requested.
    @param {HTMLElement} movieURL
*/
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

/**
    For all elements that are defined, when you click on it activates 
    the window and makes it active and therefore visible.
    @param {HTMLElement} trigger
*/
modalTriggers.forEach((trigger) =>
trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
    modalContainer.classList.toggle("active")
}

/////////////////
// SLIDE IMAGE //
/////////////////

/**
    The carousel of all categories work in the same way, 
    When you click, it scroll to in the direction indicated.
 */

// TOP RATED
nextTopRated.addEventListener('click', () => {
    document.querySelector(`.carousel_box__top_rated`).scrollLeft += 180;
})
previewTopRated.addEventListener('click', () => {
    document.querySelector(`.carousel_box__top_rated`).scrollLeft -= 180;
})

// FIRST CATEGORIE
nextFirstCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__first_categorie`).scrollLeft += 180;
})
previewFirstCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__first_categorie`).scrollLeft -= 180;
})

// SECOND CATEGORIE
nextSecondCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__second_categorie`).scrollLeft += 180;
})
previewSecondCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__second_categorie`).scrollLeft -= 180;
})

// THIRD CATEGORIE
nextThirdCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__third_categorie`).scrollLeft += 180;
})
previewThirdCategorie.addEventListener('click', () => {
    document.querySelector(`.carousel_box__third_categorie`).scrollLeft -= 180;
})

///////////////////
// CALL FUNCTION //
///////////////////

// Best movie
getBestMovie(`best_movie`)

// Top rated
getMovieCategorie(`top_rated`, `?imdb_score_min=9&imdb_score_max=10`, `Top rated`)

// First categorie
getMovieCategorie(`first_categorie`, `?genre=Comedy&sort_by=-imdb_score`, `Comedy`)

// Second categorie
getMovieCategorie(`second_categorie`, `?genre=Animation&sort_by=-imdb_score`, `Animation`)

// Third categorie
getMovieCategorie(`third_categorie`, `?genre=Sport&sort_by=-imdb_score`, `Sport`)
