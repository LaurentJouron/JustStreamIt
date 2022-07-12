const btnMoviePlay = document.querySelector(".box_movies--play-button");
const btnLeftDirection = document.querySelector(".item_direction--left");
const btnRightDirection = document.querySelector(".item_direction--right");
const allItemsList = document.querySelectorAll('.item');

fetch('http://localhost:8000/api/v1/titles/')
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)
    })
    
    btnMoviePlay.addEventListener('click', () => {
        btnMoviePlay.getElementsByClassName("box_movies--play-button");
    })

    btnLeftDirection.addEventListener('click', () => {
        btnLeftDirection.getElementsByClassName("item_direction--left");
    })

    btnRightDirection.addEventListener('click', () => {
        btnRightDirection.getElementsByClassName("item_direction--right");
    })

