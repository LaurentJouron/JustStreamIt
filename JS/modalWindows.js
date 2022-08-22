///////////////////
// MODAL WINDOWS //
///////////////////

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