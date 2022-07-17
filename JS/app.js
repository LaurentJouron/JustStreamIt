const img = document.getElementsByClassName('best_movies__container--pictures');

const containerListItem = document.getElementsByClassName("container_list--item");
const bestMoviesPlayButton = document.querySelector(".best_movies__container__Items--play-button");
const containerListDirectionLeft = document.querySelector(".container_list__direction--left");
const containerListDirectionRight = document.querySelector(".container_list__direction--right");


fetch(`http://localhost:8000/api/v1/titles/?imdb_score=9.6&genre=Comedy`)
    .then(response => {
        if(response.ok) {
            response.json().then(data => {
                img.src = data.results[0].image_url;
            console.log(img.src)})
            } else {
                document.getElementsByClassName("best_movies__container__Items--title").innerHTML = "Error";
            }
        })

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

