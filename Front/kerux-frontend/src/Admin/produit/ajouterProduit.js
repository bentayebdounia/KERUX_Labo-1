import React, { useState, useEffect } from "react";
import ModelReponse from "../../Models/Model.repense";
import serviceProduit from "../../service/service.produit";

const AjouterProduit = (props) => {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [nomProduit, setNomproduit] = useState("");
  const [dateExperation, setDate_experation] = useState("");
  const [verifier, setVerifier] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    serviceProduit.getCategorie().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const verificetionChamp = () => {
    if (categorie !== "" && nomProduit !== "") {
      setVerifier(true);
      return true;
    } else {
      setVerifier(false);
      console.log("verifier");
      return false;
    }
  };

  const fonctionAjouter = async (e) => {
    e.preventDefault();
    if (verificetionChamp() === true) {
      await serviceProduit
        .ajouterProduit(
          parseInt(categorie),
          nomProduit,
          parseInt(dateExperation)
        )
        .then((res) => {
          if (res.data === "produit bien ajouter") {
            setMessage("Produit bien ajouter");
            handleShow();
            setCategorie("");
            setNomproduit("");
          }
        });
    } else {
      setMessage("Veillez remplir les champs");
      handleShow();
    }
  };

  return (
    <>
      <div>
        <h1 id="titre">Ajouter Produit</h1>

        <section className="section" id="ajouterAgent">
          <form className="needs-validation" name="formModify" noValidate>
            <div className="mb-3 row">
              <label for="roleAgentAjout" className="col-sm-2 col-form-label">
                Categorie<span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="roleAgentAjout"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                >
                  <option value={""}></option>
                  {categories.map((categorie, key) => (
                    <option value={categorie.id_categorie}>
                      {" "}
                      {categorie.nom_categorie}{" "}
                    </option>
                  ))}
                </select>

                {verifier === false && categorie === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez selectionner la categorie{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label for="adresseAgent" className="col-sm-2 col-form-label ">
                Nom de produit<span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="adresseAgent"
                  value={nomProduit}
                  onChange={(e) => setNomproduit(e.target.value)}
                />
                {verifier === false && nomProduit === "" && (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {" "}
                    *Veillez saisir le nom de produit{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="d-grid gap-2 my-4">
              <button
                className="btn1"
                type="submit"
                id="ajouterbtn"
                onClick={(e) => fonctionAjouter(e)}
              >
                AJOUTER
              </button>
            </div>
          </form>
        </section>
        {show && (
          <ModelReponse
            show={show}
            handleClose={handleClose}
            titre={""}
            message={message}
          />
        )}
      </div>
    </>
  );
};

export default AjouterProduit;
