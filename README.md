// MAISON
cd C:\Users\Public.PC\PycharmProjects\JustStreamIt\OCMovies

// BUREAU
cd C:\Users\l.jouron\PycharmProjects\JustStreamIt\OCMovies

env\Scripts\activate
python manage.py runserver



<h1 align="center">Welcome to JustStreamIt 👋</h1>

<p align="center">
  <a href="https://twitter.com/LaurentJouron">
    <img alt="Twitter: LaurentJouron"
      src="https://img.shields.io/twitter/follow/LaurentJouron.svg?style=social" target="_blank" />
  </a>   
  <a href="https://github.com/LaurentJouron">
    <img alt="GitHub followers" 
      src="https://img.shields.io/github/followers/LaurentJouron?style=social" />
  </a>
</p>
<p align="center">
    <img align="left"
      width="60px" 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4PiKOshpQfsfBToRmImIP_XLnyDnKDOL5A&usqp=CAU" />
</p>

### ``--- Explanation in English ---``

___________
This exercise was conducted as part of a training session on:
___

The JustStreamIt association is known for its film ranking newsletters. These rankings have saved many evenings for its ever-growing followers, as their slogan says: “Don’t you know what to look for to have a good evening? So JustStreamIt”.  
But the principle of newsletters begins to show its limits. The association wants to equip itself with a web application allowing to visualize in real time a ranking of interesting films. The problem is that for that you need a web developer, and the association doesn’t have one.... So they post an ad.

This is where you come in! Indeed, in addition to being passionate about Python, you are also passionate about the seventh art. So you decide to use your best pen to offer your services to Camille, the CEO.

* The design of the future website should be inspired by the Netflix interface.
* The site should work similarly on the three most used browsers currently...
* We will use a homemade API we have called OCMovies-API.
* The goal is to retrieve movie data from the API using ajax queries and display them on a web interface. The data will have to be filtered according to the criteria I will mention shortly after. The data must be updated automatically.
* We let you choose the three categories. Only the “Top Rated Films” category is imposed and must correspond to the top rated films according to the Imdb score.

* “Best Movie”: This area displays the photo of the movie that has the best Imdb rating in all categories, as well as its title, a button and the film summary under the button.
“Top rated films”: This area displays the other 7 top rated films in all categories. They can be scrolled with an arrow to the left and right as on the model to go through them all.
    * “Category 1”: Shows the top 7 rated films in a given category. 
    * “Category 2”: Shows the top 7 rated films in another category.
    * “Category 3”: Same on another category!

* When you click on the button of the featured film or on the image of one of the films a modal window opens. In this window the following information must be present:
   * The image of the film cover
   * The title of the film
   * The complete genre of the film
   * Its release date
   * His Rated
   * His score Imdb
   * His director
   * The list of actors
   * Duration
   * Home country
   * The result at the Box Office
   * The summary of the film

__________

<h1 align="center">Unsallation of the API</h1>

