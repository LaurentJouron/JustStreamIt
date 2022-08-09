// Best movie boxe
const bestMoviePicture = document.querySelector('.best_movie--picture');
const bestMovieTitle = document.querySelector('.best_movie--title');

// Modal windows
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

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
const modalDescription = document.getElementById('modal_Description');

// Categorie boxes
const topRated = document.getElementById('top_rated')
const firstCategorie = document.getElementById('first_categorie')
const secondCategorie = document.getElementById('second_categorie')
const thirdCategorie = document.getElementById('third_categorie')

const containerListTitle = document.querySelector(".container_list--title");
const containerList = document.querySelector(".container_list");
const categorieTitle = document.querySelector(".categorie--title");

// Arrows direction
const containerPrevArrows = document.querySelector(".container--prev_arrows");
const containerNextArrows = document.querySelector(".container--next_arrows");

// Categorie movie presentation
fetch(`http://localhost:8000/api/v1/titles/8571428`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let moviePicture = data.image_url;
        let movieTitle = data.title;
        let movieGenre = data.genres;
        let movieDatePublished = data.date_published;
        // let movieRated = data.rated;
        let movieScore = data.imdb_score;
        let movieDirectors = data.directors;
        let movieActors = data.actors;
        // let movieDuration = data.duration;
        let movieOrigineCountries = data.countries;
        // let movieResultsOfBoxOffice = data.;
        // let movieDescription = data.description;

        bestMoviePicture.src = moviePicture;
        bestMovieTitle.textContent = movieTitle;

        modalPicture.src = moviePicture;
        modalTitle.textContent = "Title: " + movieTitle;
        modalGenres.textContent = "Genres: " + movieGenre;
        modalDatePublished.textContent = "Date published: " + movieDatePublished;
        // modalRated.textContent = "Rated: " + modalRated;
        modalScore.textContent = "Score: " + movieScore;
        modalDirectors.textContent = "Directors: " + movieDirectors;
        modalActors.textContent = "Actors: " + movieActors;
        // modalDuration.textContent = "Duration: " + modalDuration;
        modalOrigineCountries.textContent = "Countrie: " + movieOrigineCountries;
        // modalResultsOfBoxOffice.textContent = "Box Office: " + movieResultsOfBoxOffice;
        // modalDescription.textContent = "Description: " + movieDescription;    
    })
    }
})

// Modal windows
modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
    modalContainer.classList.toggle("active")
}

// Categorie top rated
fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.2`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        for(let i = 0; i < 5; i++) {
            const newDiv = document.createElement('div');
            newDiv.className = 'container_list';

            let newPicture = document.createElement('img');
            newPicture.src = data.results[i].image_url;
            containerList.appendChild(newPicture);
        }
        })
    }
})

// Categorie first category (Sport)
fetch(`http://localhost:8000/api/v1/titles/?genre=Sport`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let categorie = data.results[0].genres;
        let genre = categorie[categorie.length - 1]
        
        let moviePicture = data.results[0].image_url;
        
        bestMoviePicture.src = moviePicture;
        categorieTitle.innerHTML = genre;
        })
    } else {
        bestMovieTitle.innerHTML = "Error";
    }
})

// Categorie second category (Action)
fetch(`http://localhost:8000/api/v1/titles/?genre=Action`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let genre = data.results[0].genres[0];
        
        let moviePicture = data.results[0].image_url;
        
        bestMoviePicture.src = moviePicture;
        categorieTitle.innerHTML = genre;
        })
    } else {
        bestMovieTitle.innerHTML = "Error";
    }
})

// Categorie third category (Adventure)
fetch(`http://localhost:8000/api/v1/titles/?genre=Adventure`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let genre = data.results[0].genres[0];
        
        let moviePicture = data.results[0].image_url;
        
        bestMoviePicture.src = moviePicture;
        categorieTitle.innerHTML = genre;
        })
    } else {
        bestMovieTitle.innerHTML = "Error";
    }
})

// Arrows direction
containerPrevArrows.addEventListener('click', () => {
    containerPrevArrows.getElementsByClassName("container--prev_arrows");
})

containerNextArrows.addEventListener('click', () => {
    containerNextArrows.getElementsByClassName("container--next_arrows");
        animate({right: '100px'}, "slow");
})


// function getRandomCategorie () {
//     let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
//     'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
//     'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
//     'War', 'Musical'];
//     categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
//  return genre[categorie];
// }
// categorie = getRandomCategorie()