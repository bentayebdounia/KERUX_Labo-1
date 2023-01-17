import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import serviceEntrepot from '../../service/service.entrepot'


const AffichageBoxes = (props) => {

    const [entrepots, setEntrepots] = useState([])
    const [entrepot, setEntrepot] = useState()
    const [stock , setStock] = useState()
    const [toggle, setToggle] = useState(false)
    const toggleOn = () => setToggle(true)
    const toggleOff = () => setToggle(false)

    
    const [poids, setPoids] = useState()
    const [nombre, setNombre] = useState()
    
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
    const enregistrer = (id) => {
        var tab= []
        tab= JSON.parse(localStorage.getItem('boxes'+props.id))
        console.log(boxe);
        const n = entrepots.find(({ id_entrepot }) => id_entrepot === parseInt(entrepot))
        for(var i=0; i<tab.length; i++){
            console.log((id));
            console.log(boxe.date);
            if (tab[i].date === id){
                console.log((poids));
                if (poids !== null)
                    {tab[i].poids=poids
                     boxe[i].poids =poids
                    }
                if (nombre !== null){
                    tab[i].nombre = nombre
                    boxe[i].nombre =nombre
                }
                if (entrepot !== ""){
                    tab[i].id_stock = entrepot
                    tab[i].stock=n.nom_entrepot
                    boxe[i].id_stock =entrepot
                    boxe[i].stock = n.nom_entrepot
            }
            }
       }
       console.log(tab);
       localStorage.setItem('boxes'+props.id, JSON.stringify(tab))
       setPoids(null)
       setNombre(null)
       setEntrepot(null)
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
                                                    <th scope="col">Poids</th>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">stock</th>
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
                                                                    {p.select===true &&  <>
                                                                        <td> {p.id_produit} </td>
                                                                        <td> {p.categorie} </td>
                                                                        <td> {p.nom_produit}  </td>
                                                                        <td> <input value={poids} type="number" placeholder={p.poids} 
                                                                                            onChange={event => { 
                                                                                                                 setPoids(event.target.value)
                                                                                                                }}/> </td>
                                                                        <td> <input value={nombre} type="number" placeholder={p.nombre} onChange={event => setNombre(event.target.value)} /> </td>
                                                                        <td> 
                                                                            <select className="form-select" aria-label="Default select example" id="entrepot" value={entrepot} onChange={(e)=> setEntrepot(e.target.value)} >
                                                                                <option value="" ></option>
                                                                                {entrepots.map( (entrepot,key) =>
                                                                                    
                                                                                    <option value={entrepot.id_entrepot}> {entrepot.nom_entrepot} </option>
                                                                                )}  
                                                                            </select>  
                                                                        </td>
                                                                        <td>
                                                                        <input
                                                                            onClick={() => {
                                                                                
                                                                                let checked = false;
                                                                                setBoxe(
                                                                                boxe.map((data,k) => {
                                                                                    if (key === k) {
                                                                                    data.select = checked;
                                                                                    }
                                                                                    return data;
                                                                                })
                                                                                );
                                                                                enregistrer(p.date)
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