import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import ModalQStock from "./stockEnregistrement/questStock";
import ModelReponse from "../../Models/Model.repense";
import Boxes from "./boxes";
import AffichageBoxes from "./boxAffichage";

const ModalAjoutBoxes = (props) => {
  const [test, setTest] = useState(false);

  const [showQstock, setShowQstock] = useState(false);
  const handleCloseQstock = () => setShowQstock(false);
  const handleShowQstock = () => setShowQstock(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [conteur, setConteur] = useState(0);
  const [poidsAccumuler, setPoidsaccumuler] = useState(0);
  const [nbrAccumuler, setNbrAccumuler] = useState(0);

  const [erreurPoids, setErreurpoids] = useState(false);
  const [erreurNombre, setErreurnombre] = useState(false);
  const [erreurUnite, setErreurunite] = useState(false);

  const [msg, setMsg] = useState();
  //const [prodF, setProdf] = useState(JSON.parse (localStorage.getItem ('produitsFournis')))
  const event = new Date();

  const [boxe, setBoxe] = useState([
    {
      id: 0,
      nom_produit: "",
      poids: 0,
      nombre: 0,
      unite: "kg",
      id_stock: "",
      date: new Date(),
      date_alert: "",
    },
  ]);

  const [nboxe, setNBoxe] = useState([
    {
      id: 0,
      nom_produit: "",
      poids: 0,
      nombre: 0,
      unite: "kg",
      id_stock: "",
      date: new Date(),
      date_alert: "",
    },
  ]);

  const [tableboxe, setTableboxe] = useState([]);
  useEffect(() => {
    setTableboxe(
      JSON.parse(sessionStorage.getItem("boxes" + props.id) || "[]")
    );
  }, []);

  //console.log("produitFourni: "+ props.produitFourni);  props.produitFourni.nombre_fourni
  //console.log("categorier= "+props.produitFourni.categorie+ "\n id produit " +props.produitFourni.id_produit);

  //FONCTION POUR LA VERIFICATION DE POIDS
  function verificationPoids(poids, nombre, unite) {
    console.log((poids * 1000) / nombre);
    return transforme(unite, poids) / nombre;
  }

  //fonction pour la transformation de poids en gramme
  function transforme(unite, poids) {
    console.log(unite);
    if (unite === "kg") {
      console.log(poids);
      return poids * 1000;
    } else if (unite === "gramme") return poids;
  }

  //fonction d'ajout un box
  function plus() {
    setConteur(conteur + 1);
    setPoidsaccumuler(
      parseFloat(poidsAccumuler) +
        parseFloat(transforme(boxe[0].unite, boxe[0].poids))
    );
    setNbrAccumuler(parseFloat(nbrAccumuler) + parseFloat(boxe[0].nombre));

    // boxe[0].poids = transforme(boxe[0].unite, boxe[0].poids)
    console.log(boxe);
    const newBoxe = [...boxe];

    newBoxe.push({
      categorie: "",
      nom_produit: "",
      poids: 0,
      nombre: 0,
      unite: "kg",
      id_stock: "",
      date: new Date(),
      date_alert: "",
    });
    //console.log('poids= '+boxe[0].poids)
    setBoxe(
      newBoxe.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      })
    );
  }

  const plusId = () => {
    // console.log(props.poidsRestant);
    // alert(poidsAccumuler)
    // console.log(parseFloat(poidsAccumuler)+parseFloat(boxe[0].poids)*1000);
    if (
      parseFloat(poidsAccumuler) +
        parseFloat(transforme(boxe[0].unite, boxe[0].poids)) <=
      props.poidsRestant
    ) {
      //alert(boxe[0].unite)
      if (props.type === "poulet-entier") {
        if (nbrAccumuler + parseFloat(boxe[0].nombre) <= props.nombreRestant) {
          if (
            boxe[0].poids === 0 ||
            boxe[0].poids === "0" ||
            boxe[0].poids === ""
          )
            setErreurpoids(true);

          if (
            boxe[0].nombre === 0 ||
            boxe[0].nombre === "0" ||
            boxe[0].nombre === ""
          )
            setErreurnombre(true);

          if (
            boxe[0].poids !== 0 &&
            boxe[0].poids !== "" &&
            boxe[0].poids !== "0" &&
            boxe[0].nombre !== 0 &&
            boxe[0].nombre !== "0" &&
            boxe[0].nombre !== "" &&
            boxe[0].unite !== ""
          ) {
            // console.log(props.categorie);
            //console.log(verificationPoids(boxe[0].poids,boxe[0].nombre, boxe[0].unite  ))
            if (
              verificationPoids(boxe[0].poids, boxe[0].nombre, boxe[0].unite) >=
                1500 &&
              verificationPoids(boxe[0].poids, boxe[0].nombre, boxe[0].unite) <=
                2000
            ) {
              console.log(transforme(boxe[0].unite, boxe[0].poids));
              plus();
            } else {
              setMsg("Veillez le poids ou la quantité");
              handleShow();
            }
          }
        } else {
          setMsg("La quantité est incorrecte");
          handleShow();
        }
      }
      //poids de nombre
      else {
        if (
          boxe[0].poids === 0 ||
          boxe[0].poids === "0" ||
          boxe[0].poids === ""
        )
          setErreurpoids(true);
        else if (
          boxe[0].poids !== 0 &&
          boxe[0].poids !== "0" &&
          boxe[0].poids !== "" &&
          boxe[0].unite !== ""
        ) {
          console.log(props.categorie);
          //boxe[0].poids = transforme(boxe[0].unite, boxe[0].poids)
          plus();
        }
      }
    } else {
      setMsg("Veillez vérifier vous entrées");
      handleShow();
    }
  };

  const confirmAjoutBoxes = (e) => {
    if (boxe.length > 1) {
      e.preventDefault();

      var i = 1;

      while (i < boxe.length) {
        var b = {
          date: new Date(),
          categorie: props.produitFourni.categorie,
          nom_produit: props.produitFourni.nom_produit,
          etape: "enregistrement",
          poids: transforme(boxe[i].unite, boxe[i].poids),
          nombre: boxe[i].nombre,
          id_produit: props.id,
          id_stock: null,
          stock: "",
          date_alert: "",
        };
        tableboxe.push(b);
        sessionStorage.setItem("boxes" + props.id, JSON.stringify(tableboxe));

        i = i + 1;
      }

      var tab = [];
      tab = JSON.parse(sessionStorage.getItem("produitsFournis"));
      for (var i = 0; i < tab.length; i++) {
        if (tab[i].id_prod === props.id) {
          tab[i].poidsRester = props.poidsRestant - poidsAccumuler;
          tab[i].nombreRester = props.nombreRestant - nbrAccumuler;
          console.log(nbrAccumuler);
          console.log("tab", tab[i].nombreRester);
        }
      }
      console.log(tableboxe);

      setBoxe([...nboxe]);
      //props.poidsRestant((props.poids-poidsRester)/1000)
      sessionStorage.setItem("produitsFournis", JSON.stringify(tab));
      handleShowQstock();
      // props.handleClose()
      boxe[0].poids = "";
      boxe[0].nombre = "";
      tableboxe.splice("");
      boxe.splice("");
      setConteur(0);
      props.mettreJourTabeauProduit();
    } else {
      setMsg("vous pouvez pas valider");
      handleShow();
    }
  };

  const annuler = () => {
    //tableboxe.splice("")

    boxe[0].poids = "";
    boxe[0].nombre = "";
    setBoxe([...nboxe]);
    setPoidsaccumuler(0);
    setNbrAccumuler(0);
    setConteur(0);
    props.handleClose();
  };
  // console.log( prodF);
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
              className="bi bi-plus-lg"
              style={{ color: "#7B170F", fontSize: "25px" }}
            ></i>{" "}
            Ajouter des box
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 row">
            <div
              className="row"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <p> {props.test}</p>

              <label htmlFor="poids" className="col-3  form-label">
                <div className="progress">
                  {" "}
                  POIDS
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-label="Example with label"
                    style={{
                      width:
                        ((props.poidsRestant - poidsAccumuler) * 100) /
                          props.poidsRestant +
                        "%",
                      background: "#4F8B2A",
                    }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {" "}
                    {(props.poidsRestant - poidsAccumuler) / 1000} Kg
                  </div>
                </div>
              </label>

              {props.categorie === "poulet" && (
                <label htmlFor="poids" className="col-3 form-label">
                  <div className="progress">
                    {" "}
                    NOMBRE
                    <div
                      className="progress-bar  "
                      role="progressbar"
                      aria-label="Example with label"
                      style={{
                        width:
                          ((props.nombreRestant - nbrAccumuler) * 100) /
                            props.nombreRestant +
                          "%",
                        background: "#4F8B2A",
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {" "}
                      {props.nombreRestant - nbrAccumuler}{" "}
                    </div>
                  </div>
                </label>
              )}
            </div>
            <div>
              {boxe.map((box, key) => {
                return (
                  <div
                    className="row"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <div
                      className="col-sm-10 mb-3"
                      id="produitFourni"
                      style={{ backgroundColor: "#f0f0f0", width: "90%" }}
                      key={key}
                    >
                      
                      <Boxes
                        cle={key}
                        categorie={props.categorie}
                        n_produit={props.type}
                        nom_produit={box.nom_produit}
                        poids={box.poids}
                        onPoidsChange={(newPoids) => {
                          const newProduits = [...boxe];
                          newProduits[key].poids = newPoids;
                          setBoxe(newProduits);
                        }}
                        unite={box.unite}
                        onUniteChange={(newUnite) => {
                          const newProduits = [...boxe];
                          newProduits[key].unite = newUnite;
                          setBoxe(newProduits);
                        }}
                        erreurPoids={erreurPoids}
                        erreurNombre={erreurNombre}
                        nombre={box.nombre}
                        onNombreChange={(newNombre) => {
                          const newProduits = [...boxe];
                          newProduits[key].nombre = newNombre;
                          setBoxe(newProduits);
                        }}
                      />

                      {key === 0 && (
                        <>
                          <button
                            className="btn btn-dark btn-outline-dark position-relative"
                            type="button"
                            id="boxBtn"
                            onClick={(e) => plusId(e)}
                          >
                            <i
                              className="bi bi-plus-lg"
                              style={{ color: "white" }}
                            >
                              {" "}
                            </i>{" "}
                            AJOUTER BOX
                            <span
                              className="position-absolute top-0 start-100 translate-middle badge rounded-pill "
                              style={{
                                background: "#f0f0f0",
                                color: "black",
                                fontStyle: "normal",
                              }}
                            >
                              {conteur}
                              <span class="visually-hidden">
                                unread messages
                              </span>
                            </span>
                          </button>
                        </>
                      )}
                    </div>

                    {key === 0 && (
                      <p
                        style={{
                          borderBottom: "5px solid",
                          borderRadius: "3px",
                          borderColor: "#a6a6a6",
                        }}
                      ></p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="canclBtn "
            data-bs-dismiss="modal"
            onClick={() => annuler()}
          >
            <i className=" bi bi-x-circle me-2" style={{ color: "white" }}></i>
            ANNULER
          </button>
          <button
            type="button"
            className="validBtn"
            onClick={(e) => confirmAjoutBoxes(e)}
          >
            {" "}
            <i
              className=" bi bi-check-circle me-2"
              style={{ color: "white" }}
            ></i>{" "}
            Valider
          </button>
        </Modal.Footer>
      </Modal>

      <ModalQStock
        show={showQstock}
        handleClose={handleCloseQstock}
        handleCloseAjoutBox={props.handleClose}
        id={props.id}
      />
      <ModelReponse
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        message={msg}
        titre={"d'erreur"}
      />
    </>
  );
};
export default ModalAjoutBoxes;
