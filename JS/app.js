const APIUrl = `http://localhost:8000/api/v1/titles/`

////////////////
// BEST MOVIE //
////////////////
async function getBestMovie(idParent) {
    try {
        const response = await fetch(APIUrl+`?sort_by=-imdb_score`)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
                movieURL = data.results[0].url
                {fetch(movieURL)
                    .then(response => {if(response.ok) {response.json()
                    .then(data => {
                        const getMoviePicture = document.querySelector(`.movie_picture__${idParent}`)
                        const getMovieTitle = document.querySelector(`.movie_title__${idParent}`)
                        const getMovieDescription = document.querySelector(`.movie_description__${idParent}`)

                        getMovieTitle.textContent = data.title;
                        getMoviePicture.src = data.image_url;
                        getMovieDescription.textContent = data.description
                        movieURL = data.url
                        getValueToModalElement(movieURL)                        
                    })
                }})}
            }) 
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

getBestMovie(`best_movie`)


/////////////////////
// CATEGORIE MOVIE //
/////////////////////
async function getMovieCategorie(idParent, getCategorie, categorieName) {
    const carousel = document.querySelector(`.carousel__${idParent}`)
    try {
        const response = await fetch(APIUrl+getCategorie)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
                const getCategortieTitle = document.querySelector(`.categorie_title__${idParent}`)
                getCategortieTitle.textContent = categorieName
                    for(let i = 0; i < 5; i++) {
                        movieURL = data.results[i].url
                        {fetch(movieURL)
                            .then(response => {if (response.ok) {response.json()
                            .then(data => {
                                let picture = document.createElement('img');
                                picture.id = data.id;     
                                picture.className = 'item modal-trigger';
                                picture.alt = data.title;
                                picture.src = data.image_url;
                                carousel.appendChild(picture);
                            })
                        }})}
                    }
                    let nextPage = data.next
                    {fetch(nextPage)
                        .then(response => {if(response.ok) {response.json()
                        .then(data => {
                            /// We read about the first 2 films of the package
                            for(i = 0; i < 2; i++) {
                                movieURL = data.results[i].url
                                {fetch(movieURL)
                                .then(response => {if (response.ok) response.json()
                                .then(data => {
                                    picture = document.createElement('img');
                                    picture.id = data.id;     
                                    picture.className = 'item modal-trigger';
                                    picture.alt = data.title;
                                    picture.src = data.image_url;
                                    carousel.appendChild(picture);
                                    })
                                })
                            }}
                        })

                    }})
                }
            }
        )
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(error) {
        errorMsg.textContent = `${error}`
    }
}

getMovieCategorie(`top_rated`, `?imdb_score_min=9&imdb_score_max=10`, `Top rated`)
getMovieCategorie(`first_categorie`, `?genre=Comedy&sort_by=-imdb_score`, `Comedy`)
getMovieCategorie(`second_categorie`, `?genre=Animation&sort_by=-imdb_score`, `Animation`)
getMovieCategorie(`third_categorie`, `?genre=Sport&sort_by=-imdb_score`, `Sport`)


//////////////
// CAROUSEL //
//////////////
let angle = 0;
function picturesGallery(sign, idParent) { 
    spinner = document.querySelector(`.spinner__${idParent}`);
    if (!sign) { angle = angle + 51.428 
    } else { 
        angle = angle - 51.428
    }
    spinner.setAttribute(`style`,`-webkit-transform: rotateY(${angle}deg)`); 
        `-moz-transform: rotateY(${angle}deg)`; 
        `transform: rotateY(${angle}deg)`;
}

const previewTopRated = document.querySelector(`.preview__top_rated`);
previewTopRated.addEventListener('click', () => {
    previewTopRated.querySelector(`.preview__top_rated`)
    picturesGallery('', 'top_rated')
})


const nextTopRated = document.querySelector(`.next__top_rated`);
nextTopRated.addEventListener('click', () => {
    nextTopRated.querySelector(`.next__top_rated`)
    picturesGallery(`-`, `top_rated`)
})


