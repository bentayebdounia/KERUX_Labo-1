import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import serviceAlert from "../../service/service.alert";
import Pagination from "../../test/pagination/pagination";
import moment from "moment";
import ModifierAlert from "./modifierAlert";

const ListeAlerte = (props) => {
  const [alerts, setAlerts] = useState([]);
  const [etape, setEtape] = useState("");
  const [idBox, setId_box] = useState("");
  const [date_alert, setDate_alert] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //les operation de pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentAlert = alerts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //fonction date 
  const dateAlert = (n) => {
    const d = new Date();

    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() + n);
  };

  // recupération des alerts existes dans la bdd
  useEffect(() => {
    serviceAlert.alertDataPrimary(dateAlert(0)).then((res) => {
      setAlerts(res.data);
    });
  });

  //fonction de structurer la date pour l'afficher au tableau

  const dateModif = (date1) => {
    var date = moment.utc(date1).format("DD-MM-YYYY");
    const words = date.split("-");
    //var a = parseInt(words[0])+'-'+(words[1])+'-'+(words[2])

    var d = new Date(words[2], words[1] - 1, words[0]);
    var nextDay = new Date(d.getTime());
    nextDay.setDate(d.getDate() + 1);
    // console.log(nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

    return nextDay.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateModif2 = (date) => {
    const words = date.split("/");
    return words[2] + "-" + words[1] + "-" + words[0];
  };

  //fonction  de modification --recuperer les données de l'alert pour les modifier 
  const modifier = (id, etape, dateAlert) => {
    setId_box(id);
    setEtape(etape);
    setDate_alert(dateAlert)
    handleShow();
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
            >
              {" "}
            </i>{" "}
            Listes Des Alertes{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="divTab" style={{ width: "100%", margin: "0px" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID box</th>
                  <th scope="col">Categorie</th>
                  <th scope="col">Nom produit</th>
                  <th scope="col">Poids(Kg)</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Date</th>
                  <th scope="col">Heure</th>
                  <th scope="col">Date d'alerte</th>
                  <th scope="col">Etape</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAlert.map((p, key) => (
                  <tr key={key + 1}>
                    <td>{key+1}</td>
                    <td>{p.id_gnerate}</td>
                    <td>{p.categorie}</td>
                    <td>{p.nom_produit}</td>
                    <td>{p.poids / 1000}</td>
                    <td>{p.nombre}</td>
                    <td>{dateModif(p.datee)}</td>
                    <td>{p.heure}</td>
                    <td>{dateModif(p.date_alert)}</td>
                    <td>{p.etape}</td>
                    <td>
                      <input
                        onClick={
                          ((e) => modifier(p.id_gnerate, p.etape,
                          dateModif(p.date_alert)))
                        }
                        type="button"
                        className="btn"
                        style={{ background: "#4f8b2a", color: "white" }}
                        value="CONFIRMER"
                      ></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {alerts.length > 6 && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={alerts.length}
                paginate={paginate}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
      {/* appel de composant de modification d'alert */}
      {show && (
        <ModifierAlert
          show={show}
          handleClose={handleClose}
          etp={etape}
          id={idBox}
          date_alert={dateModif2(date_alert)}
        />
      )}
    </>
  );
};

export default ListeAlerte;
