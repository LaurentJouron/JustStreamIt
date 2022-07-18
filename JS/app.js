const bestMoviesContainerPictures = document.getElementsByClassName('best_movies__container--pictures');
const bestMoviesContainerItemsTitle = document.getElementsByClassName('best_movies__container__Items--title');

const containerListItem = document.getElementsByClassName("container_list--item");
const bestMoviesPlayButton = document.querySelector(".best_movies__container__Items--play-button");
const containerListDirectionLeft = document.querySelector(".container_list__direction--left");
const containerListDirectionRight = document.querySelector(".container_list__direction--right");


fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.6&genre=Comedy`)
    .then(response => {
        if(response.ok) {
            response.json().then(data => {
                bestMoviesContainerPictures.src = data.results[0].image_url;
                bestMoviesContainerItemsTitle.h1 = data.results[0].title;
                console.log(data.results[0].title)
            console.log(bestMoviesContainerPictures.src)})
            } else {
                document.getElementsByClassName("best_movies__container__Items--title").innerHTML = "Error";
            }
        })

// function bestMovies() {
//     for(let i = 10; i === 0; i--) {
//         fetch(`http://localhost:8000/api/v1/titles/?imdb_score=${i}&genre=Comedy`)
//             .then(response => {
//                 if(response.ok) {
//                     response.json().then(data => {
//                         bestMoviesContainerPictures.src = data.results[0].image_url;
//                         bestMoviesContainerItemsTitle.h1 = data.results[0].title;
//                     console.log(bestMoviesContainerItemsTitle.h1)
//                     console.log(bestMoviesContainerPictures.src)})
//                     } else {
//                         document.getElementsByClassName("best_movies__container__Items--title").innerHTML = "Error";
//                     }
//                 });
//             }
//         }

// genre : 'History', 'Drama', 'Documentary', 'Sport', 'Music', 'Animation', 'News',
// 'Adventure', 'Adult', 'Sci-Fi', 'Family', 'Romance', 'Horror', 'Comedy', 'Biography',
// 'Fantasy', 'Film-Noir', 'Crime', 'Action', 'Thriller', 'Western', 'Mystery', 'Reality-TV',
// 'War', 'Musical',

    bestMoviesPlayButton.addEventListener('click', () => {
        bestMoviesPlayButton.getElementsByClassName("best_movies__container__Items--play-button");
    })

    containerListDirectionLeft.addEventListener('click', () => {
        containerListDirectionLeft.getElementsByClassName("container_list__direction--left");

        // containerListDirectionLeft.stopPropagation();
    })

    containerListDirectionRight.addEventListener('click', () => {
        containerListDirectionRight.getElementsByClassName("container_list__direction--right");
    
        // containerListDirectionRight.stopPropagation();
    })

