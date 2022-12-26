import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import EnregistrementService from '../../service/service.enregistrement'
import ModalQStock from './stockEnregistrement/questStock'
import ModelReponse from '../../Models/Model.repense'
import Boxes from './boxes'

const ModalAjoutBoxes = (props) => {
    const [test, setTest] = useState(false)

    const [showQstock, setShowQstock] = useState(false)
    const handleCloseQstock = () => setShowQstock(false)
    const handleShowQstock = () => setShowQstock(true)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [conteur, setConteur] = useState (0)
    const [poidsRester, setPoisrester] = useState(0)
    const [nbrRester, setNbrrester] = useState(0)

    const [erreurPoids, setErreurpoids] = useState(false)
    const [erreurNombre, setErreurnombre] = useState(false)

    const [boxe,setBoxe] = useState([{
        nom_produit: "",
        poids: 0,
        nombre: 0,
        date:new Date()
    }])

    const [nboxe,setNBoxe] = useState([{
        nom_produit: "",
        poids: 0,
        nombre: 0,
        date:new Date()
    }])

    const [tableboxe,setTableboxe] = useState([{
            categorie: "" ,
            nom_produit: "",
            poids:0, 
            nombre: 0,
            id_gnerate:""
        
    }])

       //console.log("produitFourni: "+ props.produitFourni);  props.produitFourni.nombre_fourni
       //console.log("categorier= "+props.produitFourni.categorie+ "\n id produit " +props.produitFourni.id_produit);

    function plus () {
        setConteur(conteur+1)
        setPoisrester(parseFloat(poidsRester)+parseFloat(boxe[0].poids)) 
        setNbrrester (parseFloat(nbrRester)+parseFloat(boxe[0].nombre))
        const newBoxe = [...boxe]
        
               
        newBoxe.push({
            categorie:'',
            nom_produit:'',
            poids:0,
            nombre:0,
            date:new Date()
        })
        //console.log('poids= '+boxe[0].poids)
        setBoxe(newBoxe.sort((a,b) => {
            if(a.date < b.date)
                return 1
            if(a.date > b.date)
                return -1
            return 0
        }))
    }

    const  plusId = () => {
        
        console.log(props.produitFourni.poids_fourni-poidsRester); 
        if(parseFloat(poidsRester)+parseFloat(boxe[0].poids) <= props.produitFourni.poids_fourni){
            if (props.produitFourni.categorie==="poulet" && parseFloat(nbrRester)+parseFloat(boxe[0].nombre) <= props.produitFourni.nombre_fourni ){
                if(boxe[0].poids ===0  || boxe[0].poids ==='0'|| boxe[0].poids ==='') setErreurpoids(true)
                    
               
                if (boxe[0].nombre===0 || boxe[0].nombre==='0' || boxe[0].nombre==='')  setErreurnombre(true)
    
                if ( (boxe[0].poids !==0 && boxe[0].poids !=='' && boxe[0].poids !=='0') &&  (boxe[0].nombre !==0 && boxe[0].nombre !=='0' && boxe[0].nombre !==''))
                    {
                        console.log(props.produitFourni.categorie);
                        plus()
                    }
            } 
            //poids de nombre
            else { if(boxe[0].poids ===0 || boxe[0].poids ==='0' || boxe[0].poids ==='') setErreurpoids(true)
            
                 else if (boxe[0].poids !==0 && boxe[0].poids !=='0' && boxe[0].poids !==''  ) {
                      console.log(props.produitFourni.categorie);
                    plus()
                     }}
        }
        else {handleShow()  }
        
        
    }

    const confirmAjoutBoxes = (e) => {
            e.preventDefault();
            
            var i=1
            while(i<boxe.length){
                
                EnregistrementService.ajouerEnregistrement(props.produitFourni.categorie, props.produitFourni.nom_produit, "enregistrement", boxe[i].poids, boxe[i].nombre, props.produitFourni.id_produit)
                .then((res) => {
                    
                    tableboxe.push(res.data)
                    
                })

            i=i+1
            }

            console.log( tableboxe);
            console.log("hello");
            setBoxe([...nboxe] )
            handleShowQstock()
            props.handleClose()
            tableboxe.splice("")
            boxe.splice("")
            setConteur(0)
    }

    const annuler = () => {
        tableboxe.splice("")
        
        setBoxe([...nboxe])
        props.handleClose()
        setPoisrester(0)
        setNbrrester(0)
        setConteur(0)
      
    }
   
    return (
        <>
      <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ajouter des boxes</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="mb-3 row">
                
                    
                <label htmlFor="poids" className="col-sm-3 form-label">
                                    <div className="progress"> POIDS
                                        <div className="progress-bar bg-success " role="progressbar" aria-label="Example with label" style={{width: ((props.produitFourni.poids_fourni-poidsRester)*100/props.produitFourni.poids_fourni)+"%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {props.produitFourni.poids_fourni-poidsRester} </div>
                                    </div>
                    </label>

                    {props.produitFourni.categorie==="poulet" &&  <label htmlFor="poids" className="col-sm-3 form-label">
                                    <div className="progress"> NOMBRE
                                        <div className="progress-bar bg-success " role="progressbar" aria-label="Example with label" style={{width: ((props.produitFourni.nombre_fourni-nbrRester)*100/props.produitFourni.nombre_fourni)+"%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {props.produitFourni.nombre_fourni-nbrRester} </div>
                                    </div>
                    </label>}
                <div>
                {boxe.map((box,key) => {
                    return ( 
                        <>
                        
                        <div className="col-sm-10 mb-3" id= "produitFourni" key={key}>
                                <Boxes 
                                    categorie = {props.produitFourni.categorie}
                                    n_produit={props.produitFourni.nom_produit}
                                    nom_produit = {box.nom_produit} 

                                    poids = {box.poids} onPoidsChange={newPoids => {
                                        const newProduits = [...boxe]
                                        newProduits[key].poids = newPoids
                                        setBoxe(newProduits)
                                        }} 
                                    erreurPoids = {erreurPoids}
                                    erreurNombre ={erreurNombre}
                                    nombre = {box.nombre} onNombreChange={newNombre => {
                                        const newProduits = [...boxe]
                                        newProduits[key].nombre = newNombre
                                        setBoxe(newProduits)
                                        }} 
                              />

                            {key === 0 && (<>
                                            <button className="btn btn-dark btn-outline-dark position-relative" type="button" id="boxBtn"
                                             onClick={(e) => plusId(e)} >
                                                <i className="bi bi-plus-lg" style={{color: "white"}}> Ajouter box </i> 
                                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                                                    {conteur}
                                                    <span class="visually-hidden">unread messages</span>
                                                </span>
                                             </button>
                                             
                                                </> )
                                             }
                               
                    </div>
                    
                    {key===0 && <p style={{borderBottom :'5px solid', borderRadius:"3px" , borderColor:'#a6a6a6'}}></p>}
                    
                    </>
                        
                    ) })} 
             
                </div>
                
                 
            </div>
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => annuler()}>annuler</button>
                    <button type="button" className="btn btn-success" onClick={(e)=>confirmAjoutBoxes(e) } >Valider</button>
            </Modal.Footer>
      </Modal>

       <ModalQStock 
                                                show = {showQstock}
                                                handleClose = {handleCloseQstock}
                                                tableBox = {tableboxe}
                                                />
        <ModelReponse
                show={show} 
                handleClose={handleClose} 
                handleShow={handleShow} 
                message={"Le poids ou le nombre est incorrect"} 
                titre={"d'erreur"} 
                />
      
</>
    )
  
}
export default ModalAjoutBoxes;