import React, { useState, useEffect } from "react";
import ServiceAdmin from "../../service/serviceAdmin";
import ModifierAgent from "./modifierAgent";
import moment from "moment";
import Pagination from "../../test/pagination/pagination";
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
  const [role_agent, setRole_agent] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //les operation de pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = personnes.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(()=>{
    getAllPersonne()
  },[])

  const getAllPersonne = () => {
    ServiceAdmin.getPersonne().then((res) => {
      setPersonnes(res.data);
      //console.log(res.data);
    });
  };
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

  const dateNow = (date1) => {
    var date = moment.utc(date1).format("DD-MM-YYYY");
    const words = date.split("-");
    //var a = parseInt(words[0])+'-'+(words[1])+'-'+(words[2])

    var d = new Date(words[2], words[1] - 1, words[0]);
    var nextDay = new Date(d.getTime());
    nextDay.setDate(d.getDate() + 1);
    //console.log(nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

    return nextDay.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const modifier = (id, nom, prenom, dateN, adr, tel, role, mot_passe) => {
    // e.preventDefault();
    setId(id);
    setNom(nom);
    setPrenom(prenom);
    setDate_n(dateN);
    setAdr(adr);
    setTel(tel);
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
              <option selected></option>
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
                    <th scope="col">Role</th>
                    <th scope="col">Mot de passe</th>
                    <th scope="col"> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((personne, key) => (
                    <tr key={key}>
                      <td>{personne.id_personne}</td>
                      <td>{personne.nom}</td>
                      <td>{personne.prenom}</td>
                      <td>{dateNow(personne.date_naissance)}</td>
                      <td>{personne.adresse}</td>
                      <td>{personne.num_tel}</td>
                      <td>{personne.fk_role}</td>
                      <td>{personne.mot_passe}</td>
                      <td>
                        <input
                          onClick={(e) =>
                            modifier(
                              personne.id_personne,
                              personne.nom,
                              personne.prenom,
                              personne.date_naissance,
                              personne.adresse,
                              personne.num_tel,
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
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={personnes.length}
                paginate={paginate}
              />
            </div>
          </div>
        </section>
      </div>

      {show && (
        <ModifierAgent
          id={id}
          nom={nom}
          prenom={prenom}
          dateN={dateN}
          adr={adr}
          tel={tel}
          role={role_agent}
          password={password}
          show={show}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}
