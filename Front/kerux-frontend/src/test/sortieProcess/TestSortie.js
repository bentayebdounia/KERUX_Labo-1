import React ,{useState,useEffect} from 'react'
import serviceProcess from '../../service/service.sorti'
import Sortie from './sortie'
import ModelReponse from '../../Models/Model.repense'
import Pagination from '../pagination/pagination'
import moment from 'moment'
import ModalSortieStock from '../Stock/Modal.sortieStock'
import serviceActuelProcess from '../../service/sevice.actuelProcess'
const TestSortie = (props) => {

    const [test, setTest] = useState(false)
    const [id , setId] = useState('')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [show2, setShow2] = useState(false) 
    const handleClose2 = () => setShow2(false) 
    const handleShow2 = () => setShow2(true)

    const [toggle, setToggle] = useState () 
    const toggleshow = () => setToggle(true)
    const toggleDisplay = () => setToggle (false)
    /// afficher le component nettoyage.... 
    const [tableDonnees, setTabledonnees] = useState([]) 
    const [tableDonneesStocker, setTabledonneesstocker] = useState([]) 
    const [EnAttente, setEnattente] = useState([]) 
    const [enStock, setEnstock] = useState ([]) 

    const [buttonColor, setButtoncolor] = useState(true)
    const [buttonColor2, setButtoncolor2] = useState(false)
    const [produitBloquant, setProduitbloquant] = useState(false)
    const [produitBloquantStock, setProduitbloquantstock] = useState(false)
    
     const [process, setProcess] = useState({
        id_process: "",
        fk_proditfourni: "",
        categorie: "",
        nom_produit: "",
        stock: "",
        etape: "",
        id_enregistrement: "",
        id_nettoyage: "",
        id_coupage: ""

    })

    const [message,setMessage] = useState()
    
    var  table , table1,table2 
    

    const [toggle1, setToggle1] = useState ()  
    const toggleshow1 = () => setToggle1(true) 
    const toggleDisplay1 = () => setToggle1 (false)

    const [toggle2, setToggle2] = useState ()  
    const toggleshow2 = () => setToggle2(true) 
    const toggleDisplay2 = () => setToggle2 (false) 
 

    const [tableconditionnement, setTableconditionnement] = useState([])
    const [tableSotie, setTableSortie] = useState([])
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    //les operation de pagination 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = tableDonnees.slice(indexOfFirstPost, indexOfLastPost);
    const currentPosts2 = tableDonneesStocker.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
     
     useEffect(()=>{ 
        serviceActuelProcess.getActualProcessBlock('conditionnement') 
            .then((res)=>{ 
                console.log(res.data.length);
                if (res.data.length ===0){
                    console.log('actuel process non bloquant');
                    
                    serviceActuelProcess.getActualProcess('conditionnement')
                    .then((res) =>{
                        setTabledonnees(res.data) 
                        setProduitbloquant(false)
                    })
                }
                else {
                    setTabledonnees(res.data) 
                    setProduitbloquant(true)}
            }) 
        
            serviceActuelProcess.getActualProcesssStockBlock('conditionnement') 
            .then((res)=>{ 
                if (res.data.length===0){
                    
                    serviceActuelProcess.getActualProcesssStock('conditionnement')
                    .then((res) =>{
                        console.log('actuel process stock non bloquant');
                        setTabledonneesstocker(res.data) 
                        setProduitbloquantstock(false) 
                    })
                }
                else {
                    setTabledonneesstocker(res.data)
                    setProduitbloquantstock(true)
                } 
            })  
     },[]) 


    const getProcess = (e) => {
        e.preventDefault();
        if (produitBloquant === false && produitBloquantStock ===false) {
            serviceActuelProcess.getIdProcess("conditionnement" , id)
            .then((res) => {
                if(res.data === "boxe n'existe pas"){
                    setMessage("Vérifier votre ID") 
                    handleShow(true) 
                }

                else if (res.data.fk_stock===null){ 
                    console.log(test); 
                    toggleshow() 
                    setProcess(res.data) 
                    props.sortieBtnV()
                 
                } 
                    else {  
                        setProcess(res.data) 
                        handleShow2() 
                       } 
            })
        }
        else {
            serviceActuelProcess.getIdBloquant("conditionnement" , id)
            .then((res) => {
                if(res.data === "boxe n'existe pas"){
                    setMessage("Vérifier votre ID") 
                    handleShow(true) 
                }

                else if (res.data.fk_stock===null){ 
                    console.log(test); 
                    toggleshow() 
                    setProcess(res.data) 
                    props.sortieBtnV()
                 
                } 
                    else { 
                        setProcess(res.data)  
                        handleShow2() 
                       } 
            })

        }
     
      }

      const dateNow = (date1) => {
        var date=  moment.utc(date1).format('DD-MM-YYYY')
        const words = date.split('-');
        //var a = parseInt(words[0])+'-'+(words[1])+'-'+(words[2])

        var d = new Date(words[2], words[1]-1 ,words[0]);
        var nextDay = new Date(d.getTime());
        nextDay.setDate(d.getDate() + 1);
        console.log(nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

        return nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    const verifyMounth = (month) => {
        if (month<9){
            return 0+""+(month+1)
        }
        else if(month >= 9 && month < 12 ) 
        return month+1
             else  return month+1
    }

    const verifyDay = (day) => {
        if (day<10){
            return 0+""+day
        }
        else  return day
             
    }

    const dateToday = () => {
        var today = new Date
        var datee = verifyDay( today.getDate())+'/'+(verifyMounth(today.getMonth() ))  + '/' +today.getFullYear()
        //console.log(verifyMounth(today.getMonth() ));
        return datee
    }

      const chargerData = () => { 
        toggleshow1()
        toggleDisplay2()
         
        //setTabledonnees(res.data) 
        setButtoncolor(!buttonColor)
        setButtoncolor2(false)
                
    
    } 
     
       const chargerDataEnStock = () => {
        toggleshow2()
        toggleDisplay1()

        setButtoncolor(false)
        setButtoncolor2(!buttonColor2)
        

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
                                <th scope="col">Poids(Kg) </th> 
                                <th scope="col">Nombre</th> 
                                <th scope="col">Date</th> 
                                <th scope="col">Heure</th> 
                                
 
 
                                 
                                 
                                </tr> 
                            </thead> 
                            <tbody >
                            { ((produitBloquant===false && produitBloquantStock===false) || produitBloquant===true )
                              && currentPosts.map( 
                                    (p, key) => 
                                    <tr key={key} style={{background:`${(dateNow(p.date_alert) <= dateToday()) ? '#E8C4C4' : 'white'  }`}}> 
                                        <td>
                                        <input
                                            onChange={event => {
                                                let checked = event.target.checked;
                                                setEnattente(
                                                    currentPosts.map(data => {
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
                                        <td>{p.poids/1000}</td> 
                                        <td>{p.nombre}</td> 
                                        <td>{dateNow (p.datee)}</td> 
                                        <td>{p.heure}</td> 
                                        
                                        
                                    
                                    </tr>    )} 
                                </tbody> 
                                </table> 
                                {currentPosts.length !==0 && <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={tableDonnees.length}
                                    paginate={paginate}
                                />}
    
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
                                <th scope="col">Poids(Kg) </th> 
                                <th scope="col">Nombre</th> 
                                <th scope="col">Date</th> 
                                <th scope="col">Heure</th> 
                                <th scope="col">entrepot</th> 
 
 
                                 
                                 
                                </tr> 
                            </thead> 
                            <tbody >
                            { ((produitBloquant===false && produitBloquantStock===false) || produitBloquantStock===true )
                              && currentPosts2.map( 
                                (p, key) => 
                                <tr key={key} style={{background:`${(dateNow(p.date_alert) <= dateToday()) ? '#E8C4C4' : 'white'  }`}}> 
                                    <td>
                                    <input
                                        onChange={event => {
                                            let checked = event.target.checked;
                                            setEnstock(
                                                currentPosts2.map(data => {
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
                                    <td>{p.poids/1000}</td> 
                                    <td>{p.nombre}</td> 
                                    <td>{dateNow (p.datee)}</td> 
                                    <td>{p.heure}</td> 
                                    <td>{p.nom_entrepot}</td>  
                                
                                </tr>  
                                  )} 
                                </tbody> 
                                </table> 
                                {currentPosts2.length !==0 && <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={tableDonneesStocker.length}
                                    paginate={paginate}
                                />}
    
            </>
    )
}
      
    var sortie , testSortie

      if(toggle){
        sortie = (
                    <Sortie     id={id} process={process} 
                                test={test} 
                                toggleDisplay={toggleDisplay} 
                                sortieBtn={props.sortieBtn}
                                />)
      }

      else{
        testSortie = (
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
            {show && <ModelReponse 
                            show={show} 
                            handleClose={handleClose} 
                            handleShow={handleShow}  
                            titre={"sortie"} 
                            message={message} 
                            />}
            {show2 && <ModalSortieStock 
                                    show2={show2}  
                                    handleClose2={handleClose2}  
                                    handleShow2={handleShow2}  
                                    id={id} process={process}  
                                    toggleshow={toggleshow}  
                                    etape={'sortie'} 
                                    BtnV={props.sortieBtnV}
                                  />}
        </section>
        )
      }
  
    return ( 
        <>
            {testSortie}
            {sortie }
            
            
        </>
     );
}
 
export default TestSortie;