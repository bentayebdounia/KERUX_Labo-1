import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AjouterStock from "./ajouterStock";

const ModalQStock = (props) => {
  const [showAjouterStock, setShowAjouterStock] = useState(false);
  const handleCloseAjouterStock = () => setShowAjouterStock(false);
  const handleShowAjouterStock = () => setShowAjouterStock(true);

  // console.log("houcine");
  const oui = () => {
    handleShowAjouterStock();
    props.handleClose();
  };

  const non = () => {
    props.handleClose();
    props.handleCloseAjoutBox();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#7B170F" }}>
           Message de stock
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3> Voulez-vous vraiment ajouter les box au stock? </h3>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={() => non()}
          >
            Non
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => oui()}
          >
            Oui
          </button>
        </Modal.Footer>
      </Modal>

      {showAjouterStock && (
        <AjouterStock
          show={showAjouterStock}
          handleClose={handleCloseAjouterStock}
          HandelCloseAjout={props.handleCloseAjoutBox}
          id={props.id}
        />
      )}
    </>
  );
};

export default ModalQStock;
