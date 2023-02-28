import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CategorieStatistique from "./statistiqueCategorie";
import seviceStatistique from "../../service/sevice.statistique";

const StatistiqueTypeProduit = (props) => {
  const [categorie, setCategorie] = useState("poulet");

  //legume tables
  const [frite, setFrite] = useState();
  const [tomate, setTomate] = useState();
  const [laitue, setLaitue] = useState();
  const [oignon, setOignon] = useState();
  const [choux, setChoux] = useState();
  const [caroute, setCaroute] = useState();

  //poulet tables

  const [poulet, setPoulet] = useState();
  const [tendres, setTendres] = useState();
  const [wings, setWings] = useState();
  const [legs, setLegs] = useState();
  const [dips, setDips] = useState();
  const [hotdogs, setHotdogs] = useState();

  console.log(frite);
  console.log(poulet);

  useEffect(() => {
    setFrite(calassificate("frite"));
    setTomate(calassificate("tomate"));
    setLaitue(calassificate("laitue"));
    setOignon(calassificate("oignon"));
    setChoux(calassificate("choux"));
    setCaroute(calassificate("carotte"));
  }, []);

  useEffect(() => {
    setPoulet(calassificate("poulet-entier"));
    setTendres(calassificate("tendres"));
    setWings(calassificate("wings"));
    setLegs(calassificate("legs"));
    setDips(calassificate("dips"));
    setHotdogs(calassificate("hotDogs"));
  }, []);

  function calassificate(categorie) {
    var categorie_prod = [];
    for (var i = 1; i < 13; i++) {
      if (i < 12) {
        seviceStatistique
          .getTypeproduitFourni(
            categorie,
            "2023-" + i + "-1",
            "2023-" + (i + 1) + "-1"
          )
          .then(async (res) => {
            //console.log(res.data[0]);
            await categorie_prod.push(parseFloat(res.data[0].count));
          });
      } else if (i === 12) {
        seviceStatistique
          .getTypeproduitFourni(
            categorie,
            "2023-" + i + "-1",
            "2024-" + 1 + "-1"
          )
          .then(async (res) => {
            //console.log(res.data[0]);
            await categorie_prod.push(parseFloat(res.data[0].count));
          });
      }
    }
    return categorie_prod;
  }

  return (
    <Modal
      size={"xl"}
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
        <div className="row mb-3">
          <div className="col-sm-2">
            <label>Categorie de produit</label>
            <select
              className="form-select"
              aria-label="Default select example"
              placeholder="categorie"
              id="typeBon"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              required
            >
              <option value={"poulet"}>poulet</option>

              <option value="legume">Legume</option>
            </select>
          </div>
        </div>

        {categorie === "poulet" && (
          <div className="row">
            <div
              className="col-sm-3"
              style={{ width: "90%", marginLeft: "3%", textAlign: "center" }}
            >
              <CategorieStatistique
                database1={poulet}
                label1={"poulet"}
                backgroundColor1={"rgba(255, 99, 132, 0.2)"}
                borderColor1={"rgb(255, 99, 132)"}
                database2={tendres}
                label2={"tendres"}
                backgroundColor2={"rgba(255, 159, 64, 0.2)"}
                borderColor2={"rgb(255, 159, 64)"}
                database3={wings}
                label3={"wings"}
                backgroundColor3={"rgba(255, 205, 86, 0.2)"}
                borderColor3={"rgb(255, 205, 86)"}
                database4={legs}
                label4={"legs"}
                backgroundColor4={"rgba(75, 192, 192, 0.2)"}
                borderColor4={"rgb(75, 192, 192)"}
                database5={dips}
                label5={"dips"}
                backgroundColor5={"rgba(54, 162, 235, 0.2)"}
                borderColor5={"rgb(54, 162, 235)"}
                database6={hotdogs}
                label6={"hotdogs"}
                backgroundColor6={"rgba(153, 102, 255, 0.2)"}
                borderColor6={"rgb(153, 102, 255)"}
              />
            </div>
          </div>
        )}

        {categorie === "legume" && (
          <div className="row">
            <div
              className="col-sm-3"
              style={{ width: "90%", marginLeft: "3%", textAlign: "center" }}
            >
              <CategorieStatistique
                database1={frite}
                label1={"frite"}
                backgroundColor1={"rgba(255, 99, 132, 0.2)"}
                borderColor1={"rgb(255, 99, 132)"}
                database2={laitue}
                label2={"laitue"}
                backgroundColor2={"rgba(255, 159, 64, 0.2)"}
                borderColor2={"rgb(255, 159, 64)"}
                database3={tomate}
                label3={"tomate"}
                backgroundColor3={"rgba(255, 205, 86, 0.2)"}
                borderColor3={"rgb(255, 205, 86)"}
                database4={oignon}
                label4={"oignon"}
                backgroundColor4={"rgba(75, 192, 192, 0.2)"}
                borderColor4={"rgb(75, 192, 192)"}
                database5={choux}
                label5={"choux"}
                backgroundColor5={"rgba(54, 162, 235, 0.2)"}
                borderColor5={"rgb(54, 162, 235)"}
                database6={caroute}
                label6={"carotte"}
                backgroundColor6={"rgba(153, 102, 255, 0.2)"}
                borderColor6={"rgb(153, 102, 255)"}
              />
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default StatistiqueTypeProduit;
