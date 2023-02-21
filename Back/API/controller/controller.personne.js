const pool = require("../db");
const queries = require("../queries/queries");

AjouterPersonne = (req, res) => {
  const { nom, prenom, date_naissance, num_tel, adresse, fk_role, mot_passe } =
    req.body;
  pool.query(
    queries.postPersonne,
    [nom, prenom, date_naissance, num_tel, adresse, fk_role, mot_passe],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows[0]);
    }
  );
};

updatePersonne = (req, res) => {
  const id_personne = req.params.id_personne;

  const { nom, prenom, date_naissance, num_tel, adresse, fk_role, mot_passe } =
    req.body;
  pool.query(
    queries.updatePersonne,
    [
      nom,
      prenom,
      date_naissance,
      num_tel,
      adresse,
      fk_role,
      mot_passe,
      id_personne,
    ],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};
getId = (req, res) => {
  const id = parseInt(req.params.id_personne);
  pool.query(queries.getPersonneById, [id], (error, result) => {
    const notExiste = result.rows.length;
    if (!notExiste) {
      res.send("ID n'existe pas");
    } //res.send("ID existe")
    else res.status(200).json(result.rows);
    //console.log(result.rows[1]);
  });
};

getNom = (req, res) => {
  const nom_personne = req.params.nom;
  pool.query(
    queries.getPersonneByNom,
    [nom_personne + "%"],
    (error, result) => {
      const notExist = result.rows.length;

      res.status(200).json(result.rows);
      //console.log(result.rows[1]);
    }
  );
};

getPrenom = (req, res) => {
  const prenom_personne = req.params.prenom;
  pool.query(
    queries.getPersonneByPrenom,
    [prenom_personne + "%"],
    (error, result) => {
      res.status(200).json(result.rows);
      //console.log(result.rows[1]);
    }
  );
};

getAllPersonne = (req, res) => {
  pool.query("SELECT * FROM personne ORDER BY id_personne", (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

Login = (req, res) => {
  const id = parseInt(req.params.id_personne);
  const password = req.params.mot_passe;
  pool.query(queries.Login, [id, password], (error, result) => {
    const notExist = !result.rows.length;
    if (notExist) {
      res.send("Mot de passe incorrect");
    } else {
      //res.send("Mot de passe correct")
      console.log(res.json(result.rows));
    }
  });
};

getPersonneByNomOrPnom = (req, res) => {
  const nom = req.params.nom;
  const prenom = req.params.prenom;
  pool.query(
    queries.getPersonneByNomOrPrenom,
    [nom + "%", prenom + "%"],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};

module.exports = {
  AjouterPersonne,
  updatePersonne,
  getId,
  Login,
  getAllPersonne,
  getNom,
  getPrenom,
  getPersonneByNomOrPnom,
};
