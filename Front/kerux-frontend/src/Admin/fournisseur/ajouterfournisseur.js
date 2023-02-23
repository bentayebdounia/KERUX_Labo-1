import React, { useState, useEffect } from "react";
import Contact from "./contact";
import ServiceFournisseur from "../../service/service.fournisseur";
import ModelReponse from "../../Models/Model.repense";
const AjouterFournisseur = (props) => {
  const [idFournisseur, setIdFournisseur] = useState("");
  const [nomFournisseur, setNomFournisseur] = useState("");
  const [categorie, setCategorie] = useState("");
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
  const [message, setMessage] = useState("");

  const [nomContact, setNomContact] = useState("");
  const [numContact, setNumContact] = useState("");
  const [verifier, setVerifier] = useState();

  const [contacts, setContacts] = useState([
    {
      nomContact: "",
      numContact: 0,

      date: new Date(),
    },
  ]);

  let contact_;

  const verificetionChamp = () => {
    if (
      idFournisseur !== "" &&
      idFournisseur.length <= 2 &&
      nomFournisseur !== "" &&
      categorie !== "" &&
      formJuridique !== "" &&
      adresse !== "" &&
      email !== "" &&
      activite !== "" &&
      modalite !== "" &&
      typePaiement !== "" &&
      natureLivraison !== "" &&
      RC !== "" &&
      AI !== "" &&
      NIF !== ""
    ) {
      setVerifier(true);
      return true;
    } else {
      setVerifier(false);
      return false;
    }
  };
  const fonctionAjouter = async (e) => {
    e.preventDefault();

    //console.log(contacts);
    //console.log(nomFournisseur, formJuridique, adresse, email,  activite, modalite, typePaiement, natureLivraison, categorie);
    if (verificetionChamp()) {
      await ServiceFournisseur.getIdFournisseure(idFournisseur).then((res) => {
        if (res.data === "ID n'existe pas") {
          ServiceFournisseur.ajouterFournisseur(
            idFournisseur,
            nomFournisseur,
            formJuridique,
            RC,
            AI,
            NIF,
            NIS,
            adresse,
            email,
            activite,
            modalite,
            typePaiement,
            natureLivraison,
            categorie
          ).then((res) => {
            var i = 1;
            while (i < contacts.length) {
              //console.log(contacts[i].nomContact);
              ServiceFournisseur.ajouterContact(
                res.data.id_fournisseur,
                contacts[i].nomContact,
                contacts[i].numContact
              ).then((result) => {
                //console.log(result.data);
              });
              i++;
            }
            if ((res.data = "bien ajouter" && i === contacts.length)) {
              setIdFournisseur("");
              setNomFournisseur("");
              setCategorie("");
              setFormJuridique("");
              setRc("");
              setAi("");
              setNif("");
              setNis("");
              setAdresse("");
              setEmail("");
              setActivite("");
              setModalite("");
              setTypePaiement("");
              setNaturelivraison("");
              setContacts([
                {
                  nomContact: "",
                  numContact: 0,

                  date: new Date(),
                },
              ]);
              setMessage("Fournisseur bien ajouter ");
              handleShow();
            } else {
              setMessage("Fournisseur n'est pas bien ajouter");
              handleShow();
            }
          });
        }
        else {
          setMessage("Le ID fournisseur exist déjà");
          handleShow();
        }
      });
    } else {
      setMessage("Veillez remplir les champs");
      handleShow();
    }
  };

  contact_ = (
    <>
      {contacts.map((contact, key) => {
        return (
          <div className="row gy-2 gx-2 align-items-left" key={key}>
            <Contact
              nomContact={contact.nomContact}
              onNomContactChange={(newnomContact) => {
                const newContacts = [...contacts];
                newContacts[key].nomContact = newnomContact;
                setContacts(newContacts);
              }}
              numContact={contact.numContact}
              onNumContactChange={(newNumContact) => {
                const newContacts = [...contacts];
                newContacts[key].numContact = newNumContact;
                setContacts(newContacts);
              }}
            />
            <div className="col-sm-3">
              {key === 0 && (
                <button
                  className="btn btn-dark btn-outline-dark "
                  type="button"
                  id="button-addon2"
                  onClick={() => {
                    const newContacts = [...contacts];

                    newContacts.push({
                      nomContact: "",
                      numContact: 0,
                      date: new Date(),
                    });

                    setContacts(
                      newContacts.sort((a, b) => {
                        if (a.date < b.date) return 1;
                        if (a.date > b.date) return -1;
                        return 0;
                      })
                    );
                  }}
                >
                  <i className="bi bi-plus-lg" style={{ color: "white" }}></i>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <div>
        <h1 id="titre">Ajouter un fournisseur</h1>

        <section className="section" id="ajouterAgent">
          <form className="needs-validation" noValidate>
            <div className="mb-3 row">
              <label
                htmlFor="nomFournisseur"
                className="col-sm-2 col-form-label "
              >
                ID Fournisseur <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="nomFournisseur"
                  value={idFournisseur}
                  onChange={(e) => setIdFournisseur(e.target.value)}
                  required
                />
                {verifier === false && idFournisseur === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir le id de fournisseur{" "}
                  </p>
                )}
                {idFournisseur.length > 2 && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *L'id de fournisseur peux pas avoir plus de 2 caractère{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="nomFournisseur"
                className="col-sm-2 col-form-label "
              >
                Nom Fournisseur <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="nomFournisseur"
                  value={nomFournisseur}
                  onChange={(e) => setNomFournisseur(e.target.value)}
                  required
                />
                {verifier === false && nomFournisseur === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir le nom de fournisseur{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="activite" className="col-sm-2 col-form-label ">
                Activite <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="activite"
                  value={activite}
                  onChange={(e) => setActivite(e.target.value)}
                  required
                />
                {verifier === false && activite === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir l'activité de fournisseur{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="adrFournisseur"
                className="col-sm-2 col-form-label "
              >
                Adresse fournisseur <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="adrFournisseur"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
                {verifier === false && adresse === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir l'adresse de fournisseur{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label ">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {verifier === false && email === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir l'email de fournisseur{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="contact" className="col-sm-2 col-form-label ">
                Contact <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">{contact_}</div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="formeJuridique"
                className="col-sm-2 col-form-label"
              >
                Forme juridique <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="formeJuridique"
                  value={formJuridique}
                  onChange={(e) => setFormJuridique(e.target.value)}
                  required
                >
                  <option selected></option>
                  <option value="personne physique">Personne physique</option>
                  <option value="SARL">SARL</option>
                  <option value="EURL">EURL</option>
                </select>
                {verifier === false && formJuridique === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir la forme juridique de fournisseur{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="adrFournisseur"
                className="col-sm-2 col-form-label "
              >
                R.C <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-4 ">
                <input
                  type="text"
                  className="form-control"
                  id="adrFournisseur"
                  value={RC}
                  onChange={(e) => setRc(e.target.value)}
                  required
                />
                {verifier === false && RC === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir le R.C{" "}
                  </p>
                )}
              </div>

              <label
                htmlFor="adrFournisseur"
                className="col-sm-2 col-form-label "
                style={{ paddingLeft: "100px" }}
              >
                A.I <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control"
                  id="adrFournisseur"
                  value={AI}
                  onChange={(e) => setAi(e.target.value)}
                  required
                />
                {verifier === false && AI === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir le A.I{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="adrFournisseur"
                className="col-sm-2 col-form-label "
              >
                N.I.F <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-4 ">
                <input
                  type="number"
                  className="form-control"
                  id="adrFournisseur"
                  value={NIF}
                  onChange={(e) => setNif(e.target.value)}
                  required
                />
                {verifier === false && RC === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir le N.I.F{" "}
                  </p>
                )}
              </div>

              <label
                htmlFor="adrFournisseur"
                className="col-sm-2 col-form-label "
                style={{ paddingLeft: "100px" }}
              >
                N.I.S
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control"
                  id="adrFournisseur"
                  value={NIS}
                  onChange={(e) => setNis(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="modalitePaiement"
                className="col-sm-2 col-form-label "
              >
                Modalite de paiement<span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="modalitePaiement"
                  value={modalite}
                  onChange={(e) => setModalite(e.target.value)}
                  required
                >
                  <option selected></option>
                  <option value="versement a l'avance">
                    versement à l'avance
                  </option>
                  <option value="versement par tranche">
                    versement par tranche
                  </option>
                  <option value="versement cash">versement cash</option>
                </select>
                {verifier === false && modalite === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir la modalité de paiement{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="typePaiement"
                className="col-sm-2 col-form-label "
              >
                Type de paiement <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="typePaiement"
                  value={typePaiement}
                  onChange={(e) => setTypePaiement(e.target.value)}
                  required
                >
                  <option selected></option>
                  <option value="par cheque">par chèque</option>
                  <option value="par espece">par espèce</option>
                </select>
                {verifier === false && typePaiement === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir le type de paiement{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="natureLivraison"
                className="col-sm-2 col-form-label "
              >
                Nature de livraison <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="natureLivraison"
                  value={natureLivraison}
                  onChange={(e) => setNaturelivraison(e.target.value)}
                  required
                />
                {verifier === false && natureLivraison === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir la nature de livraison{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="categorie" className="col-sm-2 col-form-label ">
                Categorie <span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="categorie"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  required
                >
                  <option selected></option>
                  <option value="fournisseur de poulet">
                    Fournisseur de poulet
                  </option>
                  <option value="fournisseur des legumes">
                    Fournisseur des legumes
                  </option>
                </select>
                {verifier === false && categorie === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir la categorie{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="d-grid gap-2 my-4">
              <button
                className="btn1"
                type="submit"
                id="ajouterbtn"
                onClick={(e) => fonctionAjouter(e)}
              >
                AJOUTER
              </button>
            </div>
          </form>
        </section>
        {show && (
          <ModelReponse
            show={show}
            handleClose={handleClose}
            titre={""}
            message={message}
          />
        )}
      </div>
    </>
  );
};

export default AjouterFournisseur;
