const btnMoviePlayer = document.querySelector(".box-movies__player");
const btnLeftDirection = document.querySelector(".item_direction_left");
const btnRightDirection = document.querySelector(".item_direction_right");
const allItemsList = document.querySelectorAll('.item');

 btnLeftDirection.addEventListener('click', () => {

 })

 btnRightDirection.addEventListener('click', () => {
  
 })

fetch('http://localhost:8000/api/v1/titles/')
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)

        for(i = 0; i < data.response.length; i++) {
        let newItem = document.createAttribute('item');   
    }
})

/*
let listeEl = document.querySelector("article > ul.important > li")

console.log(listeEl.nextElementSibling);

console.log("main-content", document.getElementById("main-content"));

console.log("important", document.getElementsByClassName("important"));
            
const liItem = document.querySelector("article ul.important > li");
console.log("article ul.important > li", liItem);

console.log("nextElementSibling", liItem.nextElementSibling);
*/


/*
chemin travail => cd C:\Users\l.jouron\PycharmProjects\OCMovies-API

env\Scripts\activate

python manage.py runserver

http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=

Rechercher et filtrer des films: http://localhost:8000/api/v1/titles/. Vous pouvez tester directement chaque filtre en accédant à l'URL ci-dessus depuis un navigateur web. Les filtres disponibles sont:

year=<year>, min_year=<year> ou max_year=<year> pour obtenir des films filtrés par années. Le premier de ces filtres réalise une correspondance exacte lors de la recherche.
imdb_score_min=<score> et imdb_score_max<score> pour obtenir des films avec un score imdb inférieurs ou supérieur à une note donnée.
title=<title> ou title_contains=<string> pour obtenir des films dont le titre correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second recherche les titres contenant le terme recherché. La recherche est indédendante de la casse.
director=<director-name> ou director_contains=<string> pour obtenir des films dont un réalisateur correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second filtre en fonction des réalisateurs contenant le terme recherché. La recherche est indédendante de la casse.
writer=<name> ou writer_contains=<string> pour obtenir des films dont un auteur correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second filtre en fonction des auteurs contenant le terme recherché. La recherche est indédendante de la casse.
actor=<name> ou actor_contains=<string> pour obtenir des films dont un des acteurs correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second recherche filtre en fonction des acteurs contenant le terme recherché. La recherche est indédendante de la casse.
genre=<name> ou genre_contains=<string> pour obtenir des films dont un genre correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second filtre en fonction des genres contenant le terme recherché. La recherche est indédendante de la casse.
country=<name> ou country_contains=<string> pour obtenir des films dont un pays correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second filtre en fonction des pays contenant le terme recherché. La recherche est indédendante de la casse.
lang=<name> ou lang_contains=<string> pour obtenir des films dont la langue correspond la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second filtre en fonction des langues contenant le terme recherché. La recherche est indédendante de la casse.
company=<name> ou company_contains=<string> pour obtenir des films dont la compagnie de production correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second filtre en fonction des compagnies contenant le terme recherché. La recherche est indédendante de la casse.
rating=<name> ou rating_contains=<string> pour obtenir des films dont le politique de restriction correspond à la chaine de caractères recherchée. Le premier effectue une recherche avec une correspondance extacte tandis que le second filtre en fonction des restrictions contenant le terme recherché. La recherche est indédendante de la casse.
sort_by=<field> pour obtenir des films triés selon un ordre particulier. Par exemple, utiliser sort_by=title pour trier les films selon l'ordre alphabétique de teur titre et sort_by=-title pour trier les films dans le sens inverse. Il est également possible de trier par critères multiples en séparant les critères par des virgules comme dans sort_by=-year,title qui affiche d'abord les films les plus récents, puis trie les films de la même années par ordre alphabétique.
Demander des informations détaillées sur un film dont on connait l'identifiant: http://localhost:8000/api/v1/titles/499549 où 499549 est l'identifiant (id) du film "Avatar".

Rechercher les genres disponibles: http://localhost:8000/api/v1/genres/. Les filtres disponibles sont:

name_contains=<search string> pour n'afficher que les genres dont la nom contient la chaine de caractère recherchée.
movie_title_contains=<search string> pour rechercher les genres associés à film dont le titre contient la chaine de caractère recherchée. a particular movie searched by title.
*/