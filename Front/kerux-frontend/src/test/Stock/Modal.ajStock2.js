import React, { useState, useEffect, createRef } from "react";
import Modal from "react-bootstrap/Modal";
import ServiceStock from "../../service/service.stock";
import ServiceEntrepot from "../../service/service.entrepot";
import serviceAlert from "../../service/service.alert";
import { Bill } from "../../print/bill";
import { useReactToPrint } from "react-to-print";
import ModelReponse from "../../Models/Model.repense";

const ModalAjouterStock = (props) => {
  const [entrepots, setEntrepots] = useState([]);
  const [entrepot, setEntrepot] = useState("");
  const [nom_entrepot, setNom_entrepot] = useState("");
  const [stock, setStock] = useState();
  const [dateAlert, setDatealert] = useState("");
  const [message, setMessage] = useState();
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  //recuperer les entrepot disponible
  useEffect(() => {
    ServiceEntrepot.getEntrepot().then((res) => {
      setEntrepots(res.data);
    });
  }, []);

  //recuperer le nom d'entrepot
  useEffect(() => {
      if (entrepot !== "") {
          console.log(entrepot);
          ServiceEntrepot.getNomEntrepotById(entrepot).then((res) => {
            setNom_entrepot(
              res.data[0].nom_entrepot
              )
            
            console.log(nom_entrepot);
        })
      }
      else {
          setNom_entrepot("")
      }
  }, [entrepot]);

  const billRef = createRef();

  // Send print request to the Main process
  const handlePrint = function (target) {
    return new Promise(() => {
      console.log("forwarding print request to the main process...");

      const data = target.contentWindow.document.documentElement.outerHTML;
      //console.log(data);
      const blob = new Blob([data], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      window.electronAPI.printComponent(url, (response) => {
        console.log("Main: ", response);
      });
      //console.log('Main: ', data);
    });
  };
  const handleBillPrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: "Bill component",
    print: handlePrint,
  });

  const ajouterauStock = async () => {
    // console.log(entrepot)
    //var fk_entrepot =  props.entrepot[0].id_entrepot
    await ServiceStock.ajouterStock(entrepot).then((res) => {
      setStock(res.data);
      //console.log(res.data)
      //console.log(stock.id_stock)
      ServiceStock.modifierProcess(
        props.result.id_gnerate,
        res.data.id_stock
      ).then((res) => {
        //console.log(res.data)
      });
      serviceAlert
        .updateDateAlert(props.result.id_process, dateAlert)
        .then((res) => {
          console.log(res.data);
          //alert (res.data)
        });
    });
  };
  const ajout = async (e) => {
    e.preventDefault();
    if (entrepot !== "" && dateAlert !== "") {
      console.log(nom_entrepot);
      handleBillPrint();
      await ajouterauStock();

      //props.handleClose4();
      //props.toggleDisplay();
    } else {
      setMessage("Velliez remplir les champs");
      handleShow3();
    }
  };

  const annuler = () => {
    setEntrepot("");
    handleBillPrint();
    props.handleClose4();
    props.toggleDisplay();
  };
  //console.log('date alert = '+dateAlert);
  return (
    <Modal show={props.show4} onHide={props.handleClose4}>
      <Modal.Header closeButton>
        <Modal.Title>Ajoutre au stock</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <label>Entrepot</label>

          <select
            className="form-select"
            aria-label="Default select example"
            id="entrepot"
            value={entrepot}
            onChange={(e) => setEntrepot(e.target.value)}
            required
          >
            <option value={""}></option>
            {entrepots.map((entrepot, key) => (
              <option value={entrepot.id_entrepot}>
                {" "}
                {entrepot.nom_entrepot} | {entrepot.air_stockage}{" "}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date d'alerte</label>
          <input
            type="date"
            className="form-control"
            value={dateAlert}
            onChange={(e) => setDatealert(e.target.value)}
          />
        </div>

        <div style={{ display: "none" }}>
          <Bill
            ref={billRef}
            id={props.result}
            poids={props.poids}
            nombre={props.nombre}
            categorie={props.categorie}
            produit={props.produit}
            entrepot={nom_entrepot}
          />
        </div>

        {show3 && (
          <ModelReponse
            show={show3}
            handleClose={handleClose3}
            handleShow={handleShow3}
            message={message}
            titre={"d'erreur"}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
          onClick={(e) => annuler()}
        >
          {" "}
          annuler{" "}
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={(e) => ajout(e)}
        >
          {" "}
          Valider{" "}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAjouterStock;
