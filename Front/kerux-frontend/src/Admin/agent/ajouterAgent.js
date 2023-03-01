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
  const [fonction, setFonction] = useState("")
  const [role, setRole] = useState([]);
  const [mot_passe, setPassword] = useState("");
  const [carteIdentite, setCarte_identite] = useState("")

  const [fk_role, setFk_role] = useState("");

  const [verifier, setVerifier] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message , setMessage ] = useState("")

 
//recuperer les roles des agent de la bdd
  useEffect(() => {
    serviceRole.getRole().then((res) => {
      setRole(res.data);
    });
  }, []);

//verifier les champs
  const verificetionChamp = () => {
    if (
      nom !== "" &&
      prenom !== "" &&
      date_naissance !== "" &&
      adresse !== "" &&
      num_tel !== "" &&
      num_tel.length === 10 &&
      num_tel[0] === "0" &&
      fk_role !== "" &&
      fonction !== "" && 
      carteIdentite !== ""
      
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
     // setPassword("");
      setVerifier(false);
      return false;
    }
  };

  //ajouter l'agent à la bdd
  const saveAgent = (e) => {
    e.preventDefault();

    const agent = {
      nom,
      prenom,
      date_naissance,
      num_tel,
      adresse,
      fonction,
      fk_role,
      mot_passe
      
    };
    if (verificetionChamp()) {
      //console.log("agent =>" + JSON.stringify(agent));
      serviceAdmin.ajouterAgent(agent).then((res) => {
       // console.log(res.data);
        if (!! res.data.id_personne ) {
          setNom("");
          setPrenom("");
          setDateN("");
          setAdr("");
          setTel("");
          setFk_role("");
          setPassword("");
          setFonction("")

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
            Nom <span style={{ color: "red" }}>*</span>
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
            Prénom <span style={{ color: "red" }}>*</span>
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
                *Veillez saisir le prénom
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="DNagent" className="col-sm-3 col-form-label ">
            Date de naissance <span style={{ color: "red" }}>*</span>
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
            Adresse <span style={{ color: "red" }}>*</span>
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
            N° téléphone <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="numAgent"
              value={num_tel}
              onChange={(e) => setTel(e.target.value)}
            />
            {verifier === false &&( num_tel === "" || num_tel.length <10) && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir le numéro de telephone
              </p>
            )}
            {(num_tel.length > 10 || num_tel[0] !== "0") && num_tel !== "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Le numéro de téléphone est incorrect
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="fonction" className="col-sm-3 col-form-label">
            Fonction <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="fonction"
              value={fonction}
              onChange={(e) => setFonction(e.target.value)}
            />
            {verifier === false && fonction === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir la fonction de l'agent
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="roleAgentAjout" className="col-sm-3 col-form-label">
            Role <span style={{ color: "red" }}>*</span>
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
            {verifier === false && fk_role === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez séléctionner le role
              </p>
            )}
          </div>
        </div>

        {fk_role !== "3" && (
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
              Mot de passe <span style={{ color: "red" }}>*</span>
            </label>
            <div className="col-sm-9">
              <input
                type="text"
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

        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
            Carte d'identité <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-sm-9">
            <div className="input-group ">
              <input
                type="file"
                className="form-control"
                id="inputfile"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                value={carteIdentite}
                onChange={(e) => setCarte_identite(e.target.value)}
                required
              />
            </div>
            {verifier === false && carteIdentite === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez séléctionner le scanne de la carte d'identité
              </p>
            )}
          </div>
        </div>

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
      {show && (
        <ModelReponse
          show={show}
          handleClose={handleClose}
          titre={""}
          message={message}
        />
      )}
    </div>
  );
}
