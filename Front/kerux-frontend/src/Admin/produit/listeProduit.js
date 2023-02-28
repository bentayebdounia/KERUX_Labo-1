import React ,{useState,useEffect} from 'react'
import serviceProduit from '../../service/service.produit'

const ListProduit = () => {

    const [categorie, setCategorie]= useState('')
    const [categories, setCategories]= useState([])

    const [produits, setProduits] = useState([])
    const [produits2, setProduits2] = useState([])
    //const [produits, setProduits] = useState([])
    //const [produit, setProduit] = useState('')
    const [postsPerPage] = useState(4);

    const [offset, setOffset] = useState(0);
  

  useEffect(() => {
    serviceProduit.getCategorie()
      .then((res) => {
        setCategories(res.data)
      })
    
  },[])

  useEffect(() => {
    if (categorie === "") {
      serviceProduit.getPageProduit(postsPerPage,offset).then((res) => {
        setProduits(res.data);
      });
    } else {
      console.log(categorie);
      serviceProduit.getProduitByCategorie(categorie).then((res) => {
        setProduits(res.data);
      });
    }

  },[categorie,offset])
    
    return (
      <>
        <div>
          <h1 id="titre">Liste des produits</h1>
          <div>
            <section className="section" id="modifierAgent">
              <div className="mb-3 row agent">
                <label for="roleAgentAjout" className="col-sm-2 col-form-label">
                  Categorie
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="roleAgentAjout"
                    style={{ width: "90%" }}
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    required
                  >
                    <option defaultValue={""}></option>
                    {categories.map((categorie, key) => (
                      <option value={categorie.nom_categorie}>
                        {" "}
                        {categorie.nom_categorie}{" "}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="divTab">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom produit </th>

                        <th scope="col">Categorie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produits.map((produit, key) => (
                        <tr key={key}>
                          <td>{produit.id_produit}</td>
                          <td>{produit.nom_produit}</td>

                          <td>{produit.nom_categorie}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
              
              {/* Pagination */}
              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  {offset > 0 && (
                    <li className="page-item">
                      <a
                        onClick={() => setOffset(offset - 4)}
                        href="#"
                        className="page-link"
                        style={{ color: "#7B170F" }}
                      >
                        precident
                      </a>
                    </li>
                  )}

                  <li className="page-item">
                    <a
                      onClick={() => {
                        setOffset(0);
                      }}
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      onClick={() => {
                        setOffset(4);
                      }}
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      ......
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      onClick={() => setOffset(offset + 4)}
                      href="#"
                      className="page-link"
                      style={{ color: "#7B170F" }}
                    >
                      suivant
                    </a>
                  </li>
                </ul>
              </nav>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );

}

export default ListProduit