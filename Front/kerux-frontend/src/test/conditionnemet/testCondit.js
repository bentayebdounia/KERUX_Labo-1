import React ,{useState,useEffect} from 'react'
import ConditService from '../../service/service.condit'
import Conditionnement from './conditionnement'
import ModelReponse from '../../Models/Model.repense'
import ModalSortieStock from '../Stock/Modal.sortieStock'
import moment from 'moment'

const TestCondit = () => {

    const [test, setTest] = useState(false)
    const [id , setId] = useState('')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [toggle,setToggle] = useState()
    const toggleShow = () => setToggle(true)
    const toggleDisplay = () => setToggle(false)
    
    /// afficher le component nettoyage.... 
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

    const [message,setMessage] = useState()
    
    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    var  table , table1,table2 
    

    const [toggle1, setToggle1] = useState ()  
    const toggleshow1 = () => setToggle1(true) 
    const toggleDisplay1 = () => setToggle1 (false)

    const [toggle2, setToggle2] = useState ()  
    const toggleshow2 = () => setToggle2(true) 
    const toggleDisplay2 = () => setToggle2 (false) 
 
    const [tableCoupage, setTableCoupage] = useState([])
    const [tableconditionnement, setTableconditionnement] = useState([]) 
    
     
     useEffect(()=>{ 
        ConditService.getCoupageTable() 
            .then((res)=>{ 
                setTableCoupage(res.data) 
            }) 

        ConditService.getConditionnementTable() 
        .then((res)=>{ 
            setTableconditionnement(res.data) 
        })

        ConditService.getActualProcesssStock()
        .then((res)=>{ 
            setTabledonneesstocker(res.data) 
        }) 
     }) 
 
    const getProcess = (e) => {
        e.preventDefault();
        
        ConditService.getProcesaById(id).then((res) => {
                console.log(res.data)
                console.log(res.data.fk_proditfourni) 
                setProcess(res.data)
                if (res.data === "ID n'existe pas"){
                    setMessage("ID n'existe pas pour cette etape ")
                    handleShow(true)
                    
                }
                else if(res.data==="box deja conditionner"){
                        setMessage("le box est deja conditionne")
                        handleShow(true)
                }
                        
                    else {
                        if(res.data.fk_stock ===null){
                            toggleShow()
                            
                        }
                        else {
                            handleShow2(true)
                        }
              
                    }
                console.log("produit fourni=  "+process.fk_proditfourni + "\n categorie= "+ process.categorie + "\n produit= " + process.nom_produit + "\n stock= " + process.stock, "\n etape= " + process.etape)
             
           }
          
        )
   
      }

    var conditionnemet , testCondit

    const chargerData = () => { 
        toggleshow1()
        toggleDisplay2()
         
                //setTabledonnees(res.data) 
                setButtoncolor(!buttonColor)
                setButtoncolor2(false)
                console.log("hello1"); 
                EnAttente.splice("") 
                enStock.splice("") 
                for ( var i=0 ; i<tableCoupage.length ; i++) { 
                    // console.log(i+"not null := "+tableDonnees[i].id_enregistrement );
                     var j=0
                     var a = false
                     console.log(tableconditionnement[j].id_coupage);
                     for (var j=0 ; j<tableconditionnement.length ; j++){
                         if ( tableconditionnement[j].id_coupage === tableCoupage[i].id_gnerate   )   {
                             
                             a = true
                             console.log(a);
                         }
                     }
                         
                         if (a ===false){
                              EnAttente.push(tableCoupage[i])
                              console.log( EnAttente);
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
            if(tableDonneesStocker[i].id_coupage === null  ) { 
                 if(tableDonneesStocker[i].fk_stock !== null)
                 if(tableDonneesStocker[i].date_sortie === null)
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
     
   
 if(buttonColor)
    {table=(
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
                                EnAttente.map( 
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
                                        <td>{moment.utc(p.datee).format('DD/MM/YYYY')}</td> 
                                        <td>{p.heure}</td> 
                                        
                                        
                                    
                                    </tr>    )} 
                                </tbody> 
                                </table> 
    
            </>

    

    )
}

if(buttonColor2)
    {table2=(
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
                            {  enStock.map( 
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
                                    <td>{moment.utc(p.datee).format('DD/MM/YYYY')}</td> 
                                    <td>{p.heure}</td> 
                                    <td>{p.nom_entrepot}</td>  
                                
                                </tr>  
                                  )} 
                                </tbody> 
                                </table> 
    
            </>
    )
}

    
      if(toggle){
        conditionnemet = (<Conditionnement id={id} process={process} test={test} toggleDisplay = {toggleDisplay}/>)
      }

      if(!toggle){
        testCondit = (
            <section id="etape_section">
            <div className="container">
                <div className="mb-3 row">
                <label htmlFor="id_etape"  className="col-sm-2 col-form-label label">ID Box</label>
                <div className="col-sm-10">
                    <div className="input-group col-sm-10">
                        <input type="text" className="form-control" placeholder=""  aria-describedby="button-addon2" value={id} onChange={(e)=> setId(e.target.value)}/>
                        <button className="btn btn-dark btn-outline-dark" type="button" id="button-addon2" onClick={(e) => getProcess(e)} >
                            <i className="bi bi-check-lg" style={{color: "white"}}></i>
                        </button>
                    </div>
                </div>
            </div>

            <div style={{width:"90%", height:"600px", marginLeft:"5%", marginRight:"15%" , marginTop:"30px", backgroundColor: "white" , borderRadius:"10px" }}>
                    <label 
                            style={{  padding: "5px", marginRight:"20px" , borderBottom: `${(buttonColor===true) ? '2px solid' : '0px solid'  }`,  borderBottomColor: `${(buttonColor===true) ? '#7B170F' : 'white'  }`}}
                            onClick={chargerData} >
                        <a class="nav-link "  style={{ color: `${(buttonColor===true) ? '#7B170F' : 'black'  }`}} href='#'>Produits en attente</a> 
                    </label>

                    <label 
                            style={{ color: `${(buttonColor2===true) ? '#7B170F' : 'black'  }` , padding: "5px" , borderBottom: `${(buttonColor2===true) ? '2px solid' : '0px solid'  }`,  borderBottomColor: `${(buttonColor2===true) ? '7B170F' : 'white'  }`}}
                            onClick={chargerDataEnStock}
                            >
                               <a class="nav-link " style={{ color: `${(buttonColor2===true) ? '#7B170F' : 'black'  }`}} href='#'> Produits en Stock</a></label>

                    <p style={{ borderBottom:  '1px solid' , borderBottomColor: "#BBBABA"}}/>

                
                
                    <div className="divTab" style={{width:"100%", height:"500px" , margin:"0px" , overflow : 'auto'}}> 
                    
                            {table}
                            {table2}
 
     
                </div> 

                </div>
    
            </div>
            <ModelReponse
                             show={show} 
                             handleClose={handleClose} 
                             handleShow={handleShow} 
                             message={message} 
                             titre={"conditionnement"} 
                             />
            <ModalSortieStock 
                                show2={show2} 
                                handleClose2={handleClose2} 
                                handleShow2={handleShow2} 
                                toggleshow={toggleShow}  
                                id={id} 
                                process={process} 
                                etape={'conditionnement'}
                                 />
        </section>
        )
      }
  
    return ( 
        <>
            {testCondit}
            {conditionnemet}
            
            
        </>
     );
}
 
export default TestCondit;