/* BEST MOVIE
    Fuction to fill the category of best film
    Title */
function bestBoxeTitle(data, parent) {
    let newTitle = document.createElement('h1');
    newTitle.className = 'best_movie--title';
    newTitle.textContent = data.title;
    parent.appendChild(newTitle);
}
// Picture
function bestBoxePicture(data, parent) {
    let newPicture = document.createElement('img');
    newPicture.className = 'best_movie--picture';
    newPicture.src = data.image_url;
    parent.appendChild(newPicture);
}
// Play button
function bestBoxePlayButton(parent) {
    let newMoreInformation = document.createElement('button');
    newMoreInformation.className = 'best_movie--play';
    newMoreInformation.textContent = 'Play ▶';
    parent.appendChild(newMoreInformation);
}
// More information button
function bestBoxeMoreInformation(parent) {
    let newPlay = document.createElement('button');
    newPlay.className = 'best_movie--info modal-trigger';
    newPlay.textContent = 'More info';
    parent.appendChild(newPlay);
}
// Fuction calling functions to display the best movie data
function bestMovieBox(request, parent) {fetch(request)
        .then(response => {if(response.ok) {response.json()
        .then(data => {
            // Title of the best movie
            bestBoxeTitle(data, parent);

            // Picture of the best movie
            bestBoxePicture(data, parent);

            // More information button of the best movie
            bestBoxePlayButton(parent);

            // Play button of the best movie
            bestBoxeMoreInformation(parent);
        })
    }})
}
const bestMovieRequest = `http://localhost:8000/api/v1/titles/2646`
const bestMovieId = document.getElementById('best_movie')
bestMovieBox(bestMovieRequest, bestMovieId)

// CATEGORIES
// Fuction to call the title of each category
function categorieTitle(data, parent){
    let newCategorieTitle = document.createElement('h1');
    newCategorieTitle.className = 'categorie--title';
    newCategorieTitle.textContent = data.results[0].genres[0];
    parent.appendChild(newCategorieTitle);
}

function previewsArrows(parent) {
    let newPreviewArrows= document.createElement('button');
    newPreviewArrows.className = 'container--prev_arrows';
    newPreviewArrows.textContent = '◀';
    parent.appendChild(newPreviewArrows);
}

function nextArrows(parent) {
    let newNextArrows = document.createElement('button');
    newNextArrows.className = 'container--next_arrows';
    newNextArrows.textContent = '▶';
    parent.appendChild(newNextArrows);
}

function movieCategorie(request, parent) {fetch(request)
    .then(response => {if(response.ok) {response.json()
        .then(data => {
            // Function call to display the title above the category
            categorieTitle(data, parent);
    
            // Div creation for container
            let newContainerDiv = document.createElement('div');
            newContainerDiv.className = 'container';
            parent.appendChild(newContainerDiv);
    
            // Add previews arrows
            previewsArrows(newContainerDiv);
            
            for(let i = 0; i < 5; i++) {
                let newPicture = document.createElement('img');
                newPicture.className = 'container_list modal-trigger';      
                newPicture.src = data.results[i].image_url;
                newContainerDiv.appendChild(newPicture);
            }
            nextArrows(newContainerDiv);
        })
    }})  
}
function secondURLOfCategorie(request) {fetch(request)
    .then(response => {if(response.ok) {response.json()
        .then(data => {
            let secondAdresse = data.next;
            return secondAdresse
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



// ARROWS DIRECTION
// const containerPrevArrows = document.querySelector(".container--prev_arrows");
// const containerNextArrows = document.querySelector(".container--next_arrows");

// containerPrevArrows.addEventListener('click', () => {
    //     containerPrevArrows.getElementsByClassName("container--prev_arrows");
    //     move(--currentIndex);
    // })
    
// containerNextArrows.addEventListener('click', () => {
    //     containerNextArrows.getElementsByClassName("container--next_arrows");
    //     move(++currentIndex);
    // })
        
        
// MODAL
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


// Function for the movie categorie
// async function movieCategorie(request, parent) {
//     try {
//         let response =  await fetch(request)
//             if (response.ok) {response.json()
//                 if (response.ok) {
//                     let data = await response.json()

//                     // Function call to display the title above the category
//                     categorieTitle(data, parent);

//                     // Div creation for container
//                     let newContainerDiv = document.createElement('div');
//                     newContainerDiv.className = 'container';
//                     parent.appendChild(newContainerDiv);

//                     // Add previews arrows
//                     previewsArrows(newContainerDiv);

//                     for(let i = 0; i < 5; i++) {
//                         let newPicture = document.createElement('img');
//                         newPicture.className = 'container_list modal-trigger';      
//                         newPicture.src = data.results[i].image_url;
//                         newContainerDiv.appendChild(newPicture);
//                     }
//                     nextArrows(newContainerDiv);
//         } else {
//             console.error('Retour du serveur : ', response.status)
//         }
//     }
//     } catch (e) {
//         console.error(e)
//     }
// }