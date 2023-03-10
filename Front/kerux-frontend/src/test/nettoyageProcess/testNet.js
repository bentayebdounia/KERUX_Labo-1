import React ,{useState,useEffect} from 'react' 
import serviceNettoyage from '../../service/service.nettoyage' 
import serviceActuelProcess from '../../service/sevice.actuelProcess'
import Nettoyage from './nettoyage' 
import ModelReponse from '../../Models/Model.repense' 
import ModalSortieStock from '../Stock/Modal.sortieStock'
import Pagination from '../pagination/pagination' 
import moment from 'moment'; 
const TestNet = (props) => { 
 
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

    const [buttonColor, setButtoncolor] = useState(true)
    const [buttonColor2, setButtoncolor2] = useState(false)
    
 
     const [process, setProcess] = useState({ 
        fk_proditfourni: "", 
        categorie: "", 
        nom_produit: "", 
        stock: "", 
       etape: "",
        poids:""
    }) 

    var  table ,table2 

    const [toggle1, setToggle1] = useState ()  
    const toggleshow1 = () => setToggle1(true) 
    const toggleDisplay1 = () => setToggle1 (false)

    const [toggle2, setToggle2] = useState ()  
    const toggleshow2 = () => setToggle2(true) 
    const toggleDisplay2 = () => setToggle2 (false) 

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    
    const [message,setMessage] = useState() 
    const [produitBloquant, setProduitbloquant] = useState(false)
    const [produitBloquantStock, setProduitbloquantstock] = useState(false)

    //les operation de pagination 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = tableDonnees.slice(indexOfFirstPost, indexOfLastPost);
    const currentPosts2 = tableDonneesStocker.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(  ()=>{ 
        getData()
    },[]) 

     useEffect(  ()=>{ 
         window.setInterval(() =>{
            getData()
        },7000)
    
     },[]) 
    
     const getData = () => {
        serviceActuelProcess.getActualProcessBlock('enregistrement') 
            .then( (res)=>{ 
               // console.log(res.data.length);
                if (res.data.length ===0){
                    //console.log('actuel process non bloquant');
                    
                     serviceActuelProcess.getActualProcess('enregistrement')
                    .then((res) =>{
                        setTabledonnees(res.data) 
                        setProduitbloquant(false)
                    })
                }
                else {
                    setTabledonnees(res.data) 
                    setProduitbloquant(true)}
            }) 
        
             serviceActuelProcess.getActualProcesssStockBlock('enregistrement') 
            .then(  (res)=>{ 
                if (res.data.length===0){
                    
                     serviceActuelProcess.getActualProcesssStock('enregistrement')
                    .then((res) =>{
                       // console.log('actuel process stock non bloquant');
                        setTabledonneesstocker(res.data)
                        setProduitbloquantstock(false) 
                    })
                }
                else {
                    setTabledonneesstocker(res.data)
                    setProduitbloquantstock(true)
                } 
            }) 
     }
  
    const getProcess = (e) => { 
        e.preventDefault(); 
         
      /*  serviceNettoyage.getProcesaById(id).then((res) => { 
               // console.log(res.data) 
               // console.log(res.data.fk_proditfourni)  
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
                        props.nettoypBtnV()
                     
                    } 
                    else {  
                        handleShow2() 
                        
                         
                     } 
                console.log("produit fourni=  "+process.fk_proditfourni + "\n categorie= "+ process.categorie + "\n produit= " + process.nom_produit + "\n stock= " + process.fk_stock, "\n etape= " + process.etape) 
              
           } 
           
        ) */

        if (produitBloquant === false && produitBloquantStock ===false) {
            serviceActuelProcess.getIdProcess("enregistrement" , id)
            .then((res) => {
                if(res.data === "boxe n'existe pas"){
                    setMessage("V??rifier votre ID  ") 
                    handleShow(true) 
                }

                else if (res.data.fk_stock===null){ 
                  //  console.log(test); 
                    setProcess(res.data) 
                    toggleshow() 
                    props.nettoypBtnV()
                 
                } 
                    else {  
                        setProcess(res.data) 
                        handleShow2() 
                       } 
            })
        }
        else {
            serviceActuelProcess.getIdBloquant("enregistrement" , id)
            .then((res) => {
                if(res.data === "boxe n'existe pas"){
                    setMessage("V??rifier votre ") 
                    handleShow(true) 
                }

                else if (res.data.fk_stock===null){ 
                   // console.log(test); 
                    setProcess(res.data) 
                    toggleshow() 
                    props.nettoypBtnV()
                 
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
       // console.log(nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

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
     
  
 table = (
   <>
     <table
       className="table table-bordered"
       style={{ width: "90%", margin: "3%" }}
     >
       <thead style={{ backgroundColor: "#16161" }}>
         <tr>
           <th scope="col"></th>

           <th scope="col">ID box</th>
           <th scope="col">Categorie</th>
           <th scope="col">Nom produit</th>
           <th scope="col">Poids(Kg) </th>
           <th scope="col">Quantit??</th>
           <th scope="col">Date</th>
           <th scope="col">Heure</th>
         </tr>
       </thead>
       <tbody>
         {((produitBloquant === false && produitBloquantStock === false) ||
           produitBloquant === true) &&
           currentPosts.map((p, key) => (
             <tr
               key={key}
               style={{
                 background: `${
                   dateNow(p.date_alert) === dateToday() ? "#E8C4C4" : "white"
                 }`,
               }}
             >
               <td>
                 <input
                   onChange={(event) => {
                     let checked = event.target.checked;
                     setEnattente(
                       currentPosts.map((data) => {
                         if (p.id_gnerate === data.id_gnerate) {
                           data.select = checked;
                           setId(p.id_gnerate);
                         } else data.select = "";

                         return data;
                       })
                     );
                   }}
                   type="checkbox"
                   checked={p.select}
                 ></input>
               </td>

               <td>{p.id_gnerate} </td>
               <td>{p.categorie}</td>
               <td>{p.nom_produit}</td>
               <td>{p.poids / 1000}</td>
               <td>{p.nombre !== null && p.nombre !== 0 && p.nombre}</td>
               <td>{dateNow(p.datee)}</td>
               <td>{p.heure}</td>
             </tr>
           ))}
       </tbody>
     </table>

     {currentPosts.length !== 0 && (
       <Pagination
         postsPerPage={postsPerPage}
         totalPosts={tableDonnees.length}
         paginate={paginate}
       />
     )}
   </>
 );


table2 = (
  <>
    <table
      className="table table-bordered"
      style={{ width: "90%", margin: "3%" }}
    >
      <thead style={{ backgroundColor: "#16161" }}>
        <tr>
          <th scope="col"></th>
          <th scope="col">ID </th>
          <th scope="col">Categorie</th>
          <th scope="col">Nom produit</th>
          <th scope="col">Poids(Kg) </th>
          <th scope="col">Quantit??</th>
          <th scope="col">Date</th>
          <th scope="col">Heure</th>
          <th scope="col">entrepot</th>
        </tr>
      </thead>
      <tbody>
        {((produitBloquant === false && produitBloquantStock === false) ||
          produitBloquantStock === true) &&
          currentPosts2.map((p, key) => (
            <tr
              key={key}
              style={{
                background: `${
                  dateNow(p.date_alert) === dateToday() ? "#E8C4C4" : "white"
                }`,
              }}
            >
              <td>
                <input
                  onChange={(event) => {
                    let checked = event.target.checked;
                    setEnstock(
                      currentPosts2.map((data) => {
                        if (p.id_gnerate === data.id_gnerate) {
                          data.select = checked;
                          setId(p.id_gnerate);
                        } else data.select = "";

                        return data;
                      })
                    );
                  }}
                  type="checkbox"
                  checked={p.select}
                ></input>
              </td>

              <td>{p.id_gnerate} </td>
              <td>{p.categorie}</td>
              <td>{p.nom_produit}</td>
              <td>{p.poids / 1000}</td>
              <td>{p.nombre !== null && p.nombre !== 0 && p.nombre}</td>
              <td>{dateNow(p.datee)}</td>
              <td>{p.heure}</td>
              <td>{p.nom_entrepot}</td>
            </tr>
          ))}
      </tbody>
    </table>

    {currentPosts2.length !== 0 && (
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={tableDonneesStocker.length}
        paginate={paginate}
      />
    )}
  </>
);

    

    return (
      <>
        {!toggle && (
          <section id="etape_section">
            <div className="container">
              <div
                className="input-group col-sm-10"
                style={{ width: "90%", marginLeft: "5%", marginRight: "15%" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID boxe"
                  aria-describedby="button-addon2"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <button
                  className="btn"
                  style={{ background: "#7B170F" }}
                  type="button"
                  id="button-addon2"
                  onClick={(e) => getProcess(e)}
                >
                  <i
                    className="bi bi-check-lg"
                    style={{ color: "white", fontSize: "20px" }}
                  ></i>
                </button>
              </div>

              <div
                style={{
                  width: "90%",
                  height: "600px",
                  marginLeft: "5%",
                  marginRight: "15%",
                  marginTop: "30px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                <label
                  style={{
                    padding: "5px",
                    marginRight: "20px",
                    borderBottom: `${
                      buttonColor === true ? "2px solid" : "0px solid"
                    }`,
                    borderBottomColor: `${
                      buttonColor === true ? "#7B170F" : "white"
                    }`,
                  }}
                  onClick={chargerData}
                >
                  <a
                    className="nav-link "
                    style={{
                      color: `${buttonColor === true ? "#7B170F" : "black"}`,
                    }}
                    href="#"
                  >
                    Produits en attente
                  </a>
                </label>

                <label
                  style={{
                    color: `${buttonColor2 === true ? "#7B170F" : "black"}`,
                    padding: "5px",
                    borderBottom: `${
                      buttonColor2 === true ? "2px solid" : "0px solid"
                    }`,
                    borderBottomColor: `${
                      buttonColor2 === true ? "7B170F" : "white"
                    }`,
                  }}
                  onClick={chargerDataEnStock}
                >
                  <a
                    className="nav-link "
                    style={{
                      color: `${buttonColor2 === true ? "#7B170F" : "black"}`,
                    }}
                    href="#"
                  >
                    {" "}
                    Produits en Stock
                  </a>{" "}
                </label>
                {tableDonneesStocker.length !== 0 && (
                  <span
                    className="position-absolute top-5 start-5 translate-middle p-2 badge rounded-pill bg-danger text-light"
                    style={{ fontSize: "11px", fontStyle: "normal" }}
                  >
                    {tableDonneesStocker.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}

                <p
                  style={{
                    borderBottom: "1px solid",
                    borderBottomColor: "#BBBABA",
                  }}
                />

                <div
                  className="divTab"
                  style={{
                    width: "100%",
                    height: "500px",
                    margin: "0px",
                    overflow: "auto",
                  }}
                >
                  {buttonColor && table}
                  {buttonColor2 && table2}
                </div>
              </div>
            </div>

            {show && (
              <ModelReponse
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                message={message}
                titre={"nettoyage"}
              />
            )}

            {show2 && (
              <ModalSortieStock
                show2={show2}
                handleClose2={handleClose2}
                handleShow2={handleShow2}
                id={id}
                process={process}
                toggleshow={toggleshow}
                etape={"nettoyage"}
                BtnV={props.nettoypBtnV}
              />
            )}
          </section>
        )}
        {toggle && (
          <Nettoyage
            id={id}
            process={process}
            test={test}
            toggleDisplay={toggleDisplay}
            nettoypBtn={props.nettoypBtn}
          />
        )}
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