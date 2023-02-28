import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceStock from '../../../service/service.stock'


const ModalSortieStock = (props) => {
    

     const [poids, setPoids] = useState();
     const [unite, setUnite] = useState("kg");

     function transforme(unite, poids) {
       console.log(unite);
       if (unite === "kg") {
         console.log(poids);
         return poids * 1000;
       } else if (unite === "gramme") return poids;
     }

     const sortieStock = (e) => {
       ServiceStock.modifierStock(
         transforme(unite, poids),
         props.process.fk_stock
       ).then((res) => {
         console.log(res.data);
       });

       props.handleClose2();
       props.toggleshow();

       props.BtnV();
     };

     return (
       <>
         <Modal size="lg" show={props.show2} onHide={props.handleClose2}>
           <Modal.Header closeButton>
             <Modal.Title>Sortie de stock</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <div className="mb-3 row">
               <label for="id_box" className="col-sm-2 col-form-label">
                 ID Box
               </label>
               <div className="col-sm-10">
                 <input
                   type="text"
                   className="form-control"
                   id="id_box"
                   readOnly={props.id}
                   defaultValue={props.id}
                   required
                 />
               </div>
             </div>

             <div className="mb-3 row">
               <label htmlFor="categorie" className="col-sm-2 col-form-label">
                 Categorie de produit
               </label>
               <div className="col-sm-10">
                 <input
                   type="text"
                   className="form-control"
                   id="categorie"
                   readOnly={props.process.categorie}
                   defaultValue={props.process.categorie}
                   required
                 />
               </div>
             </div>

             <div className="mb-3 row">
               <label htmlFor="produit" className="col-sm-2 col-form-label">
                 Type de produit
               </label>
               <div className="col-sm-10">
                 <input
                   type="text"
                   className="form-control"
                   id="produit"
                   readOnly={props.process.nom_produit}
                   defaultValue={props.process.nom_produit}
                   required
                 />
               </div>
             </div>

             <div className="mb-3 row">
               <label htmlFor="poids" className="col-sm-2 col-form-label">
                 Poids de sortie
               </label>
               <div className="col-sm-7">
                 <input
                   type="text"
                   className="form-control"
                   id="poids"
                   value={poids}
                   onChange={(e) => setPoids(e.target.value)}
                   required
                 />
               </div>
               <div className="col-sm-3">
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
             </div>
           </Modal.Body>
           <Modal.Footer>
             <button
               type="button"
               className="btn btn-danger"
               data-bs-dismiss="modal"
               onClick={props.handleClose2}
             >
               Non
             </button>
             <button
               type="button"
               className="btn btn-success"
               onClick={(e) => sortieStock(e)}
             >
               Oui
             </button>
           </Modal.Footer>
         </Modal>
       </>
     );
}
 
export default ModalSortieStock;