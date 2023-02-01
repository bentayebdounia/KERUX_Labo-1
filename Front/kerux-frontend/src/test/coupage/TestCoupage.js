import React ,{useState,useEffect} from 'react'
import CoupageService from '../../service/service.coupage'
import Coupage from './coupage'
import ModelReponse from '../../Models/Model.repense'
import BoxCoupage from './boxCoupage'
import ModalSortieStock from '../Stock/Modal.sortieStock'
import Pagination from '../pagination/pagination'
import moment from 'moment'
import serviceAlert from '../../service/service.alert'
import serviceActuelProcess from '../../service/sevice.actuelProcess'
const TestCoupage = (props) => {

    
    
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

    const [toggleSortie, setToggleSortie] = useState (false) 
    const toggleSortieTrue = () => setToggleSortie(true)
    const toggleSortieFalse = () => setToggleSortie (false)

    var testplus = true
    var testNotExist = false
    
    const [message, setMessage] = useState('')
    const [process, setProcess] = useState({
        fk_proditfourni: "",
        categorie: "",
        nom_produit: "",
        stock: "",
        etape: ""
    })

    const [boxes,setBoxes] = useState([{
        id_box:'',
        date:new Date()
    }])

    const [id_generateNet, setId_generateNet] = useState('')
    const [poids, setPoids] = useState(0)
    const [nombre, setNombre] = useState(0)

    var  table , table1,table2 

    /// afficher le component nettoyage.... 
    const [tableDonnees, setTabledonnees] = useState([]) 
    const [tableDonneesStocker, setTabledonneesstocker] = useState([]) 
    const [EnAttente, setEnattente] = useState([]) 
    const [enStock, setEnstock] = useState ([]) 
    

    const [toggle1, setToggle1] = useState ()  
    const toggleshow1 = () => setToggle1(true) 
    const toggleDisplay1 = () => setToggle1 (false)

    const [toggle2, setToggle2] = useState ()  
    const toggleshow2 = () => setToggle2(true) 
    const toggleDisplay2 = () => setToggle2 (false) 
 
    const [tableCoupage, setTableCoupage] = useState([])
    const [tableNettoyage, setTablenettoyage] = useState([]) 

    const [buttonColor, setButtoncolor] = useState(true)
    const [buttonColor2, setButtoncolor2] = useState(false)
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const [produitBloquant, setProduitbloquant] = useState(false)
    const [produitBloquantStock, setProduitbloquantstock] = useState(false)
    //les operation de pagination 

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = tableDonnees.slice(indexOfFirstPost, indexOfLastPost);
    const currentPosts2 = tableDonneesStocker.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [boxCoupageTab, setBoxcoupagetab ] = useState([])


    useEffect(()=>{ 
        serviceActuelProcess.getActualProcessBlock('nettoyage') 
            .then((res)=>{ 
                console.log(res.data.length);
                if (res.data.length ===0){
                    console.log('actuel process non bloquant');
                    
                    serviceActuelProcess.getActualProcess('nettoyage')
                    .then((res) =>{
                        setTabledonnees(res.data) 
                        setProduitbloquant(false)
                    })
                }
                else {
                    setProduitbloquant(true)
                    setTabledonnees(res.data)
                } 
            }) 
        
            serviceActuelProcess.getActualProcesssStockBlock('nettoyage') 
            .then((res)=>{ 
                if (res.data.length===0){
                    setProduitbloquant(true)
                    serviceActuelProcess.getActualProcesssStock('nettoyage')
                    .then((res) =>{
                        console.log('actuel process stock non bloquant');
                        setProduitbloquantstock(false)
                        setTabledonneesstocker(res.data) 
                    })
                }
                else {
                    setProduitbloquantstock(false)
                    setTabledonneesstocker(res.data) 
                }
            })  

         
     },[]) 

     useEffect(()=>{
        setBoxcoupagetab (JSON.parse(localStorage.getItem('boxCoupage') || "[]"))
      },[])

    const dateNow = () => {
        var today = new Date 
        var datee = today.getFullYear()+''+(today.getMonth() + 1) + '' + today.getDate()
        console.log("dateeee "+datee );
        return datee
    }
    
    
    const TimeNow = () => {
        var today = new Date 
        var heure = today.getHours() 
        console.log("heure "+heure );
        return heure
    }
    const generateId = (fk_proditFourni, id_nettoyage) =>{
        var n= id_nettoyage.substring(0,id_nettoyage.length-7)
        var id = (fk_proditFourni+"id"+dateNow()+""+TimeNow()+"-"+n)  
        //console.log("id_generate= "+id);
    return id
    }
    var id_generate

    const ajouterBoxCouper = (id_produit, id_enregistrement, id_nettoyage, id_process) => {
         id_generate = generateId(id_produit ,id_nettoyage)
        setId_generateNet( id_generate )
        //console.log(id_generateNet)
        /*CoupageService.ajouterBoxCouper(id_produit, id_enregistrement, id_nettoyage, id_generate).then( (res) => {
            console.log(res.data)
        })*/
        alert(id_process)
        var tab = {
            id_produit: id_produit, 
            id_enregistrement: id_enregistrement, 
            id_nettoyage: id_nettoyage, 
            id_generate: id_generate,
            id_process: id_process


        }
        boxCoupageTab.push(tab)
        console.log(boxCoupageTab);
        console.log(boxes);
        //localStorage.setItem ('boxCoupage', JSON.stringify(boxCoupageTab))
        //setBoxcoupagetab()
    }
/*
    useEffect(()=>{
        console.log(toggleSortie);
        if (toggleSortie){
            ajouterBox()
        }
            
    },[toggleSortie])
*/
    function ajouterBox (){
        const newBoxes = [...boxes]
        newBoxes.push({
            id_box:'',
            date:new Date()
        })
        setBoxes(newBoxes.sort((a,b) => {
            if(a.date < b.date)
                return 1
            if(a.date > b.date)
                return -1
            return 0
    }))

    }

      const plusId = (e) => {
        e.preventDefault();
        console.log("box.id_box== "+boxes[0].id_box);

      
            
            if (produitBloquant === false && produitBloquantStock ===false) {
                serviceActuelProcess.getIdProcess("nettoyage" , boxes[0].id_box)
                .then((res) => {
                    if(res.data === "boxe n'existe pas"){
                        setMessage("Vérifier votre ID  ") 
                        handleShow(true) 
                    }
    
                    else if (res.data.fk_stock===null){ 
                        console.log(test); 
                        setProcess(res.data) 
                        if (boxCoupageTab.length === 0){
                            handleShow2(true)
                            ajouterBoxCouper(res.data.fk_proditfourni, res.data.id_enregistrement, boxes[0].id_box , res.data.id_process )
                            //console.log("nombre= "+res.data.nombre);
                            setPoids(poids+res.data.poids)
                            setNombre(nombre+res.data.nombre)
                            ajouterBox() 
                            
                            
                        }
                        else {
                            console.log(boxCoupageTab);
                            var found = boxCoupageTab.find(({id_nettoyage}) => id_nettoyage === boxes[0].id_box);
                            console.log( found  );
                            if (found === undefined) {
                                handleShow2(true)
                                ajouterBoxCouper(res.data.fk_proditfourni, res.data.id_enregistrement, boxes[0].id_box, res.data.id_process)
                                //console.log("nombre= "+res.data.nombre);
                                setPoids(poids+res.data.poids)
                                setNombre(nombre+res.data.nombre)
                                ajouterBox() 
                                
                            }
                            else{
                                setMessage("Vous avez déjà selectionné ce produit")
                                handleShow(true)
                            }
                        }
                       // props.nettoypBtnV()
                     
                    } 
                        else {  
                            setProcess(res.data) 
                            handleShow2() 
                           } 
                })
            }
            else {
                serviceActuelProcess.getIdBloquant("nettoyage" , boxes[0].id_box)
                .then((res) => {
                    if(res.data === "boxe n'existe pas"){
                        setMessage("Vérifier votre ID ") 
                        handleShow(true) 
                    }
    
                    else if (res.data.fk_stock===null){ 
                        //console.log(test); 
                        setProcess(res.data) 
                        if (boxCoupageTab.length === 0){
                            //ajouter le box couper et generer un identifiant
                            ajouterBoxCouper(res.data.fk_proditfourni, res.data.id_enregistrement, boxes[0].id_box, res.data.id_process)
                            //  console.log("nombre= "+res.data.nombre);
                            setPoids(poids+res.data.poids)
                            setNombre(nombre+res.data.nombre)
                            ajouterBox() 
                        }

                        else {
                            console.log(boxes);
                            var found = boxCoupageTab.find(({id_nettoyage}) => id_nettoyage === boxes[0].id_box);
                            console.log( found  );
                            if (found === undefined) {
                                //ajouter le box couper et generer un identifiant
                                ajouterBoxCouper(res.data.fk_proditfourni, res.data.id_enregistrement, boxes[0].id_box, res.data.id_process)
                                //  console.log("nombre= "+res.data.nombre);
                                setPoids(poids+res.data.poids)
                                setNombre(nombre+res.data.nombre)
                                ajouterBox()
                           
                            }
                            else  {
                                setMessage("Vous avez déjà selectionné ce produit")
                                handleShow(true)
                            }}
                       // props.nettoypBtnV()
                     
                    } 
                        else { 
                            setProcess(res.data)  
                            handleShow2() 
                           } 
                })
    
            }

      }

      const confirmer = (e) => {
        console.log("length= "+boxes.length);
        if(boxes.length >1)
                {
                    for (var i =0 ; i< boxCoupageTab.length ; i++) {
                        CoupageService.ajouterBoxCouper(boxCoupageTab[i].id_produit, boxCoupageTab[i].id_enregistrement, boxCoupageTab[i].id_nettoyage, boxCoupageTab[i].id_generate)
                        .then( (res) => {
                            console.log(res.data)
                           
                    })
                    serviceAlert.updateAlert(boxCoupageTab[i].id_process).then ((result) =>{
                        alert (result.data)
                    })
                }
                    toggleshow()
                    setBoxes([1])
                    props.coupBtnV()
                    localStorage.removeItem('boxCoupage')
                }
        else {
            setMessage("Ajouter des boxes")
            handleShow()
        }
      }


    
    //console.log(process)
    //console.log(id_generate);
    //console.log(boxes);

    const dateModif = (date1) => {
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
        //console.log("hello1"); 
               
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
                                <th scope="col">Poids</th> 
                                <th scope="col">Nombre</th> 
                                <th scope="col">Date</th> 
                                <th scope="col">Heure</th> 
                                
 
 
                                 
                                 
                                </tr> 
                            </thead> 
                            <tbody >
                            { ((produitBloquant===false && produitBloquantStock===false) || produitBloquant===true )
                              &&  currentPosts.map( 
                                    (p, key) => 
                                    <tr key={key} style={{background:`${(dateModif(p.date_alert) <= dateToday()) ? '#E8C4C4' : 'white'  }`}}> 
                                        <td>
                                        <input
                                            onChange={event => {
                                                let checked = event.target.checked;
                                                setEnattente(
                                                    tableDonnees.map(data => {
                                                    if (p.id_gnerate === data.id_gnerate) {
                                                        data.select = checked;
                                                        boxes[0].id_box=p.id_gnerate
                                                         
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
                                        <td>{dateModif (p.datee)}</td> 
                                        <td>{p.heure}</td> 
                                        
                                        
                                    
                                    </tr>    )} 
                                </tbody> 
                                </table> 

                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={tableDonnees.length}
                                    paginate={paginate}
                                />
    
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
                            { ((produitBloquant===false && produitBloquantStock===false) || produitBloquantStock===true )
                              && currentPosts2.map( 
                                (p, key) => 
                                <tr key={key} style={{background:`${(dateNow(p.date_alert) <= dateToday()) ? '#E8C4C4' : 'white'  }`}}> 
                                    <td>
                                    <input
                                        onChange={event => {
                                            let checked = event.target.checked;
                                            setEnstock(
                                                tableDonneesStocker.map(data => {
                                                if (p.id_gnerate === data.id_gnerate) {
                                                    data.select = checked;
                                                    boxes[0].id_box=p.id_gnerate
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
                                    <td>{dateModif (p.datee)}</td> 
                                    <td>{p.heure}</td> 
                                    <td>{p.nom_entrepot}</td>  
                                
                                </tr>  
                                  )} 
                                </tbody> 
                                </table> 
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={tableDonneesStocker.length}
                                    paginate={paginate}
                                />
    
            </>
    )
}

const supprimerBox = (key) => {
    boxes.splice(key,1)
    boxCoupageTab.splice(key,1)

}

    return ( 
        <>
            {!toggle &&
                 <section id="etape_section">
                 <div className="container">
                     
                     
                     <div className="col-sm-10" style={{width:"90%", marginLeft:"5%", marginRight:"15%"  }}>
                     {boxes.map((box,key) => {
                         return ( 
                             <div className="input-group col-sm-10" key={key}>
                                     <BoxCoupage id_box = {box.id_box} k={key} supprimerBox={supprimerBox} onIdChange={newId_box => {
                                         const newBoxes = [...boxes]
                                         newBoxes[key].id_box = newId_box
                                         
                                         setBoxes(newBoxes)
                                     }} />
                                 {key === 0 && <>
                                            <button className="btn" style={{background: '#7B170F' }} type="button" id="button-addon2"
                                                  onClick={(e) => plusId(e)} >
                                                 <i className="bi bi-plus-lg" style={{color: "white" , fontSize:"20px"}}></i>
                                            </button>
                                           <button className="btn" style={{background: '#4F8B2A',marginLeft:'2px' ,color: "white" }} type="button" id="button-addon2" onClick={(e)=> confirmer(e)}>
                                                   <i className="bi bi-check-lg" > </i> Confirmer
                                            </button> 
                                            </> }
                                     
                         </div>
                             
                         ) })} 
                                                   
                         
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
                         
                                 {table}
                                 {table2}
      
          
                     </div> 
     
                     </div>
         
                 </div>
                 {show && <ModelReponse 
                                 show={show} 
                                 handleClose={handleClose} 
                                 handleShow={handleShow} 
                                 titre={'coupage'} 
                                 message={message}
                                 />}
     
                 {show2 && <ModalSortieStock 
                                     show2={show2} 
                                     handleClose2={handleClose2} 
                                     handleShow2={handleShow2} 
                                     id={process.id_gnerate} 
                                     process={process}
                                     etape={'coupage'}
                                     toggleSortieTrue = {toggleSortieTrue}  
                                     BtnV = {props.coupBtnV}
                                     />}
             </section>
            }
            {toggle && <Coupage 
                            id={id_generateNet} 
                            poids={poids} 
                            nombre={nombre}
                            process={process}  
                            toggleDisplay = {toggleDisplay}

                             />}
            
            
        </>
     )
    
}
export default TestCoupage;