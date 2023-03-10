import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ServiceEntrepot from "../../service/service.entrepot";

const AjouterEntrepot = (props) => {
  const [nomEntrepot, setNomEtrepot] = useState("");
  const [type, setType] = useState("");
  const [airStock, setAirStock] = useState("");
  const [capacite, setCapacite] = useState("");
  const [adr, setAdr] = useState("");

  const [verifier, setVerifier] = useState();

  const verificetionChamp = () => {
    if (
      nomEntrepot !== "" &&
      type === "chambre froide" &&
      airStock !== "" &&
      adr !== ""
    ) {
      setVerifier(true);
      return true;
    } else if (
      nomEntrepot !== "" &&
      type !== "chambre froide" &&
      type !== "" &&
      airStock === "" &&
      adr !== ""
    ) {
      setVerifier(true);
      return true;
    } else {
      setVerifier(false);
      return false;
    }
  };

  const ajouterEntrepot = (e) => {
    e.preventDefault();
    //verificetionChamp()
    if (verificetionChamp() === true) {
      ServiceEntrepot.postEntrepot(
        nomEntrepot,
        type,
        airStock,
        capacite,
        adr
      ).then((res) => {
        console.log(res.data);
      });
      props.handleClose();
    }
  };

  const non = () => {
    props.handleClose();
  };

  //console.log(entrepot);

  return (
    <>
      <Modal size="xl" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#7B170F" }}>
            <i
              className="bi bi-house-fill"
              style={{ color: "#7B170F", fontSize: "25px" }}
            >
              {" "}
            </i>
            Ajouter un entrepot
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3 row">
            <label htmlFor="nomEntrepot" className="col-sm-2 -form-label ">
              Nom d'entrepot<span style={{ color: "red" }}>*</span>
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
              Type d'entrepot<span style={{ color: "red" }}>*</span>
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
                Air de stockage<span style={{ color: "red" }}>*</span>
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
                  <option value="Refrigerer -positif">
                    Refrigerer -positif
                  </option>
                  <option value="Refrigerer -negatif">
                    Refrigerer -negatif
                  </option>
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
              Capacit??
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="capacite"
                value={capacite}
                onChange={(e) => setCapacite(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="adress" className="col-sm-2 col-form-label ">
              Adresse<span style={{ color: "red" }}>*</span>
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
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={() => non()}>
            annuler
          </button>
          <button
            className="btn btn-success"
            type="submit"
            onClick={(e) => ajouterEntrepot(e)}
          >
            Enregistrer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AjouterEntrepot;
