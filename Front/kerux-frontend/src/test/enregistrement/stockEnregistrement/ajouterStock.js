import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ServiceEntrepot from "../../../service/service.entrepot";



const AjouterStock = (props) => {
  const [entrepots, setEntrepots] = useState([]);
  const [entrepot, setEntrepot] = useState();
  const [dateAlert, setDatealert] = useState();
  const [selection, setSelection] = useState([]);
  // const [stock , setStock] = useState(JSON.parse (localStorage.getItem('boxes'+props.id)))
  var tab = [];
  tab = JSON.parse(localStorage.getItem("boxes" + props.id));
  const [boxe, setBoxe] = useState(
    JSON.parse(localStorage.getItem("boxes" + props.id)).map((d, key) => {
      return {
        select: false,
        cle: key,
        categorie: d.categorie,
        date_alert: d.date_alert,
        id_produit: d.id_produit,
        id_stock: d.id_stock,
        nom_produit: d.nom_produit,
        poids: d.poids,
        nombre: d.nombre,
        stock: d.stock,
      };
    })
  );
  
  //recuperer les entrepots disponible de bdd
  useEffect(() => {
    ServiceEntrepot.getEntrepot().then((res) => {
      setEntrepots(res.data);
    });
  }, []);

 
//ajouter le produit au stock
  const ajout =  () => {
    var tab = [];
    tab = JSON.parse(localStorage.getItem("boxes" + props.id));
    console.log(entrepots);
    console.log(entrepot);

    const n = entrepots.find(
      ({ id_entrepot }) => id_entrepot === parseInt(entrepot)
    );
    console.log(n);
    for (var i = 0; i < boxe.length; i++) {
      if (boxe[i].select === true) {
        console.log(boxe[i].id_produit);
        //alert(entrepot)
        boxe[i].id_stock = entrepot;
        tab[boxe[i].cle].id_stock = entrepot;
        tab[boxe[i].cle].stock = n.nom_entrepot;
        tab[boxe[i].cle].date_alert = dateAlert;

        
      }
    }
    console.log(tab);

    localStorage.setItem("boxes" + props.id, JSON.stringify(tab));
    eliminate()
    

    //props.handleClose()
  };

  //élliminer le produit ajouter de la liste des produit
  const eliminate = () => {
    var j = 0;
    while (j < boxe.length) {
      if (boxe[j].select === true) {
        boxe.splice(j, 1);
        //j=j
      } else j++;
    }
  }
  

  const non = () => {
    props.HandelCloseAjout();
    props.handleClose();
  };

  //console.log(props.tableBox);

  return (
    <>
      <Modal
        size="lg"
        scrollable={true}
        show={props.show}
        //onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter au stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: "5%", marginRight: "5%" }}>
            <div className="mb-2 row">
              <label htmlFor="entrepot" className="col-sm-1 col-form-label">
                Etrepot
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="entrepot"
                  value={entrepot}
                  onChange={(e) => setEntrepot(e.target.value)}
                  required
                >
                  <option defaultValue={""}></option>
                  {entrepots.map((entrepot) => (
                    <option value={entrepot.id_entrepot}>
                      {" "}
                      {entrepot.nom_entrepot} | {entrepot.air_stockage}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <label className="col-sm-2 col-form-label">Date d'alerte</label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control "
                  value={dateAlert}
                  onChange={(e) => setDatealert(e.target.value)}
                />
              </div>
            </div>

            <div className="divTab" style={{ width: "100%", margin: "0px" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          let checked = e.target.checked;
                          setBoxe(
                            boxe.map((d) => {
                              d.select = checked;
                              return d;
                            })
                          );
                        }}
                      ></input>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Categorie</th>
                    <th scope="col">Nom produit</th>
                    <th scope="col">Poids(Kg)</th>
                    <th scope="col">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {boxe.map((p, key) => (
                    <tr key={key}>
                      <th scope="row">
                        <input
                          onChange={(event) => {
                            let checked = event.target.checked;
                            setBoxe(
                              boxe.map((data, k) => {
                                if (p.cle === data.cle) {
                                  data.select = checked;
                                }
                                return data;
                              })
                            );
                          }}
                          type="checkbox"
                          checked={p.select}
                        ></input>
                      </th>
                      <td>{p.id_produit}</td>
                      <td>{p.categorie}</td>
                      <td>{p.nom_produit}</td>
                      <td>{p.poids / 1000}</td>
                      <td>{p.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
            onClick={() => ajout()}
          >
            Oui
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              props.handleClose();
              props.HandelCloseAjout();
            }}
          >
            Terminer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AjouterStock;
