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
                if (idParent === `best_movie`) {
                    const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
                    const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
                // const playLink = document.querySelector(`play`)
                
                    getMovieTitle.textContent = data.results[0].title
                    getMoviePicture.src = data.results[0].image_url
                // data.results[0].imdb_url 
                
                } else {
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
                        picture.tabIndex = [i];
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
                                    picture.tabIndex = [i];
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

const playButton = document.querySelector(".play");
    playButton.addEventListener('click', () => {
        playButton.getElementsByClassName("play");
        data.results[0].imdb_url
    }
)

function previewItem(idParent) {
    const preview = document.querySelector(`.preview__${idParent}`);
    preview.addEventListener('click', (idParent) => {
        preview.querySelector(`.preview__${idParent}`)
        picturesGallery('')
    })
}

function nextItem(idParent) {
    const next = document.querySelector(`.next__${idParent}`);
        next.addEventListener('click', (idParent) => {
            next.querySelector(`.next__${idParent}`)
            picturesGallery(`-`)
    })
}

function picturesGallery(sign) { 
    let angle = 0
    spinner = document.querySelector(`.spinner`);
    if (!sign) { angle = angle + 51.428 
    } else { 
        angle = angle - 51.428
    }
    spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
}

getMovie(`best_movie`, `sort_by=-imdb_score`)

getMovie(`top_rated`, `imdb_score_min=9&imdb_score_max=10`)
previewItem(`top_rated`)
nextItem(`top_rated`)

getMovie(`first_categorie`, `genre=Comedy`)
previewItem(`first_categorie`)
nextItem(`first_categorie`)

getMovie(`second_categorie`, `genre=Animation`)
previewItem(`second_categorie`)
nextItem(`second_categorie`)

getMovie(`third_categorie`, `genre=War`)
previewItem(`third_categorie`)
nextItem(`third_categorie`)


// function autoplayCarousel(idParent) {
//     const carousel = document.getElementById(`carousel__${idParent}`)
//     const slideContainer = carousel.querySelector(`.slide_container__${idParent}`)
//     const slide = carousel.querySelector(`.slide`)
//     let slideWidth = slide.offsetWidth;

//     document.querySelector(`.preview__${idParent}`)
//         .addEventListener("click", () => navigate("backward"))

//     document.querySelector(`.next__${idParent}`)
//         .addEventListener("click", () => navigate("forward"))

//     document.querySelectorAll(".slide-indicator")
//         .forEach((dot, index) => {
//             dot.addEventListener("click", () => navigate(index))
//     })

//     // Add keyboard handlers
//     document.addEventListener('keydown', (e) => {
//         if (e.code === 'ArrowLeft') {
//             clearInterval(autoplay)
//             navigate("backward")
//         } else if (e.code === 'ArrowRight') {
//             clearInterval(autoplay)
//             navigate("forward")
//         }
//     })

//     // Add resize handler
//     window.addEventListener('resize', () => {
//         slideWidth = slide.offsetWidth;
//     })

//     const getNewScrollPosition = (arg) => {
//         const gap = 10
//         const maxScrollLeft = slideContainer.scrollWidth - slideWidth
//         if (arg === "forward") {
//             const x = slideContainer.scrollLeft + slideWidth + gap
//             return x <= maxScrollLeft ? x : 0
//         } else if (arg === "backward") {
//             const x = slideContainer.scrollLeft - slideWidth - gap
//             return x >= 0 ? x : maxScrollLeft
//         } else if (typeof arg === "number") {
//             const x = arg * (slideWidth + gap)
//             return x
//         }
//     }
//     const navigate = (arg) => {
//         slideContainer.scrollLeft = getNewScrollPosition(arg)
//     }

//     // Slide indicators
//     const slideObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const slideIndex = entry.target.dataset.slideindex;

//             }
//         })
//     }, 
//     { root: slideContainer, threshold: .1 })
//     document.querySelectorAll('.slide').forEach((slide) => {
//         slideObserver.observe(slide)
//     })
// }

// autoplayCarousel(`top_rated`)
// autoplayCarousel(`first_categorie`)
// autoplayCarousel(`second_categorie`)
// autoplayCarousel(`third_categorie`)

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