//////////////
// CAROUSEL TEST GRAFIKART //
//////////////
class Carousel {
    constructor (element, options = {}) {
        this.element = element
        this.options = object.assign({}, {
            slidesToScroll: 4,
            slidesToVisible: 3,
            loop: false
        }, options)
        
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__panorama')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallBacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__panorama--item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallBacks.forEach(callBack => callBack(0))
    }

    setStyle () {
        let ratio = this.items.length / this.options.slidesToVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesToVisible) / ratio) + "%")   
    }

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        
        this.onMove(index => {
            if(index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.item[this.currentItem + this.options.slidesToVisible] === undefined){
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.add('carousel__next--hidden')
            }
        })
    }

    next () {
        this.gotToItem(this.currentItem + this.options.slidesToScroll)

    }

    prev () {
        this.gotToItem(this.currentItem - this.options.slidesToScroll)
    }

    gotToItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.visible
        } else if (index >= this.items.length || this.item[this.currentItem + this.options.slidesToVisible] === undefined) {
            index = 0
        }

        let translateX = index * 100 / this.items.length
        this.container.style.transfom = 'translate3d(' + translateX + ' %, 0, 0)'
        this.currentItem = index
        this.moveCallBacks.forEach(callBack => callBack(index))
    }

    onMove(callBack) {
        this.moveCallBacks.push(callBack)
    }

    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}
    
document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('.top_rated'), {
        slidesToScroll: 3,
        slidesToVisible: 4,
        loop: false
    })

    new Carousel(document.querySelector('.first_categorie'), {
        slidesToScroll: 3,
        slidesToVisible: 4,
        loop: false
    })
    new Carousel(document.querySelector('.second_categorie'), {
        slidesToScroll: 3,
        slidesToVisible: 4,
        loop: false
    })
    new Carousel(document.querySelector('.third_categorie'), {
        slidesToScroll: 3,
        slidesToVisible: 4,
        loop: false
    })
})



///////////////////
// MODAL WINDOWS //
///////////////////

const getModalPicture = document.querySelector(`.modal_picture`);
const getModalTitle = document.querySelector(`.modal_title`);
const getModalGenres = document.querySelector(`.modal_genres`);
const getModalDescription = document.querySelector(`.modal_description`);
const getModalActors = document.querySelector(`.modal_actors`);
const getModalDirectors = document.querySelector(`.modal_directors`);
const getModalDuration = document.querySelector(`.modal_duration`);
const getModalRated = document.querySelector(`.modal_rated`);
const getModalScore = document.querySelector(`.modal_score`);
const getModalDatePublished = document.querySelector(`.modal_date_published`);
const getModalOrigineCountries = document.querySelector(`.modal_origine_countries`);
const getModalResultsOfBoxOffice = document.querySelector(`.modal_results_of_box_office`);

function getValueToModalElement(modalRequest) {fetch(modalRequest)
    .then(response => {if(response.ok) {response.json()
        .then(data => {
            getModalPicture.src = data.image_url;
            getModalTitle.textContent = "Title: " + data.title;
            getModalGenres.textContent = "Genres: " + data.genres;
            getModalDescription.textContent = "Description: " + data.description;
            getModalActors.textContent = "Actors: " + data.actors;
            getModalDirectors.textContent = "Directors: " + data.directors;
            getModalDuration.textContent = "Duration: " + data.duration + " min";
            getModalRated.textContent = "Rated: " + data.rated;
            getModalScore.textContent = "Score: " + data.imdb_score;
            getModalDatePublished.textContent = "Date published: " + data.date_published;
            getModalOrigineCountries.textContent = "Countrie: " + data.countries;
            // getModalResultsOfBoxOffice.textContent = "Box Office: " + data.;
            })
        }
    })
}


const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
trigger.addEventListener("click", toggleModal)
)

function toggleModal() {
    modalContainer.classList.toggle("active")
}

async function getModalBox(movieURL) {
    try {
        const response = await fetch(movieURL)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        if (response.ok) {response.json()
            .then(data => {
                console.log(data)
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
                // getModalResultsOfBoxOffice.textContent = "Box Office: " + data.;  
            })
            } else {
                console.error('Retour du serveur : ', response.status)
            }
        } catch(error) {
            errorMsg.textContent = `${error}`
    }
}

const modaltest = getModalBox(APIUrl+'8571428')
console.log(modaltest)