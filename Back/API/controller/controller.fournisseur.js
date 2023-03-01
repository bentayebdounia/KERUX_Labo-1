const pool = require("../db");
const queries = require("../queries/quierie.fornisseur");

ajouterFournisseur = (req, res) => {
  date_enregistement = new Date();
  const {
    id_fournisseur,
    nom_fournisseur,
    forme_juridique,
    adresse_fournisseur,
    email,
    activite,
    modalite_paiement,
    type_paiement,
    nature_livraison,
    r_c,
    a_i,
    n_i_f,
    n_i_s,
  } = req.body;
  pool.query(
    queries.ajouterFourniseur,
    [
      id_fournisseur,
      nom_fournisseur,
      forme_juridique,
      adresse_fournisseur,
      email,
      activite,
      modalite_paiement,
      type_paiement,
      nature_livraison,
      date_enregistement,
      r_c,
      a_i,
      n_i_f,
      n_i_s,
    ],
    (error, result) => {
      if (error) {
        
        console.log(error);
      };
      
      res.status(200).json(result.rows[0]);

    }
  );
};

updateFournisseur = (req, res) => {
  const id_fournisseur = req.params.id_fournisseur;

  const {
    nom_fournisseur,
    forme_juridique,
    adresse_fournisseur,
    email,
    activite,
    modalite_paiement,
    type_paiement,
    nature_livraison,   
    r_c,
    a_i,
    n_i_f,
    n_i_s
  } = req.body;

  pool.query(
    queries.updateFournisseur,
    [
      nom_fournisseur,
      forme_juridique,
      adresse_fournisseur,
      email,
      activite,
      modalite_paiement,
      type_paiement,
      nature_livraison,
      r_c,
      a_i,
      n_i_f,
      n_i_s,
      id_fournisseur,
    ],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};

ajouterContact = (req, res) => {
  const { fk_fournisseur, nom_contact, numero_telephone } = req.body;
  pool.query(
    queries.ajouterContact,
    [fk_fournisseur, nom_contact, numero_telephone],
    (error, result) => {
      if (error) throw error;
      res.status(200).send("contact bien ajouter");
    }
  );
};
getIdFournisseur = (req, res) => {
  const id_fournisseur = req.params.id_fournisseur
  pool.query(queries.getIdFournisseur, [id_fournisseur], (error, result) => {
    if (error) throw error;
    const notExiste = result.rows.length;
    if (!notExiste) {
      res.send("ID n'existe pas");
    } else res.send("ID existe");
  });
}

getFournisseurByNom = (req, res) => {
  const categorie = req.params.categorie;
  pool.query(
    queries.getFournisseurByCategorie,
    [categorie + "%"],
    (error, result) => {
      if (error) throw error;
      const notExiste = result.rows.length;
      if (!notExiste) {
        res.send("ID n'existe pas");
      } else res.status(200).json(result.rows);
    }
  );
};
getAllFournisseur = (req, res) => {
  pool.query(queries.getAllFournisseur, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

getAllFournisseurPage = (req, res) => {
  const limit = req.params.limit
  const offset = req.params.offset
  pool.query(queries.getAllFournisseurPage, [limit, offset], (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  } );
}

getFournisseurByNom_Activite_Id = (req, res) => {
  const nom_fournisseur = req.params.nom_fournisseur;
  const categorie = req.params.categorie;
  const id_fournisseur = req.params.id_fournisseur;
  pool.query(
    queries.getFournisseurByNomOrActiviteieOrid,
    [nom_fournisseur + "%", categorie + "%", id_fournisseur],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};

module.exports = {
  ajouterFournisseur,
  updateFournisseur,
  ajouterContact,
  getFournisseurByNom,
  getAllFournisseur,
  getAllFournisseurPage,
  getFournisseurByNom_Activite_Id,
  getIdFournisseur,
};
