import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CategorieStatistique from "./statistiqueTypeProd";
import seviceStatistique from "../../service/sevice.statistique";

const StatistiqueProduitFourni = (props) => {
  const [poulet, setPoulet] = useState([]);
  const [legume, setLegume] = useState([]);
  console.log(poulet);
  console.log(legume);

  // setPoulet(calassificate('poulet'))
  // setLegume(calassificate('legume'))
    
      useEffect( () =>{
        setPoulet(calassificate('poulet'))
        setLegume(calassificate('legume'))
      },[])


  function calassificate(categorie) {
    const categorie_prod = [];

    for (var i = 1; i < 13; i++) {
      if (i < 12) {
        // console.log(categorie+' '+i);
        seviceStatistique
          .getCategorieproduitFourni(
            categorie,
            "2023-" + i + "-1",
            "2023-" + (i + 1) + "-1"
          )
          .then( (res) => {
            //  console.log(res.data[0]);
             categorie_prod.push(parseFloat(res.data[0].count));
          });
      } else if (i === 12) {
        // console.log(categorie+' '+i);
        seviceStatistique
          .getCategorieproduitFourni(
            categorie,
            "2023-" + i + "-1",
            "2024-" + 1 + "-1"
          )
          .then( (res) => {
            //console.log(res.data[0]);
             categorie_prod.push(parseFloat(res.data[0].count));
          });
      }
    }

    // console.log(categorie_prod);
    return categorie_prod;
  }
  // console.log(poulet);
  // console.log(legume);

  return (
    <Modal
      size="xl"
      scrollable={true}
      show={props.show}
      onHide={() => {
        props.handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#7B170F" }}>
          <i
            className="bi bi-graph-up"
            style={{ color: "#7B170F", fontSize: "25px" }}
          ></i>{" "}
          Satatistique de produits fournis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div
            className="col-sm-5"
            style={{ width: "90%", marginLeft: "3%", textAlign: "center" }}
          >
            <CategorieStatistique
              database={poulet}
              backgroundColor={"rgba(255, 99, 132, 0.2)"}
              borderColor={"rgb(255, 99, 132)"}
              database2={legume}
              backgroundColor2={"rgba(255, 159, 64, 0.2)"}
              borderColor2={"rgb(255, 159, 64)"}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StatistiqueProduitFourni;
