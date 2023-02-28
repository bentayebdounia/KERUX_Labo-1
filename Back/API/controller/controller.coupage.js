const pool = require("../db");
const queries = require("../queries/queries.coupage");
const q = require("../queries/queries");
const actual = require("../queries/queries.ActualiteProcess");

const dateNow = () => {
  var today = new Date();
  datee =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() );

  return datee;
};

const dateNow2 = () => {
  var today = new Date();
  datee =
    today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();

  return datee;
};

const HeureNow = () => {
  var today = new Date();
  heure =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return heure;
};
const TimeNow = () => {
  var today = new Date();
  heure =
    today.getHours() +
    "" +
    today.getMinutes() +
    "" +
    today.getSeconds() +
    "" +
    today.getMilliseconds();

  return heure;
};
const generieIdCoupage = (fk_proditFourni, etape) => {
  const spl = etape.split("");
  //onsole.log(spl[0]+spl[1])
  var id =
    fk_proditFourni + "" + spl[0] + spl[1] + "" + dateNow2() + "" + TimeNow();
  return id;
};

const day = (day) => {
  if (day < 10) return 0 + "" + 0 + "" + day;
  else if (day >= 10 && day < 100) return 0 + "" + day;
  else return day;
};

const generieIdCoup = (id, cle) => {
  var today = new Date();
  var datt = 0;
  switch (today.getMonth()) {
    case 0:
      datt = day(today.getDate());
      break;

    case 1:
      datt = day(31 + today.getDate());
      break;

    case 2:
      datt = day(60 + today.getDate());
      break;

    case 3:
      datt = day(91 + today.getDate());
      break;

    case 4:
      datt = 121 + today.getDate();
      break;

    case 5:
      datt = 152 + today.getDate();
      break;
    case 6:
      datt = 182 + today.getDate();
      break;

    case 7:
      datt = 213 + today.getDate();
      break;

    case 8:
      datt = 244 + today.getDate();
      break;

    case 9:
      datt = 274 + today.getDate();
      break;

    case 10:
      datt = 305 + today.getDate();
      break;

    case 11:
      datt = 335 + today.getDate();
      break;

    default:
      break;
  }

  const year = today.getFullYear().toString().split("");

  var n = id.split("-")[1] + "" + datt + "" + year[2]+""+year[3] + "" + cle+"3";
  return n;
};

ajouterProcessCoupage = (req, res) => {
  var datee = new Date();
  var heure = HeureNow();

  const {
    categorie,
    nom_produit,
    etape,
    poids,
    nombre,
    id_nettoyage,
    fk_proditFourni,
    cle,
  } = req.body;
  var id_gnerate = generieIdCoup(id_nettoyage, cle);
  console.log(id_gnerate);
  console.log(
    categorie +
      " " +
      nom_produit +
      " " +
      etape +
      " " +
      poids +
      " " +
      nombre +
      " " +
      datee +
      " " +
      heure +
      " " +
      id_nettoyage +
      " " +
      fk_proditFourni +
      " " +
      id_gnerate
  );
  pool.query(
    queries.ajouterProcessCoup,
    [
      categorie,
      nom_produit,
      etape,
      poids,
      nombre,
      datee,
      heure,
      id_nettoyage,
      fk_proditFourni,
      id_gnerate,
    ],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows[0]);
    }
  );
  pool.query(
    queries.ajouterProcessCoupHist,
    [
      categorie,
      nom_produit,
      etape,
      poids,
      nombre,
      datee,
      heure,
      id_nettoyage,
      fk_proditFourni,
      id_gnerate,
    ],
    (error, result) => {
      if (error) throw error;
      res.status(200);
    }
  );
};
modifierProcessCoupage = (req, res) => {
  const id_coupage = parseInt(req.params.id_coupage);
  const { fk_stock } = req.body;
  pool.query(
    queries.ModifyProcessCoup,
    [fk_stock, id_coupage],
    (error, result) => {
      if (error) throw error;
      res.status(200).send("process coupage bien modifier ");
    }
  );
  pool.query(
    queries.ModifyProcessCoupHist,
    [fk_stock, id_coupage],
    (error, result) => {
      if (error) throw error;
      res.status(200).send("process coupage bien modifier ");
    }
  );
};
getProduitEnAttente = (req, res) => {
  pool.query(actual.ActualProcess, ["nettoyage"], (error, result) => {
    res.status(200).json(result.rows);
  });
};
getProduitEnStock = (req, res) => {
  pool.query(actual.ActualProcessEnStock, ["nettoyage"], (error, result) => {
    res.status(200).json(result.rows);
  });
};

getProcessId = (req, res) => {
  const id = req.params.id_gnerate;
  pool.query(queries.getProcessByIdSortie, [id], (error, result) => {
    const notExiste = result.rows.length;
    if (!notExiste) {
      res.send("ID n'existe pas");
    } else {
      pool.query(queries.getProcessbyIdNettoyage, [id], (error, resultat) => {
        const notExiste = resultat.rows.length;
        if (!notExiste) {
          res.status(200).json(result.rows[0]);
        } else res.send("box deja couper");
      });
    }
  });
};

ajouterBoxCoupage = (req, res) => {
  var datee = dateNow();
  var heure = HeureNow();
  const { id_produit, id_enregistrement, id_nettoyage, id_generate } = req.body;
  pool.query(
    queries.ajouterBox_couper,
    [id_produit, id_enregistrement, id_nettoyage, id_generate, datee, heure],
    (error, resultat) => {
      if (error) throw error;
      res.status(200).json(resultat.rows[0]);
    }
  );
};

getProcessByDateHeure = (req, res) => {
  pool.query(q.getProcessBydateHeure, ["coupage"], (error, result) => {
    res.status(200).json(result.rows);
  });
};

getProcessByEtapes_categorie = (req, res) => {
  const categorie = req.params.categorie;
  pool.query(
    q.getProcessByEtapes_categorie,
    ["coupage", categorie + "%"],
    (error, result) => {
      res.status(200).json(result.rows);
    }
  );
};

getProcessByEtapes_produit = (req, res) => {
  const nom_produit = req.params.nom_produit;
  pool.query(
    q.getProcessByEtapes_produit,
    ["coupage", nom_produit + "%"],
    (error, result) => {
      res.status(200).json(result.rows);
    }
  );
};

getProcessByEtapes_idGnerate = (req, res) => {
  const id_gnerate = req.params.id_gnerate;
  pool.query(
    q.getProcessByEtapes_idGnerate,
    ["coupage", id_gnerate],
    (error, result) => {
      res.status(200).json(result.rows);
    }
  );
};

getProcessNettoyageTble = (req, res) => {
  pool.query(actual.ProcessTble, ["nettoyage"], (error, result) => {
    res.status(200).json(result.rows);
  });
};

getBox_coupageTble = (req, res) => {
  pool.query(actual.box_coupage_Tble, (error, result) => {
    res.status(200).json(result.rows);
  });
};

module.exports = {
  ajouterProcessCoupage,
  ajouterBoxCoupage,
  modifierProcessCoupage,
  getProcessId,
  getProcessByDateHeure,
  getProcessByEtapes_categorie,
  getProcessByEtapes_produit,
  getProcessByEtapes_idGnerate,
  getProcessNettoyageTble,
  getBox_coupageTble,

  getProduitEnAttente,
  getProduitEnStock,
};
