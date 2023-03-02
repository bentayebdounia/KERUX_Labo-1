import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import serviceRole from "../../service/service.role";
import serviceFournisseur from "../../service/service.fournisseur";

const ModifierFournisseur = (props) => {
  const [idFournisseur, setIdfournisseur] = useState(props.id_fournisseur);
  const [nomFournisseur, setNomFournisseur] = useState(props.nomFournisseur);
  const [formJuridique, setFormJuridique] = useState(props.formJuridique);
  const [RC, setRc] = useState(props.rc);
  const [AI, setAi] = useState(props.ai);
  const [NIF, setNif] = useState(props.nif);
  const [NIS, setNis] = useState(props.nis);
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
      formJuridique !== "" &&
      adresse !== "" &&
      activite !== "" &&
      modalite !== "" &&  
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
        RC,
        AI,
        NIF,
        NIS
      );
      setIdfournisseur("");
      setNomFournisseur("");
      setFormJuridique("");
      setAdresse("");
      setEmail("");
      setActivite("");
      setModalite("");
      setTypePaiement("");
      setNaturelivraison("");
      setRc("");
      setAi("");
      setNif("");
      setNis("");

      props.handleClose();
    }
  };

  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Fournisseur</Modal.Title>
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
            {(activite === "fournisseur de poulet" ||
              activite === "fournisseur des legumes" ||
              activite === " ") && (
              <select
                className="form-select"
                aria-label="Default select example"
                id="activite"
                value={activite}
                onChange={(e) => setActivite(e.target.value)}
                required
              >
                <option selected></option>
                <option value="fournisseur de poulet">
                  Fournisseur de poulet
                </option>
                <option value="fournisseur des legumes">
                  Fournisseur des legumes
                </option>
                <option value="">Autre</option>
              </select>
            )}
            {activite !== "fournisseur de poulet" &&
              activite !== "fournisseur des legumes" &&
              activite !== " " && (
                <input
                  type="text"
                  className="form-control"
                  id="adrFournisseur"
                  value={activite}
                  onChange={(e) => setActivite(e.target.value)}
                  required
                />
              )}
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
          <label htmlFor="adrFournisseur" className="col-sm-2 col-form-label ">
            R.C
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
            A.I
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
          <label htmlFor="adrFournisseur" className="col-sm-2 col-form-label ">
            N.I.F
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
          CONFIRMER
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModifierFournisseur;
