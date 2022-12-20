CREATE DATABASE kerux_labo;

CREATE TABLE categorie(
    id_categorie SERIAL PRIMARY KEY ,
    nom_categorie VARCHAR (200)
);

CREATE TABLE produit (
    id_produit SERIAL PRIMARY KEY,
    nom_produit VARCHAR (200),
    duree_experation INT ,
    fk_categorie INT REFERENCES categorie(id_categorie)
);


CREATE TABLE role (
    id_role SERIAL PRIMARY KEY,
    nom_role VARCHAR(200)
);

CREATE TABLE personne(
    id_personne SERIAL PRIMARY KEY,
    nom VARCHAR(200),
    prenom VARCHAR(200),
    date_naissance DATE,
    num_tel INT,
    adresse VARCHAR(500),
    fk_role INT REFERENCES role(id_role),
    mot_passe VARCHAR(20)
);


CREATE TABLE fournisseur (

    id_fournisseur SERIAL PRIMARY KEY,
    categorie VARCHAR (100)
    nom_fournisseur VARCHAR(500),
    forme_juridique VARCHAR (200),
    adresse_fournisseur VARCHAR (100),
    email VARCHAR (100),
    activite VARCHAR(100),
    modalite_paiement VARCHAR (100),
    type_paiement VARCHAR (100),
    nature_livraison VARCHAR (100) ,
    categorie VARCHAR (100),
    date_enregistement DATE

);

CREATE TABLE contact (
    id_contact SERIAL PRIMARY KEY, 
    fk_fournisseur INT REFERENCES fournisseur(id_fournisseur),
    nom_contact VARCHAR (100),
    numero_telephone INT 

);

CREATE TABLE bon (
    id_bon SERIAL PRIMARY KEY,
    fk_fournisseur INT REFERENCES fournisseur(id_fournisseur),
    acheteur VARCHAR (100),
    scanne_bon VARCHAR(500),
    type_bon VARCHAR(100),
    datee DATE ,
    heure TIME,
    recepteur VARCHAR (200),
    livreur VARCHAR (200)
);

CREATE TABLE produit_fourni(
    id_produit SERIAL PRIMARY KEY,
    categorie VARCHAR (200),
    nom_produit VARCHAR (200),
    poids_fourni FLOAT,
    nombre_fourni INT,
    datee DATE, 
    heure TIME,
    fk_bon INT REFERENCES bon(id_bon)
);

CREATE TABLE entrepot (
    id_entrepot SERIAL PRIMARY KEY,
    nom_entrepot VARCHAR(200),
    type_entrepot VARCHAR(200),
    air_stockage VARCHAR(200),
    capacite VARCHAR (200),
    adresse VARCHAR(200),
    id_personne INT;
    date_enregistement_entrepot DATE
);

CREATE TABLE stock (
    id_stock SERIAL PRIMARY KEY,
    date_entree DATE,
    date_sortie DATE,
    poids_sortie FLOAT,
    fk_entrepot INT REFERENCES entrepot(id_entrepot)
);

CREATE TABLE process_historique(
    id_processHistorique SERIAL PRIMARY KEY ,
    categorie VARCHAR (200),
    nom_produit VARCHAR (200),
    etape VARCHAR (100),
    poids FLOAT ,
    nombre INT,
    marine BOOLEAN,
    mi_cuissan BOOLEAN,
    datee DATE ,
    heure TIME,
    id_enregistrement VARCHAR(100),
    id_nettoyage VARCHAR(100),
    id_coupage VARCHAR(100),
    id_marinade VARCHAR(100),
    id_conditionnement VARCHAR (100),
    id_sortie VARCHAR (100),
    id_personne INT ,
    fk_proditFourni INT REFERENCES produit_fourni(id_produit),
    fk_stock INT REFERENCES stock (id_stock),
    note VARCHAR(500),
    id_gnerate VARCHAR (500)
);

CREATE TABLE process(
    id_process SERIAL PRIMARY KEY ,
    categorie VARCHAR (200),
    nom_produit VARCHAR (200),
    etape VARCHAR (100),
    poids FLOAT ,
    nombre INT,
    marine BOOLEAN,
    mi_cuissan BOOLEAN,
    datee DATE ,
    heure TIME,
    id_enregistrement VARCHAR(100),
    id_nettoyage VARCHAR(100),
    id_coupage VARCHAR(100),
    id_marinade VARCHAR(100),
    id_conditionnement VARCHAR (100),
    id_sortie VARCHAR (100),
    id_personne INT ,
    fk_proditFourni INT REFERENCES produit_fourni(id_produit),
    fk_stock INT REFERENCES stock (id_stock),
    note VARCHAR(500),
    id_gnerate VARCHAR (500)
);
CREATE TABLE agentprocess (
    id_agent SERIAL PRIMARY KEY,
    id_gnerateprocess VARCHAR (200),
    id_personne INT
);

CREATE TABLE box_couper (
    id SERIAL PRIMARY KEY ,
    id_produit VARCHAR (200),
    id_enregistrement VARCHAR (200),
    id_nettoyage VARCHAR (200),
    id_generate VARCHAR (200),
    datee DATE,
    heure TIME
) 


-- pas encore creer (on vas voire ca avec le service comercial)
CREATE TABLE inventaire (
    id_inventaire SERIAL PRIMARY KEY ,
    titre VARCHAR (200),
    categorie VARCHAR (200),
    magasin VARCHAR(200)
);




