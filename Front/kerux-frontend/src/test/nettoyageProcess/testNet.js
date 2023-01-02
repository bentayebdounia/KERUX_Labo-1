import React ,{useState,useEffect} from 'react' 
import serviceNettoyage from '../../service/service.nettoyage' 
import Nettoyage from './nettoyage' 
import ModelReponse from '../../Models/Model.repense' 
import ModalSortieStock from '../Stock/Modal.sortieStock'
import Pagination from '../pagination/pagination' 
import moment from 'moment'; 
const TestNet = () => { 
 
    const [test, setTest] = useState(false) 
    const [id , setId] = useState('') 
 
 
    const [show, setShow] = useState(false) 
    const handleClose = () => setShow(false) 
    const handleShow = () => setShow(true) 
 
    const [show2, setShow2] = useState(false) 
    const handleClose2 = () => setShow2(false) 
    const handleShow2 = () => setShow2(true) 
 
    /// afficher le component nettoyage.... 
    const [toggle, setToggle] = useState ()  
    const toggleshow = () => setToggle(true) 
    const toggleDisplay = () => setToggle (false) 

    const [tableEnregistrement, setTableEnregistrement] = useState([])
    const [tablenettoyage, setTablenettoyage] = useState([]) 
 
    const [tableDonnees, setTabledonnees] = useState([]) 
    const [tableDonneesStocker, setTabledonneesstocker] = useState([]) 
    const [EnAttente, setEnattente] = useState([]) 
    const [enStock, setEnstock] = useState ([]) 

    const [buttonColor, setButtoncolor] = useState(false)
    const [buttonColor2, setButtoncolor2] = useState(false)
    
 
     const [process, setProcess] = useState({ 
        fk_proditfourni: "", 
        categorie: "", 
        nom_produit: "", 
        stock: "", 
        etape: "" 
    }) 

    var nettoyage , testNet, table , table1,table2 
    

    const [toggle1, setToggle1] = useState ()  
    const toggleshow1 = () => setToggle1(true) 
    const toggleDisplay1 = () => setToggle1 (false)

    const [toggle2, setToggle2] = useState ()  
    const toggleshow2 = () => setToggle2(true) 
    const toggleDisplay2 = () => setToggle2 (false) 

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    
    const [message,setMessage] = useState() 
     

    //les operation de pagination 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = EnAttente.slice(indexOfFirstPost, indexOfLastPost);
    const currentPosts2 = enStock.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

     useEffect(()=>{ 
       /* serviceNettoyage.getActualProcess() 
            .then((res)=>{ 
                setTabledonnees(res.data) 
            }) */
        serviceNettoyage.getEnregistrementTable()
        .then((res)=>{ 
            setTableEnregistrement(res.data)
        })

        serviceNettoyage.getNettoyageTable()
        .then((res)=>{ 
            setTablenettoyage(res.data)
        })


        serviceNettoyage.getActualProcesssStock()
        .then((res)=>{ 
            setTabledonneesstocker(res.data) 
        }) 
     }) 
    
  
    const getProcess = (e) => { 
        e.preventDefault(); 
         
        serviceNettoyage.getProcesaById(id).then((res) => { 
                console.log(res.data) 
                console.log(res.data.fk_proditfourni)  
                setProcess(res.data) 
                if (res.data === "ID n'existe pas"){ 
                    setMessage("ID n'existe pas pour cette etape ") 
                    handleShow(true) 
                     
                } 
                else if(res.data==="box deja nettoyer"){ 
                        setMessage("le box est deja nettoyage") 
                        handleShow(true) 
                } 
                         
                    else if(res.data.fk_stock===null){ 
                        console.log(test); 
                        toggleshow() 
                     
                    } 
                    else {  
                        handleShow2() 
                         
                     } 
                console.log("produit fourni=  "+process.fk_proditfourni + "\n categorie= "+ process.categorie + "\n produit= " + process.nom_produit + "\n stock= " + process.fk_stock, "\n etape= " + process.etape) 
              
           } 
           
        ) 
    
      } 
 
       const chargerData = () => { 
        toggleshow1()
        toggleDisplay2()
         
                //setTabledonnees(res.data) 
                setButtoncolor(!buttonColor)
                setButtoncolor2(false)
                console.log("hello1"); 
                EnAttente.splice("") 
                enStock.splice("") 
               // console.log(tablenettoyage);
                for ( var i=0 ; i<tableEnregistrement.length ; i++) { 
                    // console.log(i+"not null := "+tableDonnees[i].id_enregistrement );
                    var j=0
                    var a = false
                    //console.log(tablenettoyage[j].id_enregistrement);
                    for (var j=0 ; j<tablenettoyage.length ; j++){
                        if ( tablenettoyage[j].id_enregistrement === tableEnregistrement[i].id_gnerate   )   {
                            
                            a = true
                            //console.log(a);
                        }
                    }
                        
                        if (a ===false && tableEnregistrement[i].fk_stock === null){
                                EnAttente.push(tableEnregistrement[i])
                                //console.log( EnAttente);
                                }
                 
                }
                setEnattente(
                    EnAttente.map(p => {
                        return {
                            select: false,
                            id_gnerate:p.id_gnerate,
                            categorie: p.categorie,
                            nom_produit:p.nom_produit,
                            poids:p.poids ,
                            nombre:p.nombre, 
                            datee :moment.utc(p.datee).format('DD/MM/YYYY'),
                            heure:p.heure,
                            etape:p.etape ,
                        
                        
                        };
                    })
    )
    } 
     
       const chargerDataEnStock = () => {
        toggleshow2()
        toggleDisplay1()

        setButtoncolor(false)
        setButtoncolor2(!buttonColor2)
        EnAttente.splice("") 
        enStock.splice("") 
        for ( var i=0 ; i<tableDonneesStocker.length ; i++) { 
            if(tableDonneesStocker[i].id_enregistrement === null && tableDonneesStocker[i].fk_stock !== null && tableDonneesStocker[i].date_sortie === null) { 
                 
                  
                     enStock.push(tableDonneesStocker[i]) 
              }
              
              
   
      
}
setEnstock(
    enStock.map(p => {
         return {
             select: false,
             id_gnerate:p.id_gnerate,
             categorie: p.categorie,
             nom_produit:p.nom_produit,
             poids:p.poids ,
             nombre:p.nombre, 
             datee :moment.utc(p.datee).format('DD/MM/YYYY'),
             heure:p.heure,
             etape:p.etape ,
             nom_entrepot :p.nom_entrepot ,
         
         };
     })
 )

       }
     
   
 table=(
        <>
        <table className="table table-bordered" style={{width:"90%" , margin:"3%" ,   }} > 
                            <thead style={{backgroundColor: "#16161"}}> 
                                <tr> 
                                <th scope="col"></th>
                                
                                <th scope="col">ID </th> 
                                <th scope="col">Categorie</th> 
                                <th scope="col">Nom produit</th> 
                                <th scope="col">Poids</th> 
                                <th scope="col">Nombre</th> 
                                <th scope="col">Date</th> 
                                <th scope="col">Heure</th> 
                                
 
 
                                 
                                 
                                </tr> 
                            </thead> 
                            <tbody >
                            { 
                                currentPosts.map( 
                                    (p, key) => 
                                    <tr key={key}> 
                                        <td>
                                        <input
                                            onChange={event => {
                                                let checked = event.target.checked;
                                                setEnattente(
                                                EnAttente.map(data => {
                                                    if (p.id_gnerate === data.id_gnerate) {
                                                        data.select = checked;
                                                        setId(p.id_gnerate)
                                                    }
                                                    else 
                                                        data.select=""
                                                        
                                                    
                                                    return data;
                                                })
                                                );
                                            }}
                                            type="checkbox"
                                            checked={p.select}
                                            ></input>
                                            </td> 
                                        
                                        <td>{p.id_gnerate}</td> 
                                        <td>{p.categorie}</td> 
                                        <td>{p.nom_produit}</td> 
                                        <td>{p.poids}</td> 
                                        <td>{p.nombre}</td> 
                                        <td>{p.datee}</td> 
                                        <td>{p.heure}</td> 
                                        
                                        
                                    
                                    </tr>    )} 
                                </tbody> 
                                </table> 
                                
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={EnAttente.length}
                                    paginate={paginate}
                                />
                                
                                
            </>

    

    )


table2=(
        <>
        <table className="table table-bordered" style={{width:"90%" , margin:"3%" ,   }} > 
                            <thead style={{backgroundColor: "#16161"}}> 
                                <tr> 
                                <th scope="col"></th>
                                <th scope="col">ID </th> 
                                <th scope="col">Categorie</th> 
                                <th scope="col">Nom produit</th> 
                                <th scope="col">Poids</th> 
                                <th scope="col">Nombre</th> 
                                <th scope="col">Date</th> 
                                <th scope="col">Heure</th> 
                                <th scope="col">entrepot</th> 
                             
                                </tr> 
                            </thead> 
                            <tbody >
                            {  currentPosts2.map( 
                                (p, key) => 
                                <tr key={key}> 
                                    <td>
                                    <input
                                        onChange={event => {
                                            let checked = event.target.checked;
                                            setEnstock(
                                                enStock.map(data => {
                                                if (p.id_gnerate === data.id_gnerate) {
                                                    data.select = checked;
                                                    setId(p.id_gnerate)
                                                }
                                                else  data.select=""
                                                    
                                                
                                                return data;
                                            })
                                            );
                                        }}
                                        type="checkbox"
                                        checked={p.select}
                                        ></input>
                                        </td> 
                                    
                                    <td>{p.id_gnerate}</td> 
                                    <td>{p.categorie}</td> 
                                    <td>{p.nom_produit}</td> 
                                    <td>{p.poids}</td> 
                                    <td>{p.nombre}</td> 
                                    <td>{p.datee}</td> 
                                    <td>{p.heure}</td> 
                                    <td>{p.nom_entrepot}</td>  
                                
                                </tr>  
                                  )} 
                                </tbody> 
                                </table> 

                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={enStock.length}
                                    paginate={paginate}
                                />
    
            </>
    )

    

    return (  
        <> 
            {!toggle && 
                <section id="etape_section"> 
                <div className="container"> 
                     
                        
                            <div className="input-group col-sm-10" style={{width:"90%", marginLeft:"5%", marginRight:"15%"  }}> 
                                <input type="text" className="form-control" placeholder="ID boxe"  aria-describedby="button-addon2" value={id} onChange={(e)=> setId(e.target.value)}/> 
                                <button className="btn" style={{background: '#7B170F'}} type="button" id="button-addon2" onClick={(e) => getProcess(e)} > 
                                    <i className="bi bi-check-lg" style={{color: "white" , fontSize:"20px"}}></i> 
                                </button> 
                            </div> 
                         
                     
                    <div style={{width:"90%", height:"600px", marginLeft:"5%", marginRight:"15%" , marginTop:"30px", backgroundColor: "white" , borderRadius:"10px" }}>
                        <label 
                                style={{  padding: "5px", marginRight:"20px" , borderBottom: `${(buttonColor===true) ? '2px solid' : '0px solid'  }`,  borderBottomColor: `${(buttonColor===true) ? '#7B170F' : 'white'  }`}}
                                onClick={chargerData} >
                            <a className="nav-link "  style={{ color: `${(buttonColor===true) ? '#7B170F' : 'black'  }`}} href='#'>Produits en attente</a> 
                        </label>
    
                        <label 
                                style={{ color: `${(buttonColor2===true) ? '#7B170F' : 'black'  }` , padding: "5px" , borderBottom: `${(buttonColor2===true) ? '2px solid' : '0px solid'  }`,  borderBottomColor: `${(buttonColor2===true) ? '7B170F' : 'white'  }`}}
                                onClick={chargerDataEnStock}
                                >
                                   <a className="nav-link " style={{ color: `${(buttonColor2===true) ? '#7B170F' : 'black'  }`}} href='#'> Produits en Stock</a></label>
    
                        <p style={{ borderBottom:  '1px solid' , borderBottomColor: "#BBBABA"}}/>
    
                    
                    
                        <div className="divTab" style={{width:"100%", height:"500px" , margin:"0px" , overflow : 'auto'}}> 
                        
                                {buttonColor && table}
                                {buttonColor2 && table2}
     
                                
                        </div> 
    
                    </div> 
                             
                        
                    
                </div>
                
     
                {show &&<ModelReponse show={show} handleClose={handleClose} handleShow={handleShow} 
                              message={message}  
                              titre={"nettoyage"}  
                              />} 
     
                {show2 && <ModalSortieStock  
                                    show2={show2}  
                                    handleClose2={handleClose2}  
                                    handleShow2={handleShow2}  
                                    id={id} process={process}  
                                    toggleshow={toggleshow}  
                                    etape={'nettoyage'} 
                                  />} 
            </section>
            
            
            } 
            {toggle && <Nettoyage id={id} process={process} test={test} toggleDisplay = {toggleDisplay}/>} 
             
             
        </> 
     ); 
} 
  
export default TestNet; 
 
/*  
<select className="form-select" aria-label="Default select example" id="roleAgent"  value={comboBox} onChange={(e)=> setComboBox(e.target.value)}> 
                                <option  selected></option> 
                                <option value="attente" >En attente</option> 
                                <option value="stock">En stock</option> 
                                 
                                 
                            </select> 
*/