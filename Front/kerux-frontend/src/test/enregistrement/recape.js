import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'


const Recape = (props) => {

   
    var [boxe,setBoxe] = useState([])
    var produitFourni= []
   produitFourni= JSON.parse(localStorage.getItem('produitsFournis') || '[]')
    
    
    
    for(var i=0 ; i<produitFourni.length; i++){
        console.log(produitFourni[i].id_prod)
        boxe= boxe.concat(JSON.parse(localStorage.getItem('boxes'+produitFourni[i].id_prod ) || '[]'))
    }
    
    const non = () => {
        
        props.handleClose ()    

    }
    
    //console.log(props.tableBox);

    return (  
        <>
        
            <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recape de l'etape enregistrement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {boxe.length}
                    <div style={{margin:"5%", marginRight:"5%"}}>
                                        
                                        <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                                            <table className="table table-bordered"  >
                                            <thead>
                                                <tr>
                                                
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Categorie</th>
                                                    <th scope="col">Nom produit</th>
                                                    <th scope="col">Poids</th>
                                                    <th scope="col">Nombre</th>
                                                
                                                </tr>
                                            </thead>
                                            {boxe.length>=1 && <tbody>
                                        
                                                { 
                                                    boxe.map( (p, key) =>
                                                            <tr key={key}>
                                                                
                                                                <td>{p.id_produit}</td>
                                                                <td>{p.categorie}</td>
                                                                <td>{p.nom_produit}</td>
                                                                <td>{p.poids}</td>
                                                                <td>{p.nombre}</td>
                                                                
                                                            </tr>
                                                    )
                                                }
                                            
                                            </tbody>}
                                            </table>
                                        </div>
                                    
                                </div> 
                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={ ()=> non ()}>VALIDER</button>
                        
                </Modal.Footer>
             </Modal>

             
        </>
        
        
     )
}
 
export default Recape;