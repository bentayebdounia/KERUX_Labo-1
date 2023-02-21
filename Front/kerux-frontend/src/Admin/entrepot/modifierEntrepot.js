import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

import serviceEntrepot from "../../service/service.entrepot";

const ModifierEntrepot = (props) => {

  const [nomEntrepot, setNomEtrepot] = useState(props.nom_entrepot);
  const [type, setType] = useState(props.type_entrepot);
  const [airStock, setAirStock] = useState(props.air_stockage);
  const [capacite, setCapacite] = useState(props.capacite);
  const [adr, setAdr] = useState(props.adresse);

  const verificetionChamp = () => {
    if (
      nomEntrepot !== "" &&
      type !== "" &&
      airStock !== "" &&
      capacite !== "" &&
      adr !== ""
    ) {
      //console.log(verifier);
      return true;
    } else {
      //console.log(verifier);
      return false;
    }
  };

  const modifier = async (e) => {
    if (verificetionChamp) {
      await serviceEntrepot.updateEntrepot(
        nomEntrepot,
        type,
        airStock,
        capacite,
        adr
      );
      setNomEtrepot("");
      setType("");
      setAirStock("");
      setAdr("");
      setCapacite("");
      
      props.handleClose();
    }
  };

  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Agent</Modal.Title>
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

            {verificetionChamp() === false && nomEntrepot === "" && (
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
            {verificetionChamp() === false && type === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez selectionner un type d'entrepot
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="airStockage" className="col-sm-2 col-form-label">
            L'air de stockage
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
            {verificetionChamp() === false && airStock === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez selectionner l'air de stockage{" "}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="capacite" className="col-sm-2 col-form-label ">
            Capacite
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="capacite"
              value={capacite}
              onChange={(e) => setCapacite(e.target.value)}
            />
            {verificetionChamp() === false && capacite === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir la capacite
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
            {verificetionChamp() === false && adr === "" && (
              <p style={{ color: "red", fontSize: "11px" }}>
                {" "}
                *Veillez saisir l'adresse'
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

export default ModifierEntrepot;
