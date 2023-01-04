//// table perrsonne ***********************************************

//--ajouter personne 
const postPersonne = "INSERT INTO personne (nom, prenom, date_naissance, num_tel, adresse, fk_role) "
                        +"VALUES ($1, $2, $3, $4, $5, $6)"

const getPersonneById = "SELECT * FROM personne WHERE id_personne= $1"

const getPersonneByNom = "SELECT * FROM personne WHERE nom ILIKE $1"

const getPersonneByPrenom = "SELECT * FROM personne WHERE prenom ILIKE $1"

const Login = "SELECT * FROM personne WHERE id_personne= $1 AND mot_passe= $2"

const getRoleById = "SELECT nom_role FROM role WHERE id_role = $1"

const getRoleByNom = "SELECT id_role FROM role WHERE nom_role = $1"

const getPersonneByNomOrPrenom = "SELECT id_personne, nom , prenom  FROM personne WHERE nom ILIKE $1 OR prenom ILIKE $2"

/////// Entrepot *********************************
const ajouterEntrepot = "INSERT INTO entrepot ( nom_entrepot, type_entrepot, air_stockage, capacite, adresse, exist ,date_enregistrement_entrepot)"
                        +"VALUES ( $1, $2, $3, $4, $5, $6, $7 )"
const getEnrepot = "SELECT id_entrepot, nom_entrepot FROM entrepot WHERE exist=TRUE"
/////// Stock *********************************
// --ajouter  au stock
const ajouterStock = "INSERT INTO stock ( date_entree, fk_entrepot) VALUES ( $1, $2 ) RETURNING id_stock"
// --ajouter sortie de stock
const ModifyStock = "UPDATE stock SET date_sortie= $1 , poids_sortie= $2 WHERE id_stock= $3 " 

///////////////////////// Process *******************************
// -- Reception*************************
const ajouterReception = "INSERT INTO bon ( fk_fournisseur, acheteur, type_bon, datee, heure, recepteur, livreur )VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING id_bon , recepteur , fk_fournisseur"
const getBonBydateHeure = "SELECT * FROM bon , fournisseur WHERE fk_fournisseur=id_fournisseur ORDER BY datee DESC , heure DESC"
const getbonByFournisseur = "SELECT * FROM bon , fournisseur WHERE fk_fournisseur=id_fournisseur ORDER BY fk_fournisseur"
const getBonByNomFournisseur = "SELECT * FROM bon , fournisseur WHERE fk_fournisseur=id_fournisseur AND nom_fournisseur ILIKE $1  ORDER BY datee DESC, heure DESC"

const getProdFourni = " SELECT * FROM bon , fournisseur, produit_fourni WHERE fk_fournisseur=id_fournisseur AND id_bon = fk_bon   ORDER BY fk_fournisseur;"
//const getBonByNomFournisseur = "SELECT * FROM bon, fournisseur WHERE "

const getProdByNomFourniseur ="SELECT * FROM bon , fournisseur, produit_fourni WHERE fk_fournisseur=id_fournisseur AND nom_fournisseur ILIKE $1  AND id_bon = fk_bon  ORDER BY fk_fournisseur"



// -- Produit fourni *****************
const ajouterProduitFourni = "INSERT INTO produit_fourni (categorie, nom_produit, poids_fourni, nombre_fourni, datee, heure, fk_bon )"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"

                                // -- process enregistrement ******************
const ajouterProcessEnreg = "INSERT INTO process (categorie, nom_produit, etape, poids, nombre, datee, heure,  fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9) RETURNING categorie, nom_produit,poids, nombre, id_gnerate "

const ajouterProcessEnregHist = "INSERT INTO process_historique (categorie, nom_produit, etape, poids, nombre, datee, heure,  fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9)"

                        

// Modifier process
const ModifyProcess = "UPDATE process SET fk_stock=$1 WHERE id_gnerate=$2 "
const ModifyProcessHist = "UPDATE process_historique SET fk_stock=$1 WHERE id_gnerate=$2 "

//get process by date and heure

const getProcessBydateHeure = "SELECT * FROM process_historique WHERE etape=$1 ORDER BY datee DESC , heure DESC;"
//GET process by etape and categorie order by date and heure
const getProcessByEtapes_categorie= "SELECT * FROM process_historique WHERE etape=$1 AND  categorie ILIKE $2 ORDER BY datee DESC , heure DESC"

//GET process by etape and nom_produit order by date and heure
const getProcessByEtapes_produit= "SELECT * FROM process_historique WHERE etape=$1 AND  nom_produit ILIKE $2 ORDER BY datee DESC , heure DESC"

//GET process by etape annd id generate
const getProcessByEtapes_idGnerate=  "SELECT * FROM process_historique WHERE etape=$1 AND id_gnerate=$2"

// -- process Marinade ******************
const ajouterProcessMarinade = "INSERT INTO process (categorie, nom_produit, etape, marine, mi_cuissan, datee, heure, id_marinade, fk_proditFourni)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9) RETURNING *"

const ajouterProcessMarinadeHist = "INSERT INTO process_historique (categorie, nom_produit, etape, marine, mi_cuissan, datee, heure, id_marinade, fk_proditFourni)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9) RETURNING *"

const ModifyProcessMarinade = "UPDATE process SET fk_stock = $1 WHERE  id_marinade = 2$"
const ModifyProcessMarinadeHist = "UPDATE process_historique SET fk_stock = $1 WHERE  id_marinade = 2$"


//ajouter un agent de process *****************************
const ajouterAgentProcess = "INSERT INTO agentprocess (  id_gnerateprocess, id_personne) VALUES( $1, $2 )"

const getProcessById = "SELECT fk_proditfourni , fk_stock, categorie, nom_produit, etape FROM process WHERE id_gnerate= $1"

module.exports={
    postPersonne,
    getPersonneById,

    Login,

    getRoleById,
    getRoleByNom,
    getPersonneByNom,
    getPersonneByPrenom,
    getPersonneByNomOrPrenom,

    ajouterReception,

    ajouterProduitFourni,

    
    ajouterProcessEnreg,
    ajouterProcessEnregHist, 
    ModifyProcess,
    ModifyProcessHist,

    
 
    

    ajouterProcessMarinade,
    ajouterProcessMarinadeHist,
    ModifyProcessMarinade,
    ModifyProcessMarinadeHist,

   
 
    ajouterEntrepot,
    getEnrepot,

    ajouterStock,
    ModifyStock,

    ajouterAgentProcess,

    getProcessById,

    getProcessBydateHeure,
    getProcessByEtapes_categorie,
    getProcessByEtapes_produit,
    getProcessByEtapes_idGnerate,

    getBonBydateHeure,
    getbonByFournisseur,
    getProdFourni,
    getProdByNomFourniseur,
    getBonByNomFournisseur,


}