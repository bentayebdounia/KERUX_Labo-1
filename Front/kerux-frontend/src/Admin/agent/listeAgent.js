import React, { useState, useEffect } from "react";
import ServiceAdmin from "../../service/serviceAdmin";
import ModifierAgent from "./modifierAgent";
import moment from "moment";

//import ServiceRole from '../../service/service.role'

export default function ListeAgent() {
  const [personnes, setPersonnes] = useState([]);
  const [role, setRole] = useState("");
  const [recherche, setRecherche] = useState("");
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateN, setDate_n] = useState("");
  const [adr, setAdr] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [fonction, setFonction] = useState("");
  const [role_agent, setRole_agent] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [postsPerPage] = useState(4);

  const [offset, setOffset] = useState(0);

  //recuperer les agent enregistrer à la bdd
  useEffect(() => {
    getAllPersonne();
  }, [offset]);

  //la fonction de recupération des agents de la bdd
  const getAllPersonne = () => {
    ServiceAdmin.getPagePersonne(postsPerPage, offset).then((res) => {
      setPersonnes(res.data);
      //console.log(res.data);
    });
  };

 

  //recupérer des agents par "id" / "nom" / "prenom"
  function getElement() {
    if (role === "") getAllPersonne();
    else if (role === "id") {
      //console.log(recherche);
      ServiceAdmin.getPersonneById(recherche).then((res) => {
        setPersonnes(res.data);
      });
    } else if (role === "nom") {
      ServiceAdmin.getPersonneByNom(recherche).then((res) => {
        setPersonnes(res.data);
      });
    } else if (role === "prenom") {
      ServiceAdmin.getPersonneByPrenom(recherche).then((res) => {
        setPersonnes(res.data);
      });
    }
  }

  //fonction de structurer la date pour l'afficher au tableau

  const dateModif = (date1) => {
    var date = moment.utc(date1).format("DD-MM-YYYY");
    
    const words = date.split("-");
    //var a = parseInt(words[0])+'-'+(words[1])+'-'+(words[2])

    var d = new Date(words[2], words[1] - 1, words[0]);
    var nextDay = new Date(d.getTime());
    nextDay.setDate(d.getDate() + 1);
    // console.log(nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

    return nextDay.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateModif2 = (date) => {

    const words = date.split("/");
    return words[2] + "-" + words[1] + "-" + words[0];
  };

  //fonction d'émigration les données d'un agent pour le modifier
  const modifier = (
    id,
    nom,
    prenom,
    dateN,
    adr,
    tel,
    fonction,
    role,
    mot_passe
  ) => {
    // e.preventDefault();
    setId(id);
    setNom(nom);
    setPrenom(prenom);
    setDate_n(dateN);
    setAdr(adr);
    setTel(tel);
    setFonction(fonction);
    setRole_agent(role);
    setPassword(mot_passe);
    handleShow();
  };

  return (
    <div>
      <h1 id="titre">Liste des agent</h1>
      <div>
        <section className="section" id="modifierAgent">
          <div className="mb-3 row agent">
            <select
              className="form-select"
              aria-label="Default select example"
              id="roleAgent"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" selected></option>
              <option value="id">ID</option>
              <option value="nom">Nom</option>
              <option value="prenom">Prénom</option>
            </select>

            <div className="input-group col-sm-9">
              <input
                type="text"
                className="form-control"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
              <button
                className="btn "
                type="button"
                id="button-addon2"
                onClick={(e) => getElement(e)}
                style={{ background: "rgb(123, 23, 15)" }}
              >
                <i className="bi bi-search" style={{ fontSize: "1.25rem" }}></i>
              </button>
            </div>

            {/* Liste des agents */}
            <div className="divTab">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Date de naissance</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">N° téléphone</th>
                    <th scope="col">Fonction</th>
                    <th scope="col">Role</th>
                    <th scope="col">Mot de passe</th>
                    <th scope="col"> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {personnes.map((personne, key) => (
                    <tr key={key}>
                      <td>{personne.id_personne}</td>
                      <td>{personne.nom}</td>
                      <td>{personne.prenom}</td>
                      <td>{dateModif(personne.date_naissance)}</td>
                      <td>{personne.adresse}</td>
                      <td>{"0" + personne.num_tel}</td>
                      <td>{personne.fonction}</td>
                      <td>{personne.nom_role}</td>
                      <td>{personne.mot_passe}</td>
                      <td>
                        <input
                          onClick={(e) =>
                            modifier(
                              personne.id_personne,
                              personne.nom,
                              personne.prenom,
                              dateModif(personne.date_naissance),
                              personne.adresse,
                              "0" + personne.num_tel,
                              personne.fonction,
                              personne.fk_role,
                              personne.mot_passe
                            )
                          }
                          type="button"
                          className="btn"
                          style={{ background: "#4f8b2a", color: "white" }}
                          value="MODIFIER"
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  {offset > 0 && (
                    <li className="page-item">
                      <a
                        onClick={() => setOffset(offset - 4)}
                        href="#"
                        className="page-link"
                        style={{ color: "#7B170F" }}
                      >
                        precident
                      </a>
                    </li>
                  )}

                  <li className="page-item">
                    <a
                      onClick={() => {
                        setOffset(0);
                      }}
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      onClick={() => {
                        setOffset(4);
                      }}
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      ......
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      onClick={() => setOffset(offset + 4)}
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      suivant
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>

      {/** appel de compsant de modification */}
      {show && (
        <ModifierAgent
          id={id}
          nom={nom}
          prenom={prenom}
          dateN={dateModif2(dateN)}
          adr={adr}
          tel={tel}
          fonction={fonction}
          role={role_agent}
          password={password}
          show={show}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}
