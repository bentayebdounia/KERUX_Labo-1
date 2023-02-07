import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import serviceStock from '../../service/service.stock'
import EnregistrementService from '../../service/service.enregistrement'
import serviceAlert from '../../service/service.alert';

const Recape = (props) => {
    const [stock , setStock] = useState()
   
    var [boxe,setBoxe] = useState([])
    var produitFourni= []
    produitFourni= JSON.parse(localStorage.getItem('produitsFournis') || '[]')
    
    
    
    for(var i=0 ; i<produitFourni.length; i++){
        //console.log(produitFourni[i].id_prod)
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

         supprimerProduitFourni()
    }

    const dateAlert = () => {
        const d = new Date
        /*
        if (categorie === "poulet" ){
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+7)
        }

        else if (categorie === "legume" ){
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+3)
        }*/
        return d
    }

    const ajouterBoxe = async(id_produit,id) => {
        var box=[]
        box = JSON.parse(localStorage.getItem('boxes'+id) || '[]')
        console.log(box);
        
           
            //var boxes= []
            var i=0
            
            while(i<box.length){
                console.log(i+1)
                var cle = ajouterCle(box[i].categorie, box[i].nom_produit,i+1)
                if (box[i].id_stock === null){
                    await EnregistrementService.ajouerEnregistrement(box[i].categorie, box[i].nom_produit, "enregistrement",parseFloat (box[i].poids),parseInt (box[i].nombre), id_produit, props.fk_fournisseur, props.id_bon, cle)
                    
                    .then((res) => {
                        
                        console.log(res.data);
                        
                        serviceAlert.ajouterAlert(res.data.id_process, dateAlert()).then ((result) =>{
                            alert (result.data)
                        })
                        
                        
                    })
            }
            if (box[i].id_stock !== null) {
                await EnregistrementService.ajouerEnregistrement(box[i].categorie, box[i].nom_produit, "enregistrement",parseFloat (box[i].poids),parseInt (box[i].nombre), id_produit, props.fk_fournisseur, props.id_bon, cle)
                    
                    .then((res) => {
                        
                        console.log(res.data);
                        serviceAlert.ajouterAlert(res.data.id_process,  box[i].date_alert).then ((result) =>{
                            alert (result.data)
                        })
                        ajouterauStock(res.data.id_gnerate,box[i].id_stock)
                        
                        
                    })
            }
                i++
            }}

            const ajouterCle = (categorie, type, numeroBox) => {
                if (categorie === "poulet"){
                    if (type === "poulet") return 'PP'+numeroBox
                    else if (type === "tendres") return 'PT'+numeroBox
                         else if (type === "wings") return 'PW'+numeroBox
                              else if (type === "dips") return 'PD'+numeroBox
                                    else if (type === "hotDogs") return 'PH'+numeroBox
                }

                else if (categorie === "legume"){
                    if (type === "frite") return 'LF'+ numeroBox
                    else if (type === "laitue") return 'LL'+numeroBox
                        else if (type === "tomate") return 'LT'+numeroBox
                            else if (type === "oignon") return 'LO'+numeroBox
                                    else if (type === "choux") return 'LCH'+numeroBox
                                        else if (type === "carotte") return 'LC'+numeroBox
                }

                    else return 'A'+numeroBox
            }

            const numero_box = (n) =>
            {
                if (n >0 && n<10) return (0+''+n)
                else return n
            }
            
           

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
        
        //props.recepBtn ()
        props.handleClose () 
        props.toggleshow ()
        props.recepBtn ()

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
                                                    <th scope="col">Poids(Kg) </th>
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
                                                                <td>{p.poids/1000}</td>
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