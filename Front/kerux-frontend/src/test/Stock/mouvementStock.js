import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import serviceStock from "../../service/service.stock";
import moment from "moment";
import Pagination from "../pagination/pagination";
const MouvementStock = (props) => {
  const [stock, setStock] = useState([]);
  const [stockRecherche, setStockRecheche] = useState([]);
  const [comboBox, setComboBox] = useState("");
  const [serchValue, setSerchValue] = useState("");
  const [enStock, setenStock] = useState([]);
  const [sortieStock, setSortiestock] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //les operation de pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = stock.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts2 = stockRecherche.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts3 = enStock.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts4 = sortieStock.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let tableGeneral, tableCondition, barRechereche, dateRecherech;

  useEffect(() => {
    serviceStock.getStock().then((res) => {
      setStock(res.data);
    });
  });

  const StockFunction = () => {
    enStock.splice("");
    sortieStock.splice("");
    for (var i = 0; i < stock.length; i++) {
      if (stock[i].date_sortie === null) {
        enStock.push(stock[i]);
      } else sortieStock.push(stock[i]);
    }
  };

  const recherche = (e) => {
    e.preventDefault();
    stockRecherche.splice("");
    if (comboBox === "etape") {
      serviceStock.getStockByEtape(serchValue).then((res) => {
        setStockRecheche(res.data);
        console.log(res.data);
      });
    } else if (comboBox === "date") {
      serviceStock.getStockByDate(JSON.stringify(serchValue)).then((res) => {
        setStockRecheche(res.data);
        console.log(res.data);
      });
    } else if (comboBox === "en stock") {
      StockFunction();
    } else if (comboBox === "sortie de stock") {
      StockFunction();
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
        <td>{p.id_gnerate}</td>
        <td>{p.categorie}</td>
        <td>{p.nom_produit}</td>
        <td>{p.etape}</td>
        <td>{p.poids / 1000}</td>
        <td>{p.nombre !== null && p.nombre !== 0 && p.nombre}</td>
        <td>{dateNow(p.datee)}</td>
        <td>{p.heure}</td>
        <td>{p.nom_entrepot}</td>
        <td>{dateNow(p.date_entree)}</td>

        <td>{p.date_sortie !== null && dateNow(p.date_sortie)}</td>
        <td>{p.poids_sortie !== null && p.poids_sortie / 1000}</td>
      </tr>
    ));
  } else if (comboBox === "etape") {
    barRechereche = (
      <>
        <select
          className="form-select"
          aria-label="Default select example"
          id="roleAgent"
          value={serchValue}
          onChange={(e) => setSerchValue(e.target.value)}
        >
          <option selected></option>
          <option value="enregistrement">enregistrement</option>
          <option value="nettoyage">nettoyage</option>
          <option value="coupage">coupage</option>
          <option value="conditionnement">conditionnement</option>
          <option value="sortie">sortie</option>
        </select>
      </>
    );
    tableCondition = currentPosts2.map((p, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{p.id_gnerate}</td>
        <td>{p.categorie}</td>
        <td>{p.nom_produit}</td>
        <td>{p.etape}</td>
        <td>{p.poids / 1000}</td>
        <td>{p.nombre !== null && p.nombre !== 0 && p.nombre}</td>
        <td>{dateNow(p.datee)}</td>
        <td>{p.heure}</td>
        <td>{p.nom_entrepot}</td>
        <td>{dateNow(p.date_entree)}</td>
        <td>{p.date_sortie !== null && dateNow(p.date_sortie)}</td>
        <td>{p.poids_sortie !== null && p.poids_sortie / 1000}</td>
      </tr>
    ));
  } else if (comboBox === "date") {
    barRechereche = (
      <>
        <input
          type="date"
          className="form-control"
          value={serchValue}
          onChange={(e) => setSerchValue(e.target.value)}
        />
      </>
    );
    tableCondition = currentPosts2.map((p, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{p.id_gnerate}</td>
        <td>{p.categorie}</td>
        <td>{p.nom_produit}</td>
        <td>{p.etape}</td>
        <td>{p.poids / 1000}</td>
        <td>{p.nombre !== null && p.nombre !== 0 && p.nombre}</td>
        <td>{dateNow(p.datee)}</td>
        <td>{p.heure}</td>
        <td>{p.nom_entrepot}</td>
        <td>{dateNow(p.date_entree)}</td>
        <td>{p.date_sortie !== null && dateNow(p.date_sortie)}</td>
        <td>{p.poids_sortie !== null && p.poids_sortie / 1000}</td>
      </tr>
    ));
  } else if (comboBox === "en stock") {
    tableCondition = currentPosts3.map((p, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{p.id_gnerate}</td>
        <td>{p.categorie}</td>
        <td>{p.nom_produit}</td>
        <td>{p.etape}</td>
        <td>{p.poids / 1000}</td>
        <td>{p.nombre !== null && p.nombre !== 0 && p.nombre}</td>
        <td>{dateNow(p.datee)}</td>
        <td>{p.heure}</td>
        <td>{p.nom_entrepot}</td>
        <td>{dateNow(p.date_entree)}</td>
      </tr>
    ));
  } else if (comboBox === "sortie de stock") {
    tableCondition = currentPosts4.map((p, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{p.id_gnerate}</td>
        <td>{p.categorie}</td>
        <td>{p.nom_produit}</td>
        <td>{p.etape}</td>
        <td>{p.poids / 1000}</td>
        <td>{p.nombre !== null && p.nombre !== 0 && p.nombre}</td>
        <td>{dateNow(p.datee)}</td>
        <td>{p.heure}</td>
        <td>{p.nom_entrepot}</td>
        <td>{dateNow(p.date_entree)}</td>
        <td>{dateNow(p.date_sortie)}</td>
        <td>{p.poids_sortie / 1000}</td>
      </tr>
    ));
  }

  return (
    <Modal
      fullscreen={true}
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
            className="bi bi-boxes"
            style={{ color: "#7B170F", fontSize: "25px" }}
          ></i>{" "}
          Mouvement de stock{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ margin: "5%", marginRight: "5%" }}>
          <div className="mb-4 row agent">
            <select
              className="form-select"
              aria-label="Default select example"
              id="roleAgent"
              style={{ width: "15%", marginLeft: "15px" }}
              value={comboBox}
              onChange={(e) => setComboBox(e.target.value)}
            >
              <option selected></option>
              <option value="etape">Etape</option>
              <option value="date">Date</option>
              <option value="en stock">En stock</option>
              <option value="sortie de stock">sortie de stock</option>
            </select>

            <div className="input-group col-sm-9" style={{ width: "50%" }}>
              {barRechereche}
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
                  <th scope="col"># </th>
                  <th scope="col">ID </th>
                  <th scope="col">Categorie</th>
                  <th scope="col">Nom_produit</th>
                  <th scope="col">Etape</th>
                  <th scope="col">Poids(Kg)</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Date</th>
                  <th scope="col">Heure</th>
                  <th scope="col">Nom enrepot</th>
                  <th scope="col">Date entre au stock</th>
                  {comboBox !== "en stock" && (
                    <th scope="col">Date sortie de stock</th>
                  )}
                  {comboBox !== "en stock" && (
                    <th scope="col">Poids des sortie(Kg)</th>
                  )}
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
                totalPosts={stock.length}
                paginate={paginate}
              />
            )}
            {(comboBox === "etape" || comboBox === "date") && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={stockRecherche.length}
                paginate={paginate}
              />
            )}
            {comboBox === "en stock" && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={enStock.length}
                paginate={paginate}
              />
            )}
            {comboBox === "sortie de stock" && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={sortieStock.length}
                paginate={paginate}
              />
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MouvementStock;
