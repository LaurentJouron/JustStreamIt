const bestMoviePicture = document.querySelector('.best_movie--picture');
const bestMovieTitle = document.querySelector('.best_movie--title');
const bestMoviePlay = document.querySelector('.best_movie--play')

const containerListItem = document.querySelectorAll(".container_list--item");

const bestMoviesPlayButton = document.querySelector(".best_movies__container__Items--play-button");
const containerListDirectionLeft = document.querySelector(".container_list__direction--left");
const containerListDirectionRight = document.querySelector(".container_list__direction--right");

function getRandomCategorie () {
    let genre = ['History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
    'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
    'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
    'War', 'Musical'];
    categorie = Math.floor(Math.random() * (Math.ceil(0), Math.floor(genre.length)));
 return genre[categorie];
}

fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.6&genre=Comedy`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {
        let moviePicture = data.results[0].image_url;
        let movieTitle = data.results[0].title;

        bestMoviePicture.src = moviePicture;
        bestMovieTitle.innerHTML = movieTitle;
        })
        } else {
            bestMovieTitle.innerHTML = "Error";
        }
    })

bestMoviePlay.addEventListener('click', ()=> {
    console.log('ouvre la fenetre modale')
})

categorie = getRandomCategorie()
let j = 1;
for(i = 4; i > 0; i--){if(i === 1){j++}
    fetch(`http://localhost:8000/api/v1/titles/?genre=${categorie}&page=${j}`)
    .then(response => {if(response.ok) {response.json()
    .then(data => {console.log(data)})
            }
        })
    }

containerListDirectionLeft.addEventListener('click', () => {
    containerListDirectionLeft.getElementsByClassName("container_list__direction--left");

    // containerListDirectionLeft.stopPropagation();
})

containerListDirectionRight.addEventListener('click', () => {
    containerListDirectionRight.getElementsByClassName("container_list__direction--right");

    // containerListDirectionRight.stopPropagation();
})
