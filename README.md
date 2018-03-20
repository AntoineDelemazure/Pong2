# Installation et lancement

## Back-end

 - Clonez le repository.

 - Placez-vous dans le dossier "back" et lancez la commande "npm install" pour télécharger les modules npm nécéssaires au projet.
 
 - Le back nécessite la création d'une base de donnée mySQL pour fonctionner, il faut donc lancer un serveur mySQL (avec EasyPhp par exemple), et sur ce serveur créer une base nommée "ping_db". Le code se chargera de créer les tables.

 - Pour tester, placez vous dans le répertoire "back", et lancez la commande "npm test" (vous pouvez découvrir comment ça marche dans le fichier package.json).

 - Pour lancer le serveur, placez vous dans le répertoire "back", et lancez la commande "npm start".

 - Pour générer la documentation, vous pouvez écrire des commentaires comme vous le feriez pour de la doc java, puis lancez la commande "npm run-script gdoc". La doc générée se trouve dans le dossier "out"
 
 - Les logs de l'appli sont sauvegardés dans le dossier "logs", créé automatiquement lors du lancement du serveur.
 
 ## Front-end

- Clonez le repository (si vous ne l'avez pas déjà fait pour le Back-end)

- Placez-vous dans le dossier "front/Ping" et lancez la commande "npm install" pour télécharger les modules npm nécéssaires au projet.

- Lancez d'abord le Back-end (en suivant les instructions ci-dessus) puis, toujours dans le dossier "front/Ping", lancez la commande "npm start"
