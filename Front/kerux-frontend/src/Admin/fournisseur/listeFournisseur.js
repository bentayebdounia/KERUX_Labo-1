import React, { useState, useEffect } from "react";
import serviceFournisseur from "../../service/service.fournisseur";
import Pagination from "../../test/pagination/pagination";
import ModifierFournisseur from "./modifierFournisseur";
const ListFournisseur = () => {
  const [rechercheValue, setRechercheValue] = useState("");

  const [fournisseurs, setFournisseurs] = useState([]);
  const [fournisseur, setFournisseur] = useState("");
  const [idFournisseur, setIdfournisseur] = useState("");
  const [nomFournisseur, setNomFournisseur] = useState("");
  const [formJuridique, setFormJuridique] = useState("");
  const [RC, setRc] = useState("");
  const [AI, setAi] = useState("");
  const [NIF, setNif] = useState("");
  const [NIS, setNis] = useState("");
  const [adresse, setAdresse] = useState();
  const [email, setEmail] = useState("");
  const [activite, setActivite] = useState("");
  const [modalite, setModalite] = useState("");
  const [typePaiement, setTypePaiement] = useState("");
  const [natureLivraison, setNaturelivraison] = useState("");

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

 
  const [postsPerPage] = useState(4);
 
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    serviceFournisseur.getPageFournisseur(postsPerPage, offset).then((res) => {
      setFournisseurs(res.data);
    });
  }, [offset]);
  

  const getFournisseur = () => {
    serviceFournisseur
      .getFournisseurByNomOrActiviteOrId(rechercheValue, rechercheValue)
      .then((res) => {
        setFournisseurs(res.data);
      });
    if (rechercheValue === '') {
      serviceFournisseur.getAllFournisseur().then((res) => {
        setFournisseurs(res.data);
      });
    }
  };

  const modifier = (
    id_fournisseur,
    nom_fournisseur,
    forme_juridique,
    adresse_fournisseur,
    email,
    activite,
    modalite_paiement,
    type_paiement,
    nature_livraison,
    rc,
    ai,
    nif,
    nis

  ) => {
    // e.preventDefault();
    setIdfournisseur(id_fournisseur);
    setNomFournisseur(nom_fournisseur);
    setFormJuridique(forme_juridique);
    setRc(rc)
    setAi(ai)
    setNif(nif)
    setNis(nis)
    setAdresse(adresse_fournisseur);
    setEmail(email);
    setActivite(activite);
    setModalite(modalite_paiement);
    setTypePaiement(type_paiement);
    setNaturelivraison(nature_livraison);
    handleShow()

  };

  return (
    <>
      <div>
        <h1 id="titre">Liste des fournisseurs</h1>
        <div>
          <section className="section" id="modifierAgent">
            <div className="input-group col-sm-9">
              <input
                type="text"
                className="form-control"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={rechercheValue}
                onChange={(e) => setRechercheValue(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={(e) => getFournisseur(e)}
                style={{ background: "rgb(123, 23, 15)" }}
              >
                <i className="bi bi-search" style={{ fontSize: "1.25rem" }}></i>
              </button>
            </div>

            <div className="divTab">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID fournisseur</th>
                    <th scope="col">Nom fournisseur</th>
                    <th scope="col">Activit??</th>
                    <th scope="col">Adresse fournisseurs</th>
                    <th scope="col">Email</th>
                    <th scope="col">Forme juridique </th>
                    <th scope="col">R.C</th>
                    <th scope="col">A.I</th>
                    <th scope="col">N.I.F</th>
                    <th scope="col">N.I.S</th>
                    <th scope="col">Modalite de paiement</th>
                    <th scope="col">Type de paiement</th>
                    <th scope="col">Nature de livraison</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseurs.map((fournisseur, key) => (
                    <tr key={key}>
                      <td>{fournisseur.id_fournisseur}</td>
                      <td>{fournisseur.nom_fournisseur}</td>
                      <td>{fournisseur.activite}</td>
                      <td>{fournisseur.adresse_fournisseur}</td>
                      <td>{fournisseur.email}</td>
                      <td>{fournisseur.forme_juridique}</td>
                      <td>{fournisseur.r_c}</td>
                      <td>{fournisseur.a_i}</td>
                      <td>{fournisseur.n_i_f}</td>
                      <td>{fournisseur.n_i_s}</td>
                      <td>{fournisseur.modalite_paiement}</td>
                      <td>{fournisseur.type_paiement}</td>
                      <td>{fournisseur.nature_livraison}</td>
                      <td>
                        <input
                          onClick={(e) =>
                            modifier(
                              fournisseur.id_fournisseur,
                              fournisseur.nom_fournisseur,
                              fournisseur.forme_juridique,
                              fournisseur.adresse_fournisseur,
                              fournisseur.email,
                              fournisseur.activite,
                              fournisseur.modalite_paiement,
                              fournisseur.type_paiement,
                              fournisseur.nature_livraison,
                              fournisseur.r_c,
                              fournisseur.a_i,
                              fournisseur.n_i_f,
                              fournisseur.n_i_s
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
                        onClick={() => setOffset(offset-4)}
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
                        setOffset(0)
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
                        setOffset(4)
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
                      onClick={() => setOffset(offset+4)}
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
          </section>
        </div>
        {show && (
          <ModifierFournisseur
            id_fournisseur={idFournisseur}
            nomFournisseur={nomFournisseur}
            formJuridique={formJuridique}
            rc={RC}
            ai={AI}
            nif={NIF}
            nis={NIS}
            adress={adresse}
            email={email}
            activite={activite}
            modalite={modalite}
            typePaiement={typePaiement}
            natureLivraison={natureLivraison}
            show={show}
            handleClose={handleClose}
          />
        )}
      </div>
    </>
  );
};

export default ListFournisseur;
