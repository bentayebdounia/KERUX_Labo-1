import React ,{useState,useEffect} from 'react'
import CoupageService from '../../service/service.coupage'
import Coupage from './coupage'
import ModelReponse from '../../Models/Model.repense'
import BoxCoupage from './boxCoupage'
import ModalSortieStock from '../Stock/Modal.sortieStock'
import moment from 'moment'

const TestCoupage = () => {

    
    
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

    const [buttonColor, setButtoncolor] = useState(false)
    const [buttonColor2, setButtoncolor2] = useState(false)
    


    useEffect(()=>{ 
        CoupageService.getNettoyageTable() 
            .then((res)=>{ 
                setTablenettoyage(res.data) 
            }) 

        CoupageService.getCoupageTable() 
        .then((res)=>{ 
            setTableCoupage(res.data) 
        })

         
     }) 

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
    const generateId = (fk_proditFourni) =>{
        var id = (fk_proditFourni+"id"+dateNow()+""+TimeNow())  
        //console.log("id_generate= "+id);
    return id
    }
    var id_generate
    const ajouterBoxCouper = (id_produit, id_enregistrement, id_nettoyage) => {
         id_generate = generateId(id_produit)
        setId_generateNet( id_generate )
        //console.log(id_generateNet)
        CoupageService.ajouterBoxCouper(id_produit, id_enregistrement, id_nettoyage, id_generate).then( (res) => {
            console.log(res.data)
        })
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

        CoupageService.getProcessById(boxes[0].id_box).then((res) => {
            //console.log(res.data)
           // console.log(res.data.fk_proditfourni) 
            setProcess(res.data)
            if (res.data === "ID n'existe pas"){
                setMessage("ID n'existe pas pour cette etape ")
                handleShow(true)
                
            }
            else if(res.data==="box deja couper"){
                    
                    setMessage("le produit est deja couper")
                    handleShow(true)
            }   
                else 
                    {
                        if(res.data.fk_stock!==null){
                                handleShow2(true)   // il faut ajouter un autre teste pour confirmer que l'agent il a bien fait la sortie de stock avant l'enregistrer au process de coupage
                
                                //ajouter le box couper et generer un identifiant
                              
                                ajouterBoxCouper(res.data.fk_proditfourni, res.data.id_enregistrement, boxes[0].id_box)
                                //console.log("nombre= "+res.data.nombre);
                                setPoids(poids+res.data.poids)
                                setNombre(nombre+res.data.nombre)
                                ajouterBox() 
                                
                        }

                        else{
                            //ajouter le box couper et generer un identifiant
                            ajouterBoxCouper(res.data.fk_proditfourni, res.data.id_enregistrement, boxes[0].id_box)
                          //  console.log("nombre= "+res.data.nombre);
                            setPoids(poids+res.data.poids)
                            setNombre(nombre+res.data.nombre)
                            ajouterBox()

                        }                     
                }
            })     
      }

      const confirmer = (e) => {
        console.log("length= "+boxes.length);
        if(boxes.length >1)
                {toggleshow()
                setBoxes([1])}
        else {
            setMessage("Ajouter des boxes")
            handleShow()
        }
      }


    
    //console.log(process)
    //console.log(id_generate);
    //console.log(boxes);



    const chargerData = () => { 
        toggleshow1()
        toggleDisplay2()
         
                //setTabledonnees(res.data) 
                setButtoncolor(!buttonColor)
                setButtoncolor2(false)
                console.log("hello1"); 
                EnAttente.splice("") 
                enStock.splice("") 
                for ( var i=0 ; i<tableNettoyage.length ; i++) { 
                    // console.log(i+"not null := "+tableDonnees[i].id_enregistrement );
                     
                     var a = false
                     console.log(tableNettoyage[i].fk_stock);
                     for (var j=0 ; j<tableCoupage.length ; j++){
                         if ( tableCoupage[j].id_nettoyage === tableNettoyage[i].id_gnerate )   {
                             
                             a = true
                             console.log(a);
                         }
                     }
                         
                         if (a ===false && tableNettoyage[i].fk_stock===null){
                              EnAttente.push(tableNettoyage[i])
                              console.log( "EnAttente");
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
                datee :p.datee,
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
        for ( var i=0 ; i<tableNettoyage.length ; i++) { 
            // console.log(i+"not null := "+tableDonnees[i].id_enregistrement );
             
             var a = false
             console.log(tableNettoyage[i].fk_stock);
             for (var j=0 ; j<tableCoupage.length ; j++){
                 if ( tableCoupage[j].id_nettoyage === tableNettoyage[i].id_gnerate )   {
                     
                     a = true
                     console.log(a);
                 }
             }
                 
                 
                      if (a ===false && tableNettoyage[i].fk_stock!==null){
                        enStock.push(tableNettoyage[i])
                        console.log( "EnStock");
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
             datee :p.datee,
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


    return ( 
        <>
            {!toggle &&
                 <section id="etape_section">
                 <div className="container">
                     
                     
                     <div className="col-sm-10" style={{width:"90%", marginLeft:"5%", marginRight:"15%"  }}>
                     {boxes.map((box,key) => {
                         return ( 
                             <div className="input-group col-sm-10" key={key}>
                                     <BoxCoupage id_box = {box.id_box} onIdChange={newId_box => {
                                         const newBoxes = [...boxes]
                                         newBoxes[key].id_box = newId_box
                                         setBoxes(newBoxes)
                                     }} />
                                 {key === 0 && <>
                                            <button className="btn" style={{background: '#7B170F' }} type="button" id="button-addon2"
                                                  onClick={(e) => plusId(e)} >
                                                 <i className="bi bi-plus-lg" style={{color: "white" , fontSize:"15px"}}></i>
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