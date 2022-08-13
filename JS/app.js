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

// Modale windows with categorie boxe
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
    //     modalContainer.classList.toggle("active")
    // }
    

// Title function with args: request, and where he goes in document. 
function movieTitle(request, movieTitle) {fetch(request)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            let title = data.title;
            movieTitle.textContent = title;
        })
    }})
}
// Picture function with args: request, and where he goes in document. 
function moviePicture(request, moviePicture) {fetch(request)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            let picture = data.image_url;
            moviePicture.src = picture;
        })
    }})
}
// Genre of movie function with args: request, and where he goes in document. 
function movieGenre(request, movieGenre) {fetch(request)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            let genre = data.genres;
            movieGenre.src = genre;
        })
    }})
}

// Loop function for pictures boxes with args: request, and where he goes in document. 
function request(request, categorie) {fetch(request)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            for(let i = 0; i < 5; i++) {
                const newDiv = document.createElement('div');
                newDiv.className = categorie;
                
                let newPicture = document.createElement('img');
                
                newPicture.src = data.results[i].image_url;
                containerList.appendChild(newPicture)
            }
        })
    }})
}

// Best movie boxe
const bestMoviePicture = document.querySelector('.best_movie--picture');
const bestMovieTitle = document.querySelector('.best_movie--title');
let bestMovieRequest = `http://localhost:8000/api/v1/titles/2646`
moviePicture(bestMovieRequest, bestMoviePicture);
movieTitle(bestMovieRequest, bestMovieTitle);

// Categorie top rated
const topRatedCategorie = document.getElementById('top_rated')
const topRatedTitle = document.querySelector(".top_rated");
const topRatedList = 'top_rated'
const topRatedRequest = `http://localhost:8000/api/v1/titles/?imdb_score=9.2`
request(topRatedRequest, topRatedList);

// Categorie first category (Sport)
const firstCategorie = document.getElementById('first_categorie')
const containerListTitle = document.querySelector(".categorie--title");
const containerList = document.querySelector(".first_categorie");
const firstCategorieRequest = `http://localhost:8000/api/v1/titles/?genre=Sport`
request(firstCategorieRequest, containerListTitle);

// Categorie second category (Action)
// const secondCategorie = document.getElementById('second_categorie')

// fetch(`http://localhost:8000/api/v1/titles/?genre=Action`)
//     .then(response => {if(response.ok) {response.json()
//     .then(data => {
//         let genre = data.results[0].genres[0];
        
//         let moviePicture = data.results[0].image_url;
        
//         bestMoviePicture.src = moviePicture;
//         categorieTitle.innerHTML = genre;
//         })
//     } else {
//         bestMovieTitle.innerHTML = "Error";
//     }
// })

// Categorie third category (Adventure)
// const thirdCategorie = document.getElementById('third_categorie')

// fetch(`http://localhost:8000/api/v1/titles/?genre=Adventure`)
//     .then(response => {if(response.ok) {response.json()
//     .then(data => {
//         let genre = data.results[0].genres[0];
        
//         let moviePicture = data.results[0].image_url;
        
//         bestMoviePicture.src = moviePicture;
//         categorieTitle.innerHTML = genre;
//         })
//     } else {
//         bestMovieTitle.innerHTML = "Error";
//     }
// })

// Arrows direction
const containerPrevArrows = document.querySelector(".container--prev_arrows");
const containerNextArrows = document.querySelector(".container--next_arrows");

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