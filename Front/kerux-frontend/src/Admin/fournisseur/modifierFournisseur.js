import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import serviceRole from "../../service/service.role";
import serviceFournisseur from "../../service/service.fournisseur";

const ModifierFournisseur = (props) => {
  const [idFournisseur, setIdfournisseur] = useState(props.id_fournisseur);
  const [nomFournisseur, setNomFournisseur] = useState(props.nomFournisseur);
  const [categorie, setCategorie] = useState(props.categorie);
  const [formJuridique, setFormJuridique] = useState(props.formJuridique);
  const [adresse, setAdresse] = useState(props.adress);
  const [email, setEmail] = useState(props.email);
  const [activite, setActivite] = useState(props.activite);
  const [modalite, setModalite] = useState(props.modalite);
  const [typePaiement, setTypePaiement] = useState(props.typePaiement);
  const [natureLivraison, setNaturelivraison] = useState(props.natureLivraison);
  const [verifier, setVerifier] = useState();

  const verificetionChamp = () => {
    if (
      nomFournisseur !== "" &&
      categorie !== "" &&
      formJuridique !== "" &&
      adresse !== "" &&
      email !== "" &&
      activite !== "" &&
      modalite !== "" &&
      typePaiement !== "" &&
      natureLivraison !== ""
    ) {
      setVerifier(true);
      return true;
    } else {
      setVerifier(false);
      return false;
    }
  };
  const modifier = async (e) => {
    if (verificetionChamp) {
      await serviceFournisseur.modifierFournisseur(
        idFournisseur,
        nomFournisseur,
        formJuridique,
        adresse,
        email,
        activite,
        modalite,
        typePaiement,
        natureLivraison,
        categorie
      );
      setIdfournisseur('')
      setNomFournisseur('')
      setCategorie('')
      setFormJuridique('')
      setAdresse('')
      setEmail('')
      setActivite('')
      setModalite('')
      setTypePaiement('')
      setNaturelivraison('')

      props.handleClose()


    }
  };

  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Agent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 row">
          <label htmlFor="nomFournisseur" className="col-sm-2 col-form-label ">
            Nom Fournisseur
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
            Activite
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
          <label htmlFor="adrFournisseur" className="col-sm-2 col-form-label ">
            Adresse fournisseur
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
          <label htmlFor="formeJuridique" className="col-sm-2 col-form-label">
            Forme juridique
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
          <label htmlFor="email" className="col-sm-2 col-form-label ">
            Email
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
          <label
            htmlFor="modalitePaiement"
            className="col-sm-2 col-form-label "
          >
            Modalite de paiement
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
              <option value="versement a l'avance">versement à l'avance</option>
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
          <label htmlFor="typePaiement" className="col-sm-2 col-form-label ">
            Type de paiement
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
          <label htmlFor="natureLivraison" className="col-sm-2 col-form-label ">
            Nature de livraison
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
            Categorie{" "}
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
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn1"
          type="submit"
          id="ajouterbtn"
          onClick={(e) => modifier(e)}
        >
          MODIFIER
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModifierFournisseur;
