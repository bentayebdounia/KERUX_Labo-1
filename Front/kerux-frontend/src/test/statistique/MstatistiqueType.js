import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import CategorieStatistique from './statistiqueCategorie'
import seviceStatistique from '../../service/sevice.statistique'


const StatistiqueTypeProduit = (props) => {

     const [categorie, setCategorie] = useState('poulet')

     //legume tables
     const [frite, setFrite] = useState([])
     const [tomate, setTomate] = useState([])
     const [laitue, setLaitue] = useState([])
     const [oignon, setOignon] = useState([])
     const [choux, setChoux] = useState([])
     const [caroute, setCaroute] = useState([])

     //poulet tables

     const [poulet, setPoulet] = useState([])
     const [tendres, setTendres] = useState([])
     const [wings, setWings] = useState([])
     const [legs, setLegs] = useState([])
     const [dips, setDips] = useState([])
     const [hotdogs, setHotdogs] = useState([])


     
  useEffect(()=>{
    setFrite(calassificate('frite'))
    setTomate(calassificate('tomate'))
    setLaitue(calassificate('laitue'))
    setOignon(calassificate('oignon'))
    setChoux(calassificate('choux'))
    setCaroute(calassificate('carotte'))

  },[])

  useEffect(()=>{
    setPoulet(calassificate('poulet'))
    setTendres(calassificate('tendres'))
    setWings(calassificate('wings'))
    setLegs(calassificate('legs'))
    setDips(calassificate('dips'))
    setHotdogs(calassificate('hotDogs'))

  },[])


    function calassificate (categorie) {
      var categorie_prod = []
       for (var i=1 ; i< 13 ; i++ ){
         if (i<12){
             seviceStatistique.getTypeproduitFourni(categorie,'2023-'+i+'-1', '2023-'+(i+1)+'-1')
             .then((res) => {
                 //console.log(res.data[0]);
                 categorie_prod.push(parseFloat (res.data[0].count))
             })
             }
             
         else if (i===12){
           seviceStatistique.getTypeproduitFourni(categorie,'2023-'+i+'-1','2024-' +1+'-1')
               .then((res) => {
                   //console.log(res.data[0]);
                   categorie_prod.push(parseFloat (res.data[0].count))
               })
               }

               }
               return categorie_prod
    } 

    

     

    
    return(
        <Modal   fullscreen={true} scrollable={true} show={props.show} onHide={()=> {props.handleClose() }}>
            <Modal.Header closeButton>
            <Modal.Title style={{color: "#7B170F" }}><i className="bi bi-graph-up" style={{color: "#7B170F" , fontSize:"25px"}} ></i> Satatistique de produits fournis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mb-3">
              <div className="col-sm-2">
                <label>Categorie de produit</label>
                      <select className="form-select" aria-label="Default select example" placeholder='categorie' id="typeBon" value={categorie} onChange={(e)=> setCategorie(e.target.value)}  required>
                        <option value={"poulet"}>poulet</option>
                        
                        <option value="legume">Legume</option>
                      </select>
                  </div>
                  
              </div>
              
            
              {categorie==='poulet' && <div className="row" >
                <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={poulet} label={'Poulet'} backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                    
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={tendres} label={'Tendres'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={wings} label={'Wings'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={legs} label={'Legs'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={dips} label={'Dips'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={hotdogs} label={'HotDogs'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
                  </div>
                </div>
                }

                {categorie==='legume' && <div className="row" >
                <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={frite} label={'frite'} backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                    
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={laitue} label={'laitue'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={tomate} label={'tomate'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={oignon} label={'oignon'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={choux} label={'choux'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={caroute} label={'carotte'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
                  </div>
                </div>
                }

            </Modal.Body>
            
      </Modal>
    )
}

export default StatistiqueTypeProduit;