This locally-executable API can be installed and executed from 
[http://localhost:8000/api/v1/titles/](http://localhost:8000/api/v1/titles/) using the following steps.

### Option 1: Installation and execution with pipenv

For this method, it is necessary to have pipenv already installed on your python installation. 
If pipenv is not already installed on your computer, refer to [this page](docs/pipenv/installation-en.md).

1. Clone this repository using `$ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git`
(you can also download the code using [as a zip file](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Move to the ocmovies-api root folder with `$ cd ocmovies-api-en`
3. Install project dependencies with `pipenv install` 
4. Create and populate project database with `pipenv run python manage.py create_db`
5. Run the server with `pipenv run python manage.py runserver`

When the server is running after step 5 of the procedure, the OCMovies API can
be requested from endpoints starting with the following base URL: 
[http://localhost:8000/api/v1/](http://localhost:8000/api/v1/titles/).

Steps 1-4 are only required for initial installation. For subsequent launches
of the API, you only have to execute step 5 from the root folder of the project.

### Option 2: Installation and execution without pipenv (using venv and pip)

1. Clone this repository using 
`$ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git`
(you can also download the code using 
2. [as a zip file](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
3. Move to the ocmovies-api root folder with `$ cd ocmovies-api-en`
4. Create a virtual environment for the project with `$ py -m venv env` 
on windows or `$ python3 -m venv env` on macos or linux.
5. Activate the virtual environment with `$ env\Scripts\activate` on windows or 
6. `$ source env/bin/activate` on macos or linux.
7. Install project dependencies with `$ pip install -r requirements.txt`
8. Create and populate the project database with `$ python manage.py create_db`
9. Run the server with `$ python manage.py runserver`

When the server is running after step 7 of the procedure, the OCMovies API can be requested from endpoints starting 
with the following base URL: http://localhost:8000/api/v1/titles/.

Steps 1-3 and 5-6 are only required for initial installation. For subsequent launches of the API, 
you only have to execute steps 4 and 7 from the root folder of the project.

Attached is the complete API README

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LaurentJouron/JustStreamIt/blob/main/OCMovies/README.md">
        <img width="100px"
          src="https://user.oc-static.com/upload/2020/09/18/16004298163529_P5.png" /><br />
        <sub><b>ReadMe OC_Movies</b></sub></a><br />
      <a href="https://github.com/LaurentJouron/JustStreamIt/blob/main/OCMovies/README.md" title="ReadMe OC_Movies" ></a> 
    </td>
  </tr>
</table>

___________

<h1 align="center">Languages used</h1>
To make the CSS I used the SASS compiler.
<table>
  <tr>
    <td align="center">
      <a href="https://developer.mozilla.org/fr/docs/Web/HTML">
        <img width="100px"
          src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748__340.png" /><br />
        <sub><b>HTML</b></sub></a><br />
      <a href="https://developer.mozilla.org/fr/docs/Web/HTML" title="HTML" ></a> 
    </td>
    <td align="center">
      <a href="https://developer.mozilla.org/fr/docs/Web/CSS">
        <img width="100px"
          src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747__340.png" /><br />
        <sub><b>CSS</b></sub></a><br />
      <a href="https://developer.mozilla.org/fr/docs/Web/CSS" title="CSS" ></a> 
    </td>
    <td align="center">
      <a href="https://sass-lang.com/">
        <img width="90px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02xZl2fjUhm-bGFzQJs2-n8iUFbUITr3zcg&usqp=CAU" /><br />
        <sub><b>SASS</b></sub></a><br />
      <a href="https://sass-lang.com/" title="SASS" ></a> 
    </td>
    <td align="center">
      <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript">
        <img width="90px"
          src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400__340.png" /><br />
        <sub><b>JavaScript</b></sub></a><br />
      <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript" title="JavaScript" ></a> 
    </td>
  </tr>
</table>

___________
<h1 align="center">EDI</h1>
When I use HTML, CSS or JavaScript, I have a preference for Visual studio code and its Emmet extension.

[Doc Emmet](https://code.visualstudio.com/docs/editor/emmet)

<table>
  <tr>
    <td align="center">
      <a href="https://visualstudio.microsoft.com/fr/">
        <img width="110px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-H3CcAG7w2nXSnlqldVWR-ER4mvFfLgqYxA&usqp=CAU" /><br />
        <sub><b>Visuable Studio Code</b></sub></a><br />
      <a href="https://visualstudio.microsoft.com/fr/" title="Visuable Studio Code" ></a>
    </td>
  </tr>
</table>

___
<h1 align="center">Author and collaborators</h1>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LaurentJouron">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlW-w7O7g3hQTw8qcIAy3LCRhiHg5tUPfvVg&usqp=CAU"
          width="100px;"/><br />
        <sub><b>Laurent Jouron</b></sub></a><br />
      <a href="https://openclassrooms.com/fr/" title="Étudiant">🈸</a>
      <a href="https://github.com/LaurentJouron/JustStreamIt" title="Codeur de l'application">💻</a>
    </td>
    <td align="center">
      <a href="https://github.com/thierhost">
        <img src="https://avatars.githubusercontent.com/u/7854284?s=100&v=4"
          width="100px;"/><br />
        <sub><b>Thierno Thiam</b></sub></a><br />
      <a href="https://github.com/thierhost" title="Mentor de Laurent">👨‍🏫</a> 
      <a href="https://www.python.org/dev/peps/pep-0008/" title="Doc PEP 8">📄</a>
    </td>
  </tr>
</table>


___________

#################################################################################

___________

<h1 align="center">Bienvenue sur JustStreamIt 👋</h1>

<p align="center">
  <a href="https://twitter.com/LaurentJouron">
    <img alt="Twitter: LaurentJouron" 
      src="https://img.shields.io/twitter/follow/LaurentJouron.svg?style=social" target="_blank" />
  </a>
  <a href="https://github.com/LaurentJouron">
    <img alt="GitHub followers" 
      src="https://img.shields.io/github/followers/LaurentJouron?style=social" />
  </a>
</p>

<p align="center">
    <img align="left"
      width="50px" 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToscdusMNjQbffwasgiLuCsbCNZisJRE95Fg&usqp=CAU" />
</p>

### ``--- Explication en français ---``
___________
Cet exercice a été réalisé dans le cadre d'une formation dont voici le sujet :
___

L’association JustStreamIt est connue pour ses newsletters de classement de films. Ces classements ont sauvé bien des soirées à ses abonnés toujours plus nombreux, comme le dit leur slogan : “Tu ne sais pas quoi regarder pour passer une bonne soirée ? Alors JustStreamIt”.  
Mais le principe des newsletters commence à montrer ses limites. L’association souhaite se doter d’une application web permettant de visualiser en temps réel un classement de films intéressants. Le problème est que pour cela il faut un développeur web, et l’association n’en a pas… Elle poste donc une annonce.

C’est là que vous entrez en jeu ! En effet, en plus d’être passionné de Python, vous l’êtes également du septième art. Vous décidez donc de prendre votre plus belle plume pour proposer vos services à Camille, la CEO.

* Le design du futur site web devra être inspirée de l’interface de Netflix.
* Le site doit fonctionner de façon similaire sur les trois navigateurs les plus utilisés actuellement.
* Nous utiliserons une API maison que nous avons baptisée OCMovies-API.
* L’objectif est de récupérer les données des films depuis l’API à l’aide de requêtes ajax et de les afficher sur une interface web. Il faudra filtrer les données en fonction des critères que je te mentionnerai juste après. La mise à jour des données doit se faire automatiquement.
* Nous te laissons choisir les trois catégories. Seule la catégorie “Films les mieux notés” est imposée et doit correspondre aux films les mieux notés selon le score Imdb.

* “Meilleur film” : Cette zone affiche la photo du film qui a la meilleur note Imdb toutes catégories confondues, ainsi que son titre, un bouton et le résumé du film sous le bouton.
“Films les mieux notés” : Cette zone affiche les 7 autres films les mieux notés toutes catégories confondues. On pourra les faire défiler avec une flèche à gauche et à droite comme sur la maquette pour tous les parcourir.
“Catégorie 1” : Montre les 7 films les mieux notés d’une catégorie donnée. 
“Catégorie 2” : Montre les 7 films les mieux notés d’une autre catégorie.
“Catégorie 3” : Idem sur une autre catégorie !

* Lorsqu’on clique sur le bouton du film en vedette ou sur l’image d’un des films une fenêtre modale s’ouvre. Dans cette fenêtre les informations suivantes doivent être présente :
   * L’image de la pochette du film
   * Le Titre du film
   * Le genre complet du film
   * Sa date de sortie
   * Son Rated
   * Son score Imdb
   * Son réalisateur
   * La liste des acteurs
   * Sa durée
   * Le pays d’origine
   * Le résultat au Box Office
   * Le résumé du film

__________

<h1 align="center">Insallation de l'API</h1>

Cette API exécutable localement peut être installée en suivant les étapes décrites ci-dessous.
L'usage de pipenv est recommandé, mais des instuctions utilisant venv et pip sont également fournies plus bas.
Si pipenv n'est pas encore installé sur votre ordinateur, vous trouverez des instuctions d'installation détaillées
[sur cette page](docs/pipenv/installation-fr.md).

### Installation et exécution de l'application avec pipenv

1. Cloner ce dépôt de code à l'aide de la commande `$ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` 
(vous pouvez également télécharger le code [en temps qu'archive zip](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande `$ cd ocmovies-api-fr`
3. Installez les dépendances du projet à l'aide de la commande `pipenv install` 
4. Créer et alimenter la base de données à l'aide de la commande `pipenv run python manage.py create_db`
5. Démarrer le serveur avec `pipenv run python manage.py runserver`

Lorsque le serveur fonctionne, après l'étape 5 de la procédure, l'API OCMovies peut 
être interrogée à partir des points d'entrée commençant par l'url de base 
[http://localhost:8000/api/v1/](http://localhost:8000/api/v1/). 
Le point d'entrée principal permettant de consulter les films est 
[http://localhost:8000/api/v1/titles](http://localhost:8000/api/v1/titles/).
Si vous accédez à cette url depuis un navigateur, ce dernier vous présentera une interface naviguable 
servant de documentation et de laboratoire d'expériementation.

Les étapes 1 à 4 ne sont requises que pout l'installation initiale.
Pour les lancements ultérieurs du serveur de l'API, il suffit d'exécuter l'étape 5 à partir du répertoire racine du projet.

### Installation et exécution de l'application sans pipenv (avec venv et pip)

1. Cloner ce dépôt de code à l'aide de la commande 
`$ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` 
 (vous pouvez également télécharger le code [en temps qu'archive zip](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande `$ cd ocmovies-api-fr`
3. Créer un environnement virtuel pour le projet avec `$ python -m venv env` sous windows ou 
`$ python3 -m venv env` sous macos ou linux.
4. Activez l'environnement virtuel avec `$ env\Scripts\activate` sous windows ou `$ source env/bin/activate` 
sous macos ou linux.
5. Installez les dépendances du projet avec la commande `$ pip install -r requirements.txt`
6. Créer et alimenter la base de données avec la commande `$ python manage.py create_db`
7. Démarrer le serveur avec `$ python manage.py runserver`

Lorsque le serveur fonctionne, après l'étape 7 de la procédure, l'API OCMovies peut être interrogée à partir des points 
d'entrée commençant par l'url de base [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/). 
Le point d'entrée principal permettant de consulter les films est [http://localhost:8000/api/v1/titles](http://localhost:8000/api/v1/titles/).
Si vous accédez à cette url depuis un navigateur, ce dernier vous présentera une interface naviguable servant de 
documentation et de laboratoire d'expériementation.
Les étapes 1 à 6 ne sont requises que pout l'installation initiale.
Pour les lancements ultérieurs du serveur de l'API, il suffit d'exécuter les étapes 4 et 7 à partir du répertoire 
racine du projet.

Ci-joint le README complet de l'API
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LaurentJouron/JustStreamIt/blob/main/OCMovies/README.md">
        <img width="100px"
          src="https://user.oc-static.com/upload/2020/09/18/16004298163529_P5.png" /><br />
        <sub><b>ReadMe OC_Movies</b></sub></a><br />
      <a href="https://github.com/LaurentJouron/JustStreamIt/blob/main/OCMovies/README.md" title="ReadMe OC_Movies" ></a> 
    </td>
  </tr>
</table>

___________

<h1 align="center">Languages utilisés</h1>
Pour réaliser le CSS j'ai utilisé le compilateur SASS. 
<table>
  <tr>
    <td align="center">
      <a href="https://developer.mozilla.org/fr/docs/Web/HTML">
        <img width="100px"
          src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748__340.png" /><br />
        <sub><b>HTML</b></sub></a><br />
      <a href="https://developer.mozilla.org/fr/docs/Web/HTML" title="HTML" ></a> 
    </td>
    <td align="center">
      <a href="https://developer.mozilla.org/fr/docs/Web/CSS">
        <img width="100px"
          src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747__340.png" /><br />
        <sub><b>CSS</b></sub></a><br />
      <a href="https://developer.mozilla.org/fr/docs/Web/CSS" title="CSS" ></a> 
    </td>
    <td align="center">
      <a href="https://sass-lang.com/">
        <img width="90px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02xZl2fjUhm-bGFzQJs2-n8iUFbUITr3zcg&usqp=CAU" /><br />
        <sub><b>SASS</b></sub></a><br />
      <a href="https://sass-lang.com/" title="SASS" ></a> 
    </td>
    <td align="center">
      <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript">
        <img width="90px"
          src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400__340.png" /><br />
        <sub><b>JavaScript</b></sub></a><br />
      <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript" title="JavaScript" ></a> 
    </td>
  </tr>
</table>

___________
<h1 align="center">EDI</h1>
Quand j'utilise HTML, CSS ou JavaScript, j'ai une préférence pour Visual studio code et son extension Emmet.

[Doc Emmet](https://code.visualstudio.com/docs/editor/emmet)

<table>
  <tr>
    <td align="center">
      <a href="https://visualstudio.microsoft.com/fr/">
        <img width="110px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-H3CcAG7w2nXSnlqldVWR-ER4mvFfLgqYxA&usqp=CAU" /><br />
        <sub><b>Visuable Studio Code</b></sub></a><br />
      <a href="https://visualstudio.microsoft.com/fr/" title="Visuable Studio Code" ></a>
    </td>
  </tr>
</table>

___
<h1 align="center">Auteur et collaborateurs</h1>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LaurentJouron">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlW-w7O7g3hQTw8qcIAy3LCRhiHg5tUPfvVg&usqp=CAU"
          width="100px;"/><br />
        <sub><b>Laurent Jouron</b></sub></a><br />
      <a href="https://openclassrooms.com/fr/" title="Étudiant">🈸</a>
      <a href="https://github.com/LaurentJouron/JustStreamIt" title="Codeur de l'application">💻</a>
    </td>
    <td align="center">
      <a href="https://github.com/thierhost">
        <img src="https://avatars.githubusercontent.com/u/7854284?s=100&v=4"
          width="100px;"/><br />
        <sub><b>Thierno Thiam</b></sub></a><br />
      <a href="https://github.com/thierhost" title="Mentor de Laurent">👨‍🏫</a> 
      <a href="https://www.python.org/dev/peps/pep-0008/" title="Doc PEP 8">📄</a>
    </td>
  </tr>
</table>
