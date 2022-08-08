// Best movie boxe
const bestMoviePicture = document.querySelector('.best_movie--picture');
const bestMovieTitle = document.querySelector('.best_movie--title');

// Modal windows
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalTitle = document.getElementById('modal_title')
const modalScore = document.getElementById('modal_score')
const modalYear = document.getElementById('modal_year')
const modalDirectors = document.getElementById('modal_directors')
const modalActors = document.getElementById('modal_actors')
const modalGenres = document.getElementById('modal_genres')

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
fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.6&genre=Comedy`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let movieTitle = data.results[0].title;
        let moviePicture = data.results[0].image_url;
        let movieScore = data.results[0].imdb_score;
        let movieYear = data.results[0].year;
        let movieDirectors = data.results[0].directors;
        let movieActors = data.results[0].actors;
        let movieGenre = data.results[0].genres;

        bestMovieTitle.textContent = movieTitle;
        bestMoviePicture.src = moviePicture;

        let newH4 = document.createElement('h4');
        modalTitle.textContent = "Title: " + movieTitle;
        modalScore.textContent = "Score: " + movieScore;
        modalYear.textContent = "Year: " + movieYear;
        modalDirectors.textContent = "Directors: " + movieDirectors;
        modalActors.textContent = "Actors: " + movieActors;
        modalGenres.textContent = "Genres: " + movieGenre;
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
        for(let i = 0; i < 7; i++) {
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
    move(--currentIndex);
})

containerNextArrows.addEventListener('click', () => {
    containerNextArrows.getElementsByClassName("container--next_arrows");
    move(++currentIndex);
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