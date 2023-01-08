import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import EnregistrementService from '../../service/service.enregistrement'
import ModalQStock from './stockEnregistrement/questStock'
import ModelReponse from '../../Models/Model.repense'
import Boxes from './boxes'
import AffichageBoxes from './boxAffichage';

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
    //const [prodF, setProdf] = useState(JSON.parse (localStorage.getItem ('produitsFournis')))
    

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

    const [tableboxe,setTableboxe] = useState([])


       //console.log("produitFourni: "+ props.produitFourni);  props.produitFourni.nombre_fourni
       //console.log("categorier= "+props.produitFourni.categorie+ "\n id produit " +props.produitFourni.id_produit);

       function transforme(unite, poids){
        console.log(unite);
        if (unite==="kg") {
            console.log(poids);
            return poids*1000
        }
        else return poids
    }

    function verificationPoids(poids, nombre , unite){
        
        console.log(poids*1000/nombre)
        return transforme(unite, poids)/nombre

    }

    function plus () {
        setConteur(conteur+1)
        setPoisrester(parseFloat(poidsRester)+parseFloat(transforme(boxe[0].unite, boxe[0].poids))) 
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
        
        console.log(props.poids-poidsRester); 
        if(parseFloat(poidsRester)+parseFloat(boxe[0].poids) <= props.poids){
            if (props.categorie==="poulet" && parseFloat(nbrRester)+parseFloat(boxe[0].nombre) <= props.nombre ){
                if(boxe[0].poids ===0  || boxe[0].poids ==='0'|| boxe[0].poids ==='') setErreurpoids(true)
                    
               
                if (boxe[0].nombre===0 || boxe[0].nombre==='0' || boxe[0].nombre==='')  setErreurnombre(true)
    
                if ( (boxe[0].poids !==0 && boxe[0].poids !=='' && boxe[0].poids !=='0') &&  (boxe[0].nombre !==0 && boxe[0].nombre !=='0' && boxe[0].nombre !=='') && boxe[0].unite !=='')
                    {
                        console.log(props.categorie);
                        console.log(verificationPoids(boxe[0].poids,boxe[0].nombre, boxe[0].unite  ))
                            if(verificationPoids(boxe[0].poids,boxe[0].nombre, boxe[0].unite)>=1500 && verificationPoids(boxe[0].poids,boxe[0].nombre, boxe[0].unite )<=2000)
                                {   console.log(transforme(boxe[0].unite, boxe[0].poids));
                                    plus() }

                            else alert ("verifier le poids ")
                    }
            } 
            //poids de nombre
            else { if(boxe[0].poids ===0 || boxe[0].poids ==='0' || boxe[0].poids ==='') setErreurpoids(true)
            
                 else if (boxe[0].poids !==0 && boxe[0].poids !=='0' && boxe[0].poids !==''  ) {
                      console.log(props.categorie);
                      //boxe[0].poids = transforme(boxe[0].unite, boxe[0].poids)
                    plus()
                     }}
        }
        else {handleShow()  }
        
        
    }

    const confirmAjoutBoxes = (e) => {
            e.preventDefault();
            var boxes= []
            var i=1
            while(i<boxe.length){
               /* 
                EnregistrementService.ajouerEnregistrement(props.produitFourni.categorie, props.produitFourni.nom_produit, "enregistrement", boxe[i].poids, boxe[i].nombre, props.produitFourni.id_produit)
                .then((res) => {
                    
                    tableboxe.push(res.data)
                    
                })*/
                
                var b = {
                    categorie: props.produitFourni.categorie,
                    nom_produit: props.produitFourni.nom_produit,
                    etape: "enregistrement",
                    poids: boxe[i].poids,
                    nombre: boxe[i].nombre,
                    id_produit: props.id
                }
                tableboxe.push(b)
                localStorage.setItem ('boxes'+ props.id, JSON.stringify(tableboxe))


            i=i+1
            }
           
            var tab= []
            tab= JSON.parse(localStorage.getItem('produitsFournis'))
           for(var i=0; i<tab.length; i++){
                if (tab[i].id_prod === props.id){
                    tab[i].poidsRester = props.poids-poidsRester
                    console.log("tab",tab[i].poidsRester );
                }
           }
            console.log( tableboxe);
           
            setBoxe([...nboxe] )
           //props.poidsRestant((props.poids-poidsRester)/1000)
           localStorage.setItem('produitsFournis', JSON.stringify(tab))
            handleShowQstock()
            props.handleClose()
            boxe[0].poids=""
            boxe[0].nombre=""
            tableboxe.splice("")
            boxe.splice("")
            setConteur(0)
            

    }

    const annuler = () => {
        //tableboxe.splice("")
        
        boxe[0].poids=""
        boxe[0].nombre=""
        setBoxe([...nboxe])
        props.handleClose()


        
        setPoisrester(0)
        setNbrrester(0)
        setConteur(0)
      
    }
  // console.log( prodF);
    return (
        <>
      <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ajouter des boxes</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {props.poidsRestant}
                <div className="mb-3 row">
                    
                
                    
                    <p> {props.test}</p>
                
                    
                <label htmlFor="poids" className="col-sm-3 form-label">
                                    <div className="progress"> POIDS
                                        <div className="progress-bar bg-success " role="progressbar" aria-label="Example with label" style={{width: ((props.poidsRestant-poidsRester)*100/props.poidsRestant)+"%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {(props.poidsRestant-poidsRester)/1000} Kg</div>
                                    </div>
                    </label>

                    {props.categorie==="poulet" &&  <label htmlFor="poids" className="col-sm-3 form-label">
                                    <div className="progress"> NOMBRE
                                        <div className="progress-bar bg-success " role="progressbar" aria-label="Example with label" style={{width: ((props.nombre-nbrRester)*100/props.nombre)+"%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {props.nombre-nbrRester} </div>
                                    </div>
                    </label>}
                <div>
                {boxe.map((box,key) => {
                    return ( 
                        <>
                        
                        <div className="col-sm-10 mb-3" id= "produitFourni" key={key}>
                                <Boxes 
                                    categorie = {props.categorie}
                                    n_produit={props.type}
                                    nom_produit = {box.nom_produit} 

                                    poids = {box.poids} onPoidsChange={newPoids => {
                                        const newProduits = [...boxe]
                                        newProduits[key].poids = newPoids
                                        setBoxe(newProduits)
                                        }} 

                                        unite= {boxe.unite} onUniteChange={newUnite => {
                                            const newProduits = [...boxe]
                                            newProduits[key].unite = newUnite
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