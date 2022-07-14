# JustStreamIt


Rendez-vous depuis un terminal à la racine du répertoire OCMovies avec la commande $ cd OCMovies
Créer un environnement virtuel pour le projet avec $ python -m venv env sous windows ou $ python3 -m venv env sous macos ou linux.
Activez l'environnement virtuel avec $ env\Scripts\activate sous windows ou $ source env/bin/activate sous macos ou linux.
Installez les dépendances du projet avec la commande $ pip install -r requirements.txt
Créer et alimenter la base de données avec la commande $ python manage.py create_db
Démarrer le serveur avec $ python manage.py runserver

Lorsque le serveur fonctionne, après l'étape 7 de la procédure, l'API OCMovies peut être interrogée à partir des points d'entrée commençant par l'url de base http://localhost:8000/api/v1/. Le point d'entrée principal permettant de consulter les films est http://localhost:8000/api/v1/titles. Si vous accédez à cette url depuis un navigateur,ce dernier vous présentera une interface naviguable servant de documentation et de laboratoire d'expériementation. Vous trouvez également une documentation plus formelle en bas de ce README.

ctrl + Maj + C pour quitter le serveur local
env\Scripts\deactivate pour désactiver l'environnement virtuel
