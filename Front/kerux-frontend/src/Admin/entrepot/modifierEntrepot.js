import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

import serviceEntrepot from "../../service/service.entrepot";

const ModifierEntrepot = (props) => {

  const [nomEntrepot, setNomEtrepot] = useState(props.nom_entrepot);
  const [type, setType] = useState(props.type_entrepot);
  const [airStock, setAirStock] = useState(props.air_stockage);
  const [capacite, setCapacite] = useState(props.capacite);
  const [adr, setAdr] = useState(props.adresse);
  const [exist, setExist] = useState(props.exist);
  const [verifier, setVerifier] = useState();
  const toggleSwitch = () => {
    setExist(!exist);
  };
 const verificetionChamp = () => {
   if (
     nomEntrepot !== "" &&
     type === "chambre froide" &&
     airStock !== "" &&
     capacite !== "" &&
     adr !== ""
   ) {
      //alert(verifier);
     setVerifier(true);
     return true;
   } else if (
     nomEntrepot !== "" &&
     type !== "chambre froide" &&
     type !== "" &&
     airStock === "" &&
     capacite !== "" &&
     adr !== ""
   ) {
     alert(verifier);
     setVerifier(true);
     return true;
   } else {
     setVerifier(false);
     return false;
   }
 };

  const modifier = async (e) => {
    
    if (verificetionChamp() === true) {
      await serviceEntrepot.updateEntrepot(
        nomEntrepot,
        type,
        airStock,
        capacite,
        adr,
        exist,
        props.id_entrepot
      );
      setNomEtrepot("");
      setType("");
      setAirStock("");
      setAdr("");
      setCapacite("");
      setExist("");

      props.handleClose();
      props.showRacine()
    }
  };

  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier entrepot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 row">
          <label htmlFor="nomEntrepot" className="col-sm-2 -form-label ">
            Nom d'entrepot
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="nomEntrepot"
              value={nomEntrepot}
              onChange={(e) => setNomEtrepot(e.target.value)}
            />

            {verifier === false && nomEntrepot === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir le nom de l'entrepot
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="typeEntrepot" className="col-sm-2 col-form-label">
            Type d'entrepot
          </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              aria-label="Default select example"
              id="typeEntrepot"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option selected></option>
              <option value="chambre froide">Chambre froide</option>
              <option value="entrepot">Entrepot</option>
            </select>
            {verifier === false && type === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez selectionner un type d'entrepot
              </p>
            )}
          </div>
        </div>

        {type === "chambre froide" && (
          <div className="mb-3 row">
            <label htmlFor="airStockage" className="col-sm-2 col-form-label">
              Air de stockage
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                aria-label="Default select example"
                id="airStockage"
                value={airStock}
                onChange={(e) => setAirStock(e.target.value)}
              >
                <option selected></option>
                <option value="Refrigerer -positif">Refrigerer -positif</option>
                <option value="Refrigerer -negatif">Refrigerer -negatif</option>
              </select>
              {verifier === false && airStock === "" && (
                <p style={{ color: "red", fontSize: "11px" }}>
                  {" "}
                  *Veillez selectionner l'air de stockage{" "}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mb-3 row">
          <label htmlFor="capacite" className="col-sm-2 col-form-label ">
            Capacité
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="capacite"
              value={capacite}
              onChange={(e) => setCapacite(e.target.value)}
            />
            {verifier === false && capacite === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir la capacité
              </p>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="adress" className="col-sm-2 col-form-label ">
            Adresse
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="adress"
              value={adr}
              onChange={(e) => setAdr(e.target.value)}
            />
            {verifier === false && adr === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir l'adresse'
              </p>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <div className="form-check form-switch col-sm-2 ">
            <input
              className="form-check-input mx-1"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={exist}
              onChange={toggleSwitch}
            />
          </div>
          <div className="col-sm-7">
            {exist === true && (
              <label className="form-check-label" for="flexSwitchCheckDefault">
                Exite
              </label>
            )}
            {exist === false && (
              <label className="form-check-label" for="flexSwitchCheckDefault">
                N'existe pas
              </label>
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

export default ModifierEntrepot;
