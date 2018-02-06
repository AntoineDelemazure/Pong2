
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
CREATE TABLE p_joueurs
(
	joueur_id BIGINT NOT NULL AUTO_INCREMENT,
	joueur_nom VARCHAR(100) NOT NULL,
	joueur_prenom VARCHAR(100) NOT NULL,
	joueur_rang INTEGER,
	joueur_username VARCHAR(100),
	joueur_password VARCHAR(100),
	joueur_admin BOOLEAN NOT NULL,
	PRIMARY KEY (joueur_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE p_tournois
(
	tournoi_id BIGINT NOT NULL AUTO_INCREMENT,
	tournoi_date DATETIME NOT NULL,
	tournoi_termine BOOLEAN NOT NULL,
	tournoi_ouvert BOOLEAN NOT NULL,
	tournoi_tour_actuel INTEGER,
	tournoi_arbitre_id BIGINT,
	PRIMARY KEY (tournoi_id),
	FOREIGN KEY (tournoi_arbitre_id) REFERENCES p_joueurs(joueur_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE p_matchs
(
	match_id BIGINT NOT NULL AUTO_INCREMENT,
	match_tour INTEGER,
	match_tournament_id BIGINT,
	PRIMARY KEY (match_id),
	FOREIGN KEY (match_tournament_id) REFERENCES p_tournois(tournoi_id)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE p_participe
(
	participe_tournoi_id BIGINT NOT NULL,
	participe_joueur_id BIGINT NOT NULL,
	PRIMARY KEY (participe_tournoi_id,participe_joueur_id),
	FOREIGN KEY (participe_tournoi_id) REFERENCES p_tournois(tournoi_id),
	FOREIGN KEY (participe_joueur_id) REFERENCES p_joueurs(joueur_id)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE p_joue
(
	joue_score INT,
	joue_match_id BIGINT NOT NULL,
	joue_joueur_id BIGINT NOT NULL,
	PRIMARY KEY (joue_match_id,joue_joueur_id),
	FOREIGN KEY (joue_match_id) REFERENCES p_matchs(match_id),
	FOREIGN KEY (joue_joueur_id) REFERENCES p_joueurs(joueur_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
