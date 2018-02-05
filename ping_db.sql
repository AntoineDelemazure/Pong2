
//Création de la base de données ping_db

CREATE DATABASE IF NOT EXISTS ping_db;
ALTER DATABASE ping_db CHARACTER SET utf8 COLLATE utf8_general_ci;

//Drop les tables

DROP TABLE IF EXISTS p_tournois;
DROP TABLE IF EXISTS p_joueurs;
DROP TABLE IF EXISTS p_matchs;
DROP TABLE IF EXISTS p_joue;
DROP TABLE IF EXISTS p_participe;

//Crée les tables
CREATE TABLE p_tournois
(
	tournoi_id BIGINT NOT NULL AUTO_INCREMENT,
	tournoi_date DATETIME,
	tournoi_termine BOOLEAN,
	tournoi_ouvert BOOLEAN,
	tournoi_tour_actuel INTEGER,
	PRIMARY KEY (tournoi_id)
)

CREATE TABLE p_joueurs
(
	joueur_id BIGINT NOT NULL AUTO_INCREMENT,
	joueur_nom VARCHAR(100),
	joueur_prenom VARCHAR(100),
	joueur_rang INTEGER,
	joueur_username VARCHAR(100),
	joueur_password VARCHAR(100),
	joueur_admin BOOLEAN,
	PRIMARY KEY (joueur_id)
)

CREATE TABLE p_matchs
(
	match_id BIGINT NOT NULL AUTO_INCREMENT,
	match_tour INTEGER,
	match_tournament_id BIGINT,
	PRIMARY KEY (match_id),
	FOREIGN KEY (match_tournament_id) REFERENCES p_tournois(tournoi_id)	
)

CREATE TABLE p_participe
(
	participe_tournoi_id BIGINT,
	participe_joueur_id BIGINT,
	PRIMARY KEY (participe_tournoi_id,participe_joueur_id),
	FOREIGN KEY (participe_tournoi_id) REFERENCES p_tournois(tournoi_id),
	FOREIGN KEY (participe_joueur_id) REFERENCES p_joueurs(joueur_id)	
)

CREATE TABLE p_joue
(
	joue_score BIGINT,
	joue_match_id BIGINT,
	joue_joueur_id BIGINT,
	PRIMARY KEY (joue_match_id,joue_joueur_id),
	FOREIGN KEY (joue_match_id) REFERENCES p_matchs(match_id),
	FOREIGN KEY (joue_joueur_id) REFERENCES p_joueurs(joueur_id)
)