import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import serviceStock from '../../service/service.stock'
import EnregistrementService from '../../service/service.enregistrement'


const Recape = (props) => {
    const [stock , setStock] = useState()
   
    var [boxe,setBoxe] = useState([])
    var produitFourni= []
    produitFourni= JSON.parse(localStorage.getItem('produitsFournis') || '[]')
    
    
    
    for(var i=0 ; i<produitFourni.length; i++){
        console.log(produitFourni[i].id_prod)
        boxe= boxe.concat(JSON.parse(localStorage.getItem('boxes'+produitFourni[i].id_prod ) || '[]'))
    }

    const ajouterBon = async() => {
        
        for (var i =0 ; i<produitFourni.length ; i++){
            var id = produitFourni[i].id_prod
            
        await EnregistrementService.ajouterProduitFournit(produitFourni[i].categorie, produitFourni[i].nom_produit,  produitFourni[i].poids_fourni, produitFourni[i].nombre_fourni, produitFourni[i].id_bon)
            .then((res) => {
                //console.log(res.data[0].id_produit);
                
                ajouterBoxe(res.data[0].id_produit, produitFourni[i].id_prod)
             
         })}
    }

    const ajouterBoxe = async(id_produit,id) => {
        var box=[]
        box = JSON.parse(localStorage.getItem('boxes'+id) || '[]')
        console.log(box);
        
           
            //var boxes= []
            var i=0
            
            while(i<box.length){
                console.log(i)
                if (box[i].id_stock === null){
                    await EnregistrementService.ajouerEnregistrement(box[i].categorie, box[i].nom_produit, "enregistrement",parseFloat (box[i].poids),parseInt (box[i].nombre), id_produit)
                    
                    .then((res) => {
                        console.log(res.data);
                        
                            
                        
                        
                    })
            }
            if (box[i].id_stock !== null) {
                await EnregistrementService.ajouerEnregistrement(box[i].categorie, box[i].nom_produit, "enregistrement",parseFloat (box[i].poids),parseInt (box[i].nombre), id_produit)
                    
                    .then((res) => {
                        
                        console.log(res.data);
                        ajouterauStock(res.data.id_gnerate,box[i].id_stock)
                        
                        
                    })
            }
                i++
            }}
            
           

    const  ajouterauStock = async(id_gnerate, id_stock) =>{
       
          await serviceStock.ajouterStock(parseFloat(id_stock)).then((res) => {
              setStock(res.data)
              console.log(res.data.id_stock)
              //console.log(stock.id_stock)
              serviceStock.modifierProcess(id_gnerate, res.data.id_stock).then( (res) => {
                  console.log(res.data)
                  alert(res.data+ "bien ajout")
              })
              
          })  
          
          
      }
      const supprimerProduitFourni=()=>{
        
        var tab= []
        tab= JSON.parse(localStorage.getItem('produitsFournis'))
       for(var i=0; i<tab.length; i++){
            localStorage.removeItem('boxes'+tab[i].id_prod)
       }
        console.log( tab);
        localStorage.removeItem('produitsFournis')
        
      }
    const valider = () => {

        ajouterBon()  
        supprimerProduitFourni()
        props.recepBtn ()
        props.handleClose ()   
        //props.recepBtn ()

    }
    
    //console.log(props.tableBox);

    return (  
        <>
        
            <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recape de l'etape enregistrement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <div style={{margin:"5%", marginRight:"5%"}}>
                                        
                                        <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                                            <table className="table table-bordered"  >
                                            <thead>
                                                <tr>
                                                
                                                    <th scope="col">ID Produit</th>
                                                    <th scope="col">Categorie</th>
                                                    <th scope="col">Nom produit</th>
                                                    <th scope="col">Poids</th>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">stock</th>
                                                
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
                                                                <td>{p.stock}</td>
                                                            </tr>
                                                    )
                                                }
                                            
                                            </tbody>}
                                            </table>
                                        </div>
                                    
                                </div> 
                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() =>{ props.handleClose() }}>ANNULER</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={ ()=> valider ()}>VALIDER</button>
                        
                </Modal.Footer>
             </Modal>

             
        </>
        
        
     )
}
 
export default Recape;