async function getMovie(idParent, getElement) {
    const APIUrl = `http://localhost:8000/api/v1/titles/?`
    const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
    const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
    const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`)
    const slideParentElement = document.querySelector(`.slide__${idParent}`)
    try {
        const response = await fetch(APIUrl+getElement)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
                if (idParent === `best_movie`) {
                    getMovieTitle.textContent = data.results[0].title
                    getMoviePicture.src = data.results[0].image_url
                } else {
                    getCategortieTitle.textContent = data.results[0].genres[0]
                    
                    // First loop that recovers the first 5 elements
                    for(let i = 0; i < 5; i++) {                   
                    let slideBanner = document.createElement('div')
                    slideBanner.className = `slide--banner`
                    slideParentElement.appendChild(slideBanner)

                    let picture = document.createElement('img')
                    picture.id = data.results[i].id
                    picture.className = 'slide--item modal-trigger'
                    picture.alt = data.results[i].title
                    picture.src = data.results[i].image_url
                    slideParentElement.appendChild(picture)
                }
                let nextPage = data.next
fetch(nextPage)
                }
            })
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (error) {
        errorMsg.textContent = `${error}`
    }
}
getMovie(`best_movie`, `sort_by=-imdb_score`)



async function getMovieCategorie(idParent, getCategorie) {
    const APIUrl = `http://localhost:8000/api/v1/titles/?`
    const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`);

    try {
        const response = await fetch(APIUrl+getCategorie)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => { 
                getCategortieTitle.textContent = data.results[0].genres[0]
                let idCarousel = document.getElementById(`id_carousel__${idParent}`)

                    // First loop that recovers the first 5 elements
                    for(let i = 0; i < 5; i++) {
                        let slide = document.createElement('div')
                        slide.className = `slide slide__${idParent}`
                        slide.tabIndex = [i]
                        idCarousel.appendChild(slide)

                        let slideBanner = document.createElement('div')
                        slideBanner.className = `slide--banner`
                        slide.appendChild(slideBanner)

                        let picture = document.createElement('img')
                        picture.id = data.results[i].id
                        picture.className = 'slide--item modal-trigger'
                        picture.alt = data.results[i].title
                        picture.src = data.results[i].image_url
                        slide.appendChild(picture)
                    }
                    // Recovery of the next URL to make a loop for 2 elements recovery
                    let nextPage = data.next
                    {fetch(nextPage)
                        .then(response => {if(response.ok) {response.json()
                            .then(data => {
                                for(let i = 0; i < 2; i++) {
                                    let slide = document.createElement('div')
                                    slide.className = `slide slide__${idParent}`
                                    idCarousel.appendChild(slide)
            
                                    let slideBanner = document.createElement('div')
                                    slideBanner.className = `slide--banner`
                                    slide.appendChild(slideBanner)
            
                                    let picture = document.createElement('img')
                                    picture.id = data.results[i].id
                                    picture.className = 'slide--item modal-trigger'
                                    picture.alt = data.results[i].title
                                    picture.src = data.results[i].image_url
                                    slide.appendChild(picture)
                            }})
                        }})
                    }
                })
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

getMovie(`top_rated`, `imdb_score_min=9&imdb_score_max=10`)
getMovie(`first_categorie`, `genre=Comedy`)
getMovie(`second_categorie`, `genre=Animation`)
getMovie(`third_categorie`, `genre=War`)


// /////////////////////
// // RANDOM CATEGORY //
// /////////////////////

// // function getRandomCategorie () {
// //     let categorieList = [];
// //     for(let i = 0; i < 3; i++) {
// //     let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
// //     'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
// //     'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
// //     'War', 'Musical'];
// //     categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
// //     categorieList.push(genre[categorie])}
// //     return categorieList
// // }
// // console.log(getRandomCategorie())


// //////////////
// // CAROUSEL //
// //////////////

// class Carousel {
//     /**
//      * @param {HTMLElement}
//      * @param {object}
//      * @param {object} options.slidesToScroll number of items to scroll through
//      * @param {object} options.slidesToVisible number of elements visible in the slide
//      * @param {boolean} options.loop should we finish the carousel
//      */
//     constructor (element, options = {}) {
//         this.element = element
//         this.options = object.assign({}, {
//             slidesToScroll: 1,
//             slidesToVisible: 4,
//             loop: false
//         }, options)
        
//         let children = [].slice.call(element.children)
//         this.currentItem = 0
//         this.root = this.createDivWithClass('carousel')
//         this.container = this.createDivWithClass('carousel__panorama')
//         this.root.appendChild(this.container)
//         this.element.appendChild(this.root)
//         this.moveCallBacks = []
//         this.items = children.map((child) => {
//             let item = this.createDivWithClass('carousel__panorama--item')
//             item.appendChild(child)
//             this.container.appendChild(item)
//             return item
//         })
//         this.setStyle()
//         this.createNavigation()
//         this.moveCallBacks.forEach(callBack => callBack(0))
//     }
//     /**
//      * Applies the correct dimensions to the carousel elements.
//      */
//     setStyle () {
//         let ratio = this.items.length / this.options.slidesToVisible
//         this.container.style.width = (ratio * 100) + "%"
//         this.items.forEach(item => item.style.width = ((100 / this.options.slidesToVisible) / ratio) + "%")
            
//     }
//     createNavigation() {
//         let nextButton = this.createDivWithClass('carousel__next')
//         let prevButton = this.createDivWithClass('carousel__prev')
//         this.root.appendChild(nextButton)
//         this.root.appendChild(prevButton)
//         nextButton.addEventListener('click', this.next.bind(this))
//         prevButton.addEventListener('click', this.prev.bind(this))
//         this.onMove(index => {
//             if(index === 0) {
//                 prevButton.classList.add('carousel__prev--hidden')
//             } else {
//                 prevButton.classList.remove('carousel__prev--hidden')
//             }
//             if (this.item[this.currentItem + this.options.slidesToVisible] === undefined){
//                 nextButton.classList.add('carousel__next--hidden')
//             } else {
//                 nextButton.classList.add('carousel__next--hidden')
//             }
//         })
//     }
//     next () {
//         this.gotToItem(this.currentItem + this.options.slidesToScroll)

//     }
//     prev () {
//         this.gotToItem(this.currentItem - this.options.slidesToScroll)
//     }
//     /**
//      * Moves the carousel to the target element
//      * @param {number} index 
//      */
//     gotToItem(index) {
//         if (index < 0) {
//             index = this.items.length - this.options.visible
//         } else if (index >= this.items.length || this.item[this.currentItem + this.options.slidesToVisible] === undefined) {
//             index = 0
//         }
//         let translateX = index * 100 / this.items.length
//         this.container.style.transfom = 'translate3d(' + translateX + ' %, 0, 0)'
//         this.currentItem = index
//         this.moveCallBacks.forEach(callBack => callBack(index))
//     }

//     onMove(callBack) {
//         this.moveCallBacks.push(callBack)
//     }

//     /**
//      * @param {string} 
//      * @returns {HTMLElement}
//      */
//     createDivWithClass (className) {
//         let div = document.createElement('div')
//         div.setAttribute('class', className)
//         return div
//     }
// }
    
    
// document.addEventListener('DOMContentLoaded', function () {
//     new Carousel(document.querySelector('#top_rated'), {
//         slidesToScroll: 1,
//         slidesToVisible: 4,
//         loop: false
//     })

//     new Carousel(document.querySelector('#first_categorie'), {
//         slidesToScroll: 3,
//         slidesToVisible: 4,
//         loop: false
//     })
//     new Carousel(document.querySelector('#second_categorie'), {
//         slidesToScroll: 3,
//         slidesToVisible: 4,
//         loop: false
//     })
//     new Carousel(document.querySelector('#third_categorie'), {
//         slidesToScroll: 3,
//         slidesToVisible: 4,
//         loop: false
//     })
// })


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

