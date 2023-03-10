import React ,{useState,useEffect} from 'react'
import ModalConfirmCoup from './ModalConfirmCoup'
import ModelReponse from '../../Models/Model.repense'
import ModalListAgent from '../../Models/modalListAgent'
import ServiceAdmin from '../../service/serviceAdmin'
import Tableau from '../nettoyageProcess/tableau'
import '../nettoyageProcess/process.css'

const Coupage = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTableAgent, setShowtableAgent] = useState(false);
  const handleCloseTableAgent = () => setShowtableAgent(false);
  const handleShowTableAgent = () => setShowtableAgent(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [confirmeCoupage, setConfirmeCoupage] = useState(false);
  const confirmeCoupageTrue = () => setConfirmeCoupage(true);
  const confirmeCoupageFalse = () => setConfirmeCoupage(false);

  const [message, setMessage] = useState();

  const [typeProd, setTypeProd] = useState(props.process.nom_produit);
  const [poids, setPoids] = useState();
  const [nombre, setNombre] = useState();
  const [agent, setAgent] = useState("");
  const [idAgent, setIdAgent] = useState([]);

  const [numeroBox, setNumerobox] = useState(1);
  const [unite, setUnite] = useState("kg");

  //const [note , setNote] = useState(false)
  const [nomAgent, setNomAgent] = useState([]);

  const [PorcentagePoids, setPorcentagePoids] = useState();

  const [toggleRecomendation, setToggleRecomendation] = useState(true);
  const toggleRecomendationTrue = () => setToggleRecomendation(true);
  const toggleRecomendationFalse = () => setToggleRecomendation(false);

  const [calculPoids, setCalculPoids] = useState([]);
  const [id_personne, setIdpersonne] = useState();

  const [agentNettoyage, setAgentNettoyage] = useState([
    {
      id_personne: "",
      nom: "",
      prenom: "",
    },
  ]);
  const [agentNettoyageSelect, setAgentnettoyageselect] = useState([]);

  //get personnes
  useEffect(() => {
    ServiceAdmin.getPersonneByNomOrPrenom(agent, agent).then((res) => {
      setAgentNettoyage(res.data);
      console.log(agentNettoyage);
    });
  });

  

  useEffect(() => {
    if (confirmeCoupage) {
      setPorcentagePoids(ControlerPoids(poids));
      setIdAgent([]);
      setPoids("");

      setNumerobox(numeroBox + 1);
      console.log(numeroBox);
      if (props.process.categorie === "poulet") setNombre("");
      else setNombre(0);

      confirmeCoupageFalse();
    }
  });

  const ajouterAgent = (e) => {
    e.preventDefault();

    agentNettoyageSelect.push({
      id_personne: id_personne,
      nom: agent,
    });
    console.log(agentNettoyageSelect);
    handleShowTableAgent();
    setAgent("");
  };

  function myFunction(total, value, index, array) {
    return total + value;
  }
  let porcentagePoids;

  const ControlerPoids = (poids) => {
    console.log("nombreTotale= " + props.nombre);
    console.log(props.poids);
    console.log(poids);

    calculPoids.push(parseFloat(transforme(unite, poids)));
    console.log(calculPoids);
    let sum = calculPoids.reduce(myFunction);

    console.log("calcule poids= " + sum);
    porcentagePoids = (sum * 100) / props.poids;
    console.log("porcentage = " + porcentagePoids);
    return porcentagePoids;
  };

  function transforme(unite, poids) {
    console.log(unite);
    if (unite === "kg") {
      console.log(poids);
      return poids * 1000;
    } else if (unite === "gramme") return poids;
  }

  const valider = (e) => {
    e.preventDefault();
    //console.log(ControlerPoids(poids));
    handleShow();
  };

  const annuler = () => {
    setTypeProd("");
    setIdAgent([]);
    setPoids("");
    setNombre("");
  };

  var nbr, TypePoulet, TypeLegume, agents;
  if (props.process.categorie === "poulet") {
    TypePoulet = (
      <>
        <select
          className="form-select"
          aria-label="Default select example"
          id="typeprod"
          value={typeProd}
          onChange={(e) => setTypeProd(e.target.value)}
          required
        >
          <option defaultValue={""}></option>
          <option value="tendres"> Tendres</option>
          <option value="wings">Wings</option>
          <option value="legs">Legs</option>
          <option value="dips">Dips</option>
          <option value="hotDogs">HotDogs</option>
        </select>
      </>
    );
    nbr = (
      <>
        <label htmlFor="nombre" className="col-sm-2 col-form-label">
          Quantit??
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
      </>
    );
  }

  if (props.process.categorie === "legume") {
    TypeLegume = (
      <>
        <input
          type="text"
          className="form-control"
          id="id_box"
          readOnly={typeProd}
          defaultValue={typeProd}
          required
        />
      </>
    );
  }

  function select() {
    toggleRecomendationFalse();
  }

  agents = (
    <>
      <div className="dataResults">
        {agentNettoyage.map((value, key) => {
          return (
            <a
              className="dataItems"
              onClick={() => {
                setAgent(value.nom + " " + value.prenom);
                setIdpersonne(value.id_personne);
              }}
            >
              <p>
                {" "}
                {value.id_personne} . {value.nom} {value.prenom}{" "}
              </p>
            </a>
          );
        })}
      </div>
    </>
  );
  return (
    <div>
      <section id="etape_section">
        <div className="container">
          <form class="needs-validation" noValidate>
            <div className="contenerProd " style={{ textAlign: "center" }}>
              <label id="categorie"> Categorie de produit: </label>

              <label id="categorieValue">{props.process.categorie} </label>
            </div>

            <div className="mb-3 row">
              <label htmlFor="typeprod" className="col-sm-2 col-form-label">
                Type de produit
              </label>
              <div className="col-sm-10">
                {TypePoulet}
                {TypeLegume}
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="recepteur" className="col-sm-2 col-form-label">
                Agent de Coupage
              </label>
              <div className="col-sm-10 dropdown">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="agentIdNettoyage"
                    placeholder=""
                    value={agent}
                    onChange={(e) => setAgent(e.target.value)}
                    onClick={select}
                  />
                  <button
                    className="btn"
                    style={{ background: "#7B170F" }}
                    type="button"
                    onClick={(e) => ajouterAgent(e)}
                  >
                    <i
                      className="bi bi-plus"
                      style={{ color: "white", fontSize: "15px" }}
                    ></i>
                  </button>
                </div>
                {agents}
              </div>
              {showTableAgent && (
                <Tableau
                  show={showTableAgent}
                  handleClose={handleCloseTableAgent}
                  handleShow={handleShowTableAgent}
                  agentNettoyage={agentNettoyageSelect}
                />
              )}
            </div>
            <div className="mb-3 row">
              <label htmlFor="poids" className="col-sm-2 col-form-label">
                Poids
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="poids"
                  value={poids}
                  onChange={(e) => {
                    setPoids(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-2">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="categorie"
                  value={unite}
                  onChange={(event) => setUnite(event.target.value)}
                  required
                >
                  <option value="kg">Kg</option>
                  <option value="gramme">Gr</option>
                </select>
              </div>
              <label htmlFor="poids" className="col-sm-3 col-form-label">
                <div className="progress">
                  {" "}
                  Poids
                  <div
                    className="progress-bar "
                    role="progressbar"
                    aria-label="Example with label"
                    style={{ width: PorcentagePoids + "%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {" "}
                    {PorcentagePoids}%{" "}
                  </div>
                </div>
              </label>
            </div>
            <div className="mb-3 row">{nbr}</div>

            <div className="d-grid gap-3 d-md-flex justify-content-md-end">
              <button className="btn2" type="submit" onClick={annuler}>
                ANNULER
              </button>
              <button className="btn1" type="submit">
                VALIDER
              </button>
            </div>
          </form>
          {(function () {
            "use strict";

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll(".needs-validation");

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms).forEach(function (form) {
              form.addEventListener(
                "submit",
                function (event) {
                  if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                  if (form.checkValidity()) valider(event);

                  form.classList.add("was-validated");
                },
                false
              );
            });
          })()}
        </div>
        <ModalConfirmCoup
          show2={show}
          handleClose2={handleClose}
          handleShow2={handleShow}
          id_box={props.id}
          categorie={props.process.categorie}
          typeProd={typeProd}
          agents={agentNettoyageSelect}
          poids={transforme(unite, poids)}
          nombre={nombre}
          fk_proditfourni={props.process.fk_proditfourni}
          confirmeCoupageTrue={confirmeCoupageTrue}
          toggleDisplay={props.toggleDisplay}
          PorcentagePoids={PorcentagePoids}
          numeroBox={numeroBox}
          btnC={props.btnC}
        />

        {show3 && (
          <ModelReponse
            show={show3}
            handleClose={handleClose3}
            handleShow={handleShow3}
            message={message}
            titre={"coupage"}
          />
        )}
      </section>
    </div>
  );
}
 
export default Coupage;