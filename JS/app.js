// Best movie boxe
function bestMovieBox(request, append) {fetch(request)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            // Title of the best movie
            let newTitle = document.createElement('h1');
            newTitle.className = 'best_movie--title';
            newTitle.textContent = data.title;
            append.appendChild(newTitle);

            // Picture of the best movie
            let newPicture = document.createElement('img');
            newPicture.className = 'best_movie--picture';
            newPicture.src = data.image_url;
            append.appendChild(newPicture);

            // Information button of the best movie
            let newMoreInformation = document.createElement('button');
            newMoreInformation.className = 'best_movie--play';
            newMoreInformation.textContent = 'Play ▶';
            append.appendChild(newMoreInformation);

            // Play button of the best movie
            let newPlay = document.createElement('button');
            newPlay.className = 'best_movie--info modal-trigger';
            newPlay.textContent = 'More info';
            append.appendChild(newPlay);
        })
    }})
}
const bestMovieRequest = `http://localhost:8000/api/v1/titles/2646`
const bestMovieId = document.getElementById('best_movie')
bestMovieBox(bestMovieRequest, bestMovieId)


// Function for the movie categorie
function movieCategorie(request, append) {fetch(request)
    .then(response => {if(response.ok) {response.json()
        .then(data => {
            // Display the title on top the categorie
            const newCategorieTitle = document.createElement('h1');
            newCategorieTitle.className = 'categorie--title';
            newCategorieTitle.textContent = data.results[0].genres[0];
            append.appendChild(newCategorieTitle);
            
            for(let i = 0; i < 5; i++) {


                // let newPicture = document.createElement('img');
                                    
                // newPicture.src = data.results[i].image_url;
                // containerList.appendChild(newPicture);
            }
        })
    }})
}

const topRatedRequest = 'http://localhost:8000/api/v1/titles/?imdb_score=9.2'
const topRated = document.getElementById('top_rated')
movieCategorie(topRatedRequest, topRated)

const firstRequest = 'http://localhost:8000/api/v1/titles/?genre=Sport'
const firstCategorie = document.getElementById('first_categorie')
movieCategorie(firstRequest, firstCategorie)

const secondRequest = 'http://localhost:8000/api/v1/titles/?genre=Action'
const secondCategorie = document.getElementById('second_categorie')
movieCategorie(secondRequest, secondCategorie)

const thirdRequest = 'http://localhost:8000/api/v1/titles/?genre=Adventure'
const thirdCategorie = document.getElementById('third_categorie')
movieCategorie(thirdRequest, thirdCategorie)




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


// Modal windows
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
//     modalContainer.classList.toggle("active")
// }


// function getRandomCategorie () {
//     let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
//     'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
//     'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
//     'War', 'Musical'];
//     categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
//  return genre[categorie];
// }
// categorie = getRandomCategorie()