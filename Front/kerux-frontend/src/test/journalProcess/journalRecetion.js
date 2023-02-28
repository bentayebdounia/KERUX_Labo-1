import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ProcessService from "../../service/service.process";
import moment from "moment";
import Pagination from "../pagination/pagination";

const JournalReception = (props) => {
  const [process, setProcess] = useState([]);
  const [processRecherche, setProcessRecheche] = useState([]);
  const [comboBox, setComboBox] = useState("");
  const [serchValue, setSerchValue] = useState("");
  let tableGeneral, tableCondition;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //les operation de pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = process.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts2 = processRecherche.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    ProcessService.getBonOrderByDate().then((res) => {
      setProcess(res.data);
    });
  }, []);

  const recherche = (e) => {
    e.preventDefault();
    if (comboBox === "fournisseur") {
      ProcessService.getBonByNomFournisseur(serchValue).then((res) => {
        setProcessRecheche(res.data);
        console.log(res.data);
      });
    } else if (serchValue === "") {
      ProcessService.getBonOrderByDate().then((res) => {
        setProcess(res.data);
      });
    }
  };

  const dateNow = (date1) => {
    var date = moment.utc(date1).format("DD-MM-YYYY");
    const words = date.split("-");
    //var a = parseInt(words[0])+'-'+(words[1])+'-'+(words[2])

    var d = new Date(words[2], words[1] - 1, words[0]);
    var nextDay = new Date(d.getTime());
    nextDay.setDate(d.getDate() + 1);
    //console.log(nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

    return nextDay.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (comboBox === "") {
    tableGeneral = currentPosts.map((p, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{p.id_bon}</td>
        <td>{p.nom_fournisseur}</td>
        <td>{p.acheteur}</td>
        <td>{p.livreur}</td>
        <td>{p.type_bon}</td>
        <td>{p.recepteur}</td>
        <td>{dateNow(p.datee)}</td>
        <td>{p.heure}</td>
      </tr>
    ));
  } else if (comboBox === "fournisseur") {
    tableCondition = currentPosts2.map((p, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{p.id_bon}</td>
        <td>{p.nom_fournisseur}</td>

        <td>{p.acheteur}</td>
        <td>{p.livreur}</td>
        <td>{p.type_bon}</td>
        <td>{p.recepteur}</td>
        <td>{dateNow(p.datee)}</td>
        <td>{p.heure}</td>
      </tr>
    ));
  }

  return (
    <Modal
      size="xl"
      scrollable={true}
      show={props.show}
      onHide={() => {
        props.handleClose();
        setComboBox("");
        setSerchValue("");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#7B170F" }}>
          <i
            className="bi bi-journals"
            style={{ color: "#7B170F", fontSize: "25px" }}
          ></i>{" "}
          Journal de reception
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ margin: "5%", marginRight: "5%" }}>
          <div className="mb-4 row agent">
            <select
              className="form-select"
              aria-label="Default select example"
              id="roleAgent"
              style={{ width: "20%", marginLeft: "30px" }}
              value={comboBox}
              onChange={(e) => setComboBox(e.target.value)}
            >
              <option selected></option>
              <option value="fournisseur">Nom fournisseur</option>
            </select>

            <div className="input-group col-sm-9">
              <input
                type="text"
                className="form-control"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={serchValue}
                onChange={(e) => setSerchValue(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={(e) => recherche(e)}
                style={{ background: "rgb(123, 23, 15)" }}
              >
                <i className="bi bi-search" style={{ fontSize: "1.25rem" }}></i>
              </button>
            </div>
          </div>

          <div className="divTab" style={{ width: "100%", margin: "0px" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID bon</th>
                  <th scope="col">Fournisseur</th>
                  <th scope="col">Acheteur</th>
                  <th scope="col">Livereur</th>
                  <th scope="col">Type de bon</th>
                  <th scope="col">Recepteur</th>
                  <th scope="col">Date</th>
                  <th scope="col">Heure</th>
                </tr>
              </thead>
              <tbody>
                {tableGeneral}
                {tableCondition}
              </tbody>
            </table>
            {comboBox === "" && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={process.length}
                paginate={paginate}
              />
            )}
            {comboBox === "fournisseur" && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={processRecherche.length}
                paginate={paginate}
              />
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JournalReception;
