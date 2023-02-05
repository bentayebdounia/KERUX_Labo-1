import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import serviceEntrepot from '../../service/service.entrepot'


const AffichageBoxes = (props) => {

    const [entrepots, setEntrepots] = useState([])
    const [entrepot, setEntrepot] = useState('')
    const [stock , setStock] = useState()
    const [toggle, setToggle] = useState(false)
    const toggleOn = () => setToggle(true)
    const toggleOff = () => setToggle(false)

    
    const [poids, setPoids] = useState('')
    const [nombre, setNombre] = useState('')
    const [date_alert , setDatealert] = useState('')
    
    useEffect(()=> {
        serviceEntrepot.getEntrepot()
        .then ((res)=> {
            setEntrepots(res.data)
            
        })
    })
    
    var n=props.id
    const [boxe,setBoxe] = useState(
        JSON.parse (localStorage.getItem('boxes'+props.id) || '[]').map(d => {
            return {
                select: false,
                categorie: d.categorie,
                date: d.date,
                id_produit: d.id_produit,
                id_stock: d.id_stock,
                nom_produit: d.nom_produit,
                poids: d.poids,
                nombre: d.nombre,
                stock: d.stock,
                date_alert:d.date_alert

                
            
            }
        })
        )
    //console.log(props.id); 
    const non = () => {
        
        props.handleClose ()    

    }
    const supprimerbox=(id)=>{
        
        var tab= []
        tab= JSON.parse(localStorage.getItem('boxes'+props.id))
       for(var i=0; i<tab.length; i++){
            if (tab[i].id_prod === id){
                tab.splice(i,1)
            }
       }
        console.log( tab);
        localStorage.setItem('boxes'+props.id, JSON.stringify(tab))
      }
    
    //console.log(props.tableBox);
    const champtVerify = () => {
        
        if (entrepot === "" ) return true
        else if (entrepot !== ""  && date_alert !== "") {
             alert(date_alert) 
             return  true
            }
        else return false
    }
    const enregistrer = (id, key, poid, nbr) => {

       if (Math.abs(poid - parseFloat (poids)) <= props.poidsRester ) {
            setPoids('')
            setNombre('')
            setEntrepot('')
            setDatealert('') 
            return false
     }
        
        else if (nombre !=='' && poids !== ''  && champtVerify() )
        {
            var tab= []
            tab= JSON.parse(localStorage.getItem('boxes'+props.id))
            //console.log(boxe);
            const n = entrepots.find(({ id_entrepot }) => id_entrepot === parseInt(entrepot))
           // console.log('entrepot='+ entrepot);

            for(var i=0; i<tab.length; i++){
                //console.log((key));
                //console.log(boxe.date);
                if (i === key){
                    console.log((poids));
                    if (poids !== '')
                        {
                        var poidsResterNv = props.poidsRester + tab[i].poids
                        tab[i].poids=poids
                        boxe[i].poids =poids
                        props.modifierPoidsRester(tab[i].id_produit , poidsResterNv-tab[i].poids )
                        }
                    else {
                        tab[i].poids = poid
                        boxe[i].poids =poid
                    }
                    if (nombre !== ''){
                        tab[i].nombre = nombre
                        boxe[i].nombre =nombre
                    }
                    else{
                        tab[i].nombre = nbr
                        boxe[i].nombre =nbr
                    }
                    if (entrepot === '' ){
                        console.log('id box');
                        tab[i].id_stock = entrepot
                        console.log(tab[i].id_stock);
                        tab[i].stock=""
                        boxe[i].id_stock =entrepot
                        console.log(boxe[i].id_stock);
                        boxe[i].stock = ""
                        tab[i].date_alert=""
                        boxe[i].date_alert = ""
                    }

                    else {
                        console.log('id box');
                        tab[i].id_stock = entrepot
                        console.log(tab[i].id_stock);
                        tab[i].stock=n.nom_entrepot
                        tab[i].date_alert=date_alert
                        boxe[i].id_stock =entrepot
                        console.log(boxe[i].id_stock);
                        boxe[i].stock = n.nom_entrepot
                        boxe[i].date_alert = date_alert


                    }
                
                }
                }
                console.log(tab);
                localStorage.setItem('boxes'+props.id, JSON.stringify(tab))
                setPoids('')
                setNombre('')
                setEntrepot('')
                setDatealert('')
                return false
    }
            else return true
    }

    return (  
        <>
            <Modal size="fullscreen" scrollable={true} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Affichage des boxes</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div style={{margin:"5%", marginRight:"5%"}}>
                                        
                                        <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                                            <table className="table table-bordered"  >
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Categorie</th>
                                                    <th scope="col">Nom produit</th>
                                                    <th scope="col">Poids(Kg) </th>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">stock</th>
                                                    <th scope="col">Date alerte</th>
                                                    <th scope="col"></th>

                                                
                                                </tr>
                                            </thead>
                                            <tbody>
                                        
                                                {
                                                    boxe.map( (p, key) =>
                                                            <tr key={key}>
                                                            {p.select === false &&  <>
                                                                <td>{p.id_produit}</td>
                                                                <td>{p.categorie}</td>
                                                                <td>{p.nom_produit}</td>
                                                                <td>{p.poids}</td>
                                                                <td>{p.nombre}</td>
                                                                <td>{p.stock}</td>
                                                                <td>{p.date_alert}</td>
                                                                <td>
                                                                <input
                                                                    onClick={() => {
                                                                        let checked = true;
                                                                        setBoxe(
                                                                        boxe.map((data,k) => {
                                                                            if (key === k) {
                                                                            data.select = checked;
                                                                            }
                                                                            return data;
                                                                        })
                                                                        );
                                                                    }}
                                                                    type="button"
                                                                    className='btn' style={{background:"#4f8b2a", color:"white"}}
                                                                    value='MODIFIER'
                                                                    checked={p.select}
                                                                    ></input>
                                                                   </td>
                                                                    </>
                                                                    }
                                                                    { p.select===true &&  <>
                                                                        <td> {p.id_produit} </td>
                                                                        <td> {p.categorie} </td>
                                                                        <td> {p.nom_produit}  </td>
                                                                        <td> <input value={poids} type="number" placeholder={p.poids} 
                                                                                            onChange={event => { 
                                                                                                                 setPoids(event.target.value)
                                                                                                                }}/>
                                                                        {poids==='' && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le poids  </p>}
                                                                        </td>
                                                                        <td> 
                                                                            <input value={nombre} type="number" placeholder={p.nombre} onChange={event => setNombre(event.target.value)} /> 
                                                                            {nombre==='' && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le nombre  </p>}
                                                                        </td>
                                                                        <td> 
                                                                            <select className="form-select" aria-label="Default select example" id="entrepot" value={entrepot} onChange={(e)=> setEntrepot(e.target.value)} >
                                                                                 <option value={""} ></option>
                                                                                {entrepots.map( (entrepot,key) =>
                                                                                   <> 
                                                                                    
                                                                                    <option value={entrepot.id_entrepot}> {entrepot.nom_entrepot} </option>
                                                                                    </>
                                                                                )}  
                                                                                
                                                                            </select>  
                                                                        </td>
                                                                        <td>{  entrepot !== '' &&
                                                                            <input  type="date" className="form-control " value={date_alert} onChange={(e)=> setDatealert(e.target.value)}/>
                                                                            }
                                                                            { entrepot !== ''  && date_alert==='' && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter la date d'alerte  </p>}
                                                                            </td>
                                                                        <td>
                                                                        <input
                                                                            onClick={() => {
                                                                                
                                                                                setBoxe(
                                                                                boxe.map((data,k) => {
                                                                                    if (key === k) {
                                                                                        data.select = enregistrer(p.date,key, p.poids,p.nombre);
                                                                                        
                                                                                    }
                                                                                    return data;
                                                                                })
                                                                                );
                                                                                
                                                                            }}
                                                                            type="button"
                                                                            className='btn' style={{background:"#4f8b2a", color:"white"}}
                                                                            value='ENREGISTRER'
                                                                            checked={p.select}
                                                                            >
                                                                        </input>
                                                                    
                                                                    <input
                                                                    onClick={() => {
                                                                       
                                                                        let checked = false;
                                                                        setPoids('')
                                                                        setNombre('')
                                                                        setEntrepot('')
                                                                        setDatealert('')
                                                                        setBoxe(
                                                                        boxe.map((data,k) => {
                                                                            if (key === k) {
                                                                            data.select = checked;
                                                                            }
                                                                            return data;
                                                                        })
                                                                        );
                                                                       
                                                                    }}
                                                                    type="button"
                                                                    className='btn' style={{background:"red", color:"white"}}
                                                                    value='ANNULER'
                                                                    checked={p.select}
                                                                    ></input>
                                                                                    </td>

                                                          
                                                                               </>
                                                                

                                                                
                                                                               }
                                                                
                                                                
                                                            </tr>
                                                    )
                                                }
                                            
                                            </tbody>
                                            </table>
                                        </div>
                                    
                                </div> 
                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={ ()=> non ()}>OK</button>
                        
                </Modal.Footer>
             </Modal>

             
        </>
        
        
     )
}
 
export default AffichageBoxes;