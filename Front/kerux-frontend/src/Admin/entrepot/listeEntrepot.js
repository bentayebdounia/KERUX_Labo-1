import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import serviceEntrepot from "../../service/service.entrepot";
import Pagination from "../../test/pagination/pagination";
import moment from "moment";
import ModifierEntrepot from "./modifierEntrepot";

const ListeEntrepot = (props) => {
  const [entrepot, setEntrepot] = useState([]);
  const [id_entrepot, setId_entrepot] = useState();
  const [nom_entrepot, setNom_entrepot] = useState();
  const [type_entrepot, setType_entrepot] = useState();
  const [air_stockage, setAir_stockage] = useState();
  const [capacite, setCapacite] = useState();
  const [adresse, setAdresse] = useState();
  const [exist, setExist] = useState()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //les operation de pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const entrepots = entrepot.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    serviceEntrepot.getAllEntrepot().then((res) => {
      setEntrepot(res.data);
    });
  });

  const dateNow = (d) => {
    var date = moment.utc(d).format("DD-MM-YY");
    const words = date.split("-");
    var a = parseInt(words[0]) + 1 + "-" + words[1] + "-" + words[2];
    //console.log(a+1)
    return a;
  };

  
  const modifier = (
    id,
    nomEntrepot,
    typeEntrepot,
    airStockage,
    capacite,
    adresse,
    exist
  ) => {
    // e.preventDefault();
    setId_entrepot(id);
    setNom_entrepot(nomEntrepot);
    setType_entrepot(typeEntrepot);
    setAir_stockage(airStockage);
    setCapacite(capacite);
    setAdresse(adresse);
    setExist(exist);

    handleShow();
   

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
              className="bi bi-house-fill"
              style={{ color: "#7B170F", fontSize: "25px" }}
            >
              {" "}
            </i>{" "}
            Liste Des Entrepots
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="divTab" style={{ width: "100%", margin: "0px" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                
                  <th scope="col">ID entrepot</th>
                  <th scope="col">Nom d'entrepot</th>
                  <th scope="col">Type d'entrepot</th>
                  <th scope="col">Air de stockage</th>
                  <th scope="col">Capacité</th>
                  <th scope="col">Adress</th>
                  <th scope="col">Date d'enregistrement d'entrepot</th>
                  <th scope="col">L'existance</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {entrepots.map((p, key) => (
                  <tr key={key + 1}>
                   
                    <td>{p.id_entrepot}</td>
                    <td>{p.nom_entrepot}</td>
                    <td>{p.type_entrepot}</td>
                    <td>{p.air_stockage}</td>
                    <td>{p.capacite}</td>
                    <td>
                      {p.adresse} 
                    </td>
                    <td>{dateNow(p.date_enregistrement_entrepot)}</td>
                    {p.exist === true && (
                      <td>
                        <i
                          className="bi bi-check-circle-fill"
                          style={{ color: "#4F8B2A", fontSize: "20px" }}
                        ></i>
                      </td>
                    )}
                    {p.exist === false && (
                      <td>
                        <i
                          className="bi bi-x-circle-fill"
                          style={{ color: "#7B170F", fontSize: "20px" }}
                        ></i>
                      </td>
                    )}
                    <td>
                      <input
                        onClick={(e) =>
                          modifier(
                            p.id_entrepot,
                            p.nom_entrepot,
                            p.type_entrepot,
                            p.air_stockage,
                            p.capacite,
                            p.adresse,
                            p.exist
                          )
                        }
                        type="button"
                        className="btn"
                        style={{ background: "#4f8b2a", color: "white" }}
                        value="MODIFIER"
                      ></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {entrepots.length > 6 && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={entrepot.length}
                paginate={paginate}
              />
            )}
          </div>
          {show && (
            <ModifierEntrepot
              show={show}
              handleClose={handleClose}
              id_entrepot={id_entrepot}
              nom_entrepot={nom_entrepot}
              type_entrepot={type_entrepot}
              air_stockage={air_stockage}
              capacite={capacite}
              adresse={adresse}
              exist={exist}
              showRacine= {props.handleShow}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListeEntrepot;
