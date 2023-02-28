import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModelReponse from "../../Models/Model.repense";
import serviceActuelProcess from "../../service/sevice.actuelProcess";
import serviceAlert from "../../service/service.alert";
const ModifierAlert = (props) => {
  const [dateAlert, setDatealert] = useState("");
  const [etape, setEtape] = useState(props.etp);
  const [idBoxe, setIdboxe] = useState(props.id);
  const [message, setMessage] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chercher = async () => {
    if (etape === "" || idBoxe === "" || dateAlert === "") {
      setMessage(" Veillez remplir les champs  ");
      handleShow(true);
    } else if (etape !== "" && idBoxe !== "" && dateAlert !== "") {
      serviceActuelProcess.getIdProcess(etape, idBoxe).then((res) => {
        if (res.data === "boxe n'existe pas") {
          setMessage(" Vérifier votre ID  ");
          handleShow(true);
        } else {
          console.log(res.data);
          modifier(res.data.id_process);
          //setIdprocess(res.data.id_process)
          setEtape("");
          setIdboxe("");
          setDatealert("");
        }
      });
    }
  };

  const modifier = async (idProcess) => {
    serviceAlert.updateDateAlert(idProcess, dateAlert).then((res) => {
      console.log(res.data);
      setMessage(res.data);
      handleShow();
    });
  };
  const annuler = () => {
    props.handleClose();
  };

  return (
    <>
      <Modal
        size="xl"
        scrollable={true}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#7B170F" }}>
            <i
              className="bi bi-bell-fill"
              style={{ color: "#7B170F", fontSize: "25px" }}
            ></i>{" "}
            Modifier un alerte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: "5%", marginRight: "5%" }}>
            <div className="mb-2 row">
              <div className="col-sm-4">
                <label htmlFor="etape" className="col-sm-1 form-label">
                  Etape 
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="etape"
                  value={etape}
                  onChange={(e) => setEtape(e.target.value)}
                >
                  <option value=""></option>
                  <option value="enregistrement">Enregistrement</option>
                  <option value="nettoyage">Nettoyage</option>
                  <option value="coupage">Coupage</option>
                  <option value="conditionnement">Conditionnement</option>
                  <option value="sortie">Sortie</option>
                </select>
              </div>

              <div className="col-sm-4">
                <label className="col-sm-3 form-label">ID de box</label>
                <input
                  type="text"
                  className="form-control "
                  value={idBoxe}
                  onChange={(e) => setIdboxe(e.target.value)}
                />
              </div>

              <div className="col-sm-4">
                <label className="col-sm-4 form-label">Date d'alerte</label>
                <input
                  type="date"
                  className="form-control "
                  value={dateAlert}
                  onChange={(e) => setDatealert(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={() => annuler()}
          >
            ANNULER
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => chercher()}
          >
            MODIFIER
          </button>
        </Modal.Footer>
      </Modal>

      {show && (
        <ModelReponse
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          message={message}
          titre={"Message"}
        />
      )}
    </>
  );
};

export default ModifierAlert;
