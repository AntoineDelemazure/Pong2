#Installation et lancement

Clonez le repository.
Le back et le front sont séparés, il faut donc installer les modules de Node dans les sous dossier back et front avec la commande "npm install" dans chancun d'entre eux.
Le back nécessite la création d'une base de donnée mySQL pour fonctionner (plus de détails dans la doc (peut-être)), il faut donc créer, avant de la lancer ou de le tester, un base nommée "ping_db". Le code se chargera de créer les tables.

Pour tester le back, placez vous dans le répertoire "back", et lancez la commande "npm test"
(vous pouvez découvrir comment ça marche dans le fichier package.json)

Pour lancer le back, placez vous dans le répertoire "back", et lancez la commande "node app.js"
(A moins que nous ayons créé un script et oublié de modifier ce markdown)

#Générer de la doc

Si vous voulez étoffer la documentation, vous pouvez écrire des commentaires comme vous le feriez pour de la doc java, puis lancez la commande "npm run-script gdoc"