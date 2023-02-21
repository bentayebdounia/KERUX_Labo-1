import React, { useState, useEffect } from "react";
import serviceRole from "../../service/service.role";
import serviceAdmin from "../../service/serviceAdmin";
import ModelReponse from "../../Models/Model.repense";


export default function AjouterAgent() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [date_naissance, setDateN] = useState("");
  const [adresse, setAdr] = useState("");
  const [num_tel, setTel] = useState("");
  const [role, setRole] = useState([]);
  const [mot_passe, setPassword] = useState("");
  const [recherche, setRecherche] = useState("");

  const [fk_role, setFk_role] = useState();
  const [confirmation, setConfirmation] = useState(false);

  const [verifier, setVerifier] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message , setMessage ] = useState("")

 

  useEffect(() => {
    serviceRole.getRole().then((res) => {
      setRole(res.data);
    });
  }, []);
  const verificetionChamp = () => {
    if (
      nom !== "" &&
      prenom !== "" &&
      date_naissance !== "" &&
      adresse !== "" &&
      num_tel !== "" &&
      role !== ""
    ) {
      if (fk_role !== "4") {
        if (mot_passe !== "") {
          setVerifier(true);
          return true;
        } else {
          setVerifier(false);
          return false;
        }
      } else {
        setVerifier(true);
        return true;
      }
    } else {
      setPassword("");
      setVerifier(false);
      return false;
    }
  };

  const saveAgent = (e) => {
    e.preventDefault();

    const agent = {
      nom,
      prenom,
      date_naissance,
      num_tel,
      adresse,
      fk_role,
      mot_passe,
    };
    if (verificetionChamp()) {
      console.log("agent =>" + JSON.stringify(agent));
      serviceAdmin.ajouterAgent(agent).then((res) => {
        console.log(res.data);
        if (!! res.data.id_personne ) {
          setNom("");
          setPrenom("");
          setDateN("");
          setAdr("");
          setTel("");
          setFk_role("");
          setPassword("");

          setMessage("Agent bien ajouter et son ID = " + res.data.id_personne);
          handleShow();
        } else {
          setMessage("Agent n'est pas bien ajouter");
          handleShow();
        }
      });
    }
  };

  return (
    <div>
      <h1 id="titre">Ajouter un agent</h1>

      <section className="section" id="ajouterAgent">
        <div className="mb-3 row">
          <label htmlFor="nomAgent" className="col-sm-3 col-form-label ">
            Nom
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="nomAgent"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            {verifier === false && nom === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir le nom{" "}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="prenomAgent" className="col-sm-3 col-form-label ">
            Prénom
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="prenomAgent"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            {verifier === false && prenom === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir le prenom
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="DNagent" className="col-sm-3 col-form-label ">
            Date de naissance
          </label>
          <div className="col-sm-9">
            <input
              type="date"
              className="form-control label"
              id="DNagent"
              value={date_naissance}
              onChange={(e) => setDateN(e.target.value)}
            />
            {verifier === false && date_naissance === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir la date de naissance
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="adresseAgent" className="col-sm-3 col-form-label ">
            Adresse
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="adresseAgent"
              value={adresse}
              onChange={(e) => setAdr(e.target.value)}
            />
            {verifier === false && adresse === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir l'adresse{" "}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="numAgent" className="col-sm-3 col-form-label ">
            N° téléphone
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="numAgent"
              value={num_tel}
              onChange={(e) => setTel(e.target.value)}
            />
            {verifier === false && num_tel === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir le numero de telephone
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="roleAgentAjout" className="col-sm-3 col-form-label">
            Role
          </label>
          <div className="col-sm-9">
            <select
              className="form-select"
              aria-label="Default select example"
              id="roleAgentAjout"
              value={fk_role}
              onChange={(e) => setFk_role(e.target.value)}
            >
              <option defaultValue=""></option>
              {role.map((fk_role) => (
                <option value={fk_role.id_role}> {fk_role.nom_role} </option>
              ))}
            </select>
            {verifier === false && role === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez selectionner le role
              </p>
            )}
          </div>
        </div>

        {fk_role !== "4" && (
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
              Mot de passe
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="password"
                value={mot_passe}
                onChange={(e) => setPassword(e.target.value)}
              />
              {verifier === false && mot_passe === "" && (
                <p style={{ color: "red", fontSize: "11px" }}>
                  {" "}
                  *Veillez saisir le mot de passe
                </p>
              )}
            </div>
          </div>
        )}
        <div className="d-grid gap-2 my-4">
          <button
            className="btn1"
            type="submit"
            id="ajouterbtn"
            onClick={(e) => saveAgent(e)}
          >
            AJOUTER
          </button>
        </div>
      </section>
      {show && <ModelReponse show = {show} handleClose= {handleClose} titre={""} message={message} />}
    </div>
  );
}
