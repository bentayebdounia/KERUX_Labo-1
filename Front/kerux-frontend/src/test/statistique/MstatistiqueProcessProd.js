import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import seviceStatistique from '../../service/sevice.statistique'
import ChartProcessProd from './chartProcessProd'



const StatistiqueProcess = (props) => {

     const [categorie, setCategorie] = useState('poulet')
     const [etape, setEtape] = useState('enregistrement')
     
     //const [type_prod, setType_prod] = useState()

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
    if (etape==='enregistrement')
    {
      setFrite(calassificate('frite',etape))
      setTomate(calassificate('tomate',etape))
      setLaitue(calassificate('laitue,etape'))
      setOignon(calassificate('oignon',etape))
      setChoux(calassificate('choux',etape))
      setCaroute(calassificate('carotte',etape))
    }
    else if (etape==='nettoyage')
    {
      setFrite(calassificate('frite',etape))
      setTomate(calassificate('tomate',etape))
      setLaitue(calassificate('laitue,etape'))
      setOignon(calassificate('oignon',etape))
      setChoux(calassificate('choux',etape))
      setCaroute(calassificate('carotte',etape))
    }
    else if (etape==='coupage')
    {
      setFrite(calassificate('frite',etape))
      setTomate(calassificate('tomate',etape))
      setLaitue(calassificate('laitue,etape'))
      setOignon(calassificate('oignon',etape))
      setChoux(calassificate('choux',etape))
      setCaroute(calassificate('carotte',etape))
    }

    else if (etape==='conditionnement')
    {
      setFrite(calassificate('frite',etape))
      setTomate(calassificate('tomate',etape))
      setLaitue(calassificate('laitue,etape'))
      setOignon(calassificate('oignon',etape))
      setChoux(calassificate('choux',etape))
      setCaroute(calassificate('carotte',etape))
    }

    else if (etape==='marinade')
    {
      setFrite(calassificate('frite',etape))
      setTomate(calassificate('tomate',etape))
      setLaitue(calassificate('laitue,etape'))
      setOignon(calassificate('oignon',etape))
      setChoux(calassificate('choux',etape))
      setCaroute(calassificate('carotte',etape))
    }

    else if (etape==='sortie')
    {
      setFrite(calassificate('frite',etape))
      setTomate(calassificate('tomate',etape))
      setLaitue(calassificate('laitue,etape'))
      setOignon(calassificate('oignon',etape))
      setChoux(calassificate('choux',etape))
      setCaroute(calassificate('carotte',etape))
    }


  },frite,tomate,laitue,oignon,choux, caroute)

  useEffect(()=>{
    if (etape==='enregistrement')
    {
      setPoulet(calassificate('poulet',etape))
      setTendres(calassificate('tendres',etape))
      setWings(calassificate('wings',etape))
      setLegs(calassificate('legs',etape))
      setDips(calassificate('dips',etape))
      setHotdogs(calassificate('hotDogs',etape))
    }
    else if (etape==='nettoyage')
    {
      setPoulet(calassificate('poulet',etape))
      setTendres(calassificate('tendres',etape))
      setWings(calassificate('wings',etape))
      setLegs(calassificate('legs',etape))
      setDips(calassificate('dips',etape))
      setHotdogs(calassificate('hotDogs',etape))
    }
    else if (etape==='coupage')
    {
      setPoulet(calassificate('poulet',etape))
      setTendres(calassificate('tendres',etape))
      setWings(calassificate('wings',etape))
      setLegs(calassificate('legs',etape))
      setDips(calassificate('dips',etape))
      setHotdogs(calassificate('hotDogs',etape))
    }
    else if (etape==='conditionnemet')
    {
      setPoulet(calassificate('poulet',etape))
      setTendres(calassificate('tendres',etape))
      setWings(calassificate('wings',etape))
      setLegs(calassificate('legs',etape))
      setDips(calassificate('dips',etape))
      setHotdogs(calassificate('hotDogs',etape))
    }

    else if (etape==='marinade')
    {
      setPoulet(calassificate('poulet',etape))
      setTendres(calassificate('tendres',etape))
      setWings(calassificate('wings',etape))
      setLegs(calassificate('legs',etape))
      setDips(calassificate('dips',etape))
      setHotdogs(calassificate('hotDogs',etape))
    }

    else if (etape==='sortie')
    {
      setPoulet(calassificate('poulet',etape))
      setTendres(calassificate('tendres',etape))
      setWings(calassificate('wings',etape))
      setLegs(calassificate('legs',etape))
      setDips(calassificate('dips',etape))
      setHotdogs(calassificate('hotDogs',etape))
    }

  },poulet,tendres,wings,legs,dips, hotdogs)

     
     function calassificate (produit,etape) {
        var categorie_prod = []
         for (var i=1 ; i< 13 ; i++ ){
           if (i<12){
               seviceStatistique.getPocessProd(produit,etape,'2023-'+i+'-01', '2023-'+(i+1)+'-1')
               .then((res) => {
                   console.log(res.data);
                   categorie_prod.push(parseFloat (res.data[0].count))
               })
               }
               
           if (i===12){
             seviceStatistique.getPocessProd(produit,etape,'2023-'+i+'-01','2024-' +(1)+'-1')
                 .then((res) => {
                     console.log(res.data);
                     categorie_prod.push(parseFloat (res.data[0].count))
                 })
                 }
 
                 }
                 return categorie_prod
      }
 
     
     return(
         <Modal   fullscreen={true} scrollable={true} show={props.show} onHide={()=> {props.handleClose() }}>
             <Modal.Header closeButton>
             <Modal.Title>Satatistique des process </Modal.Title>
             </Modal.Header>
             <Modal.Body>

             <div className="row mb-3">
              <div className="col-sm-2">
                <label>Etape</label>
                      <select className="form-select" aria-label="Default select example" placeholder='categorie' id="typeBon" value={etape} onChange={(e)=> setEtape(e.target.value)}  required>
                      
                        <option value="enregistrement">Enregistrement</option>
                        <option value="nettoyage">Nettoyage</option>
                        <option value="coupage">Coupage</option>
                        <option value="conditionnement">Conditionnement</option>
                        <option value="marinade">Marinade</option>
                        <option value="sortie">Sortie</option>
                      </select>
                  </div>
                  
             
              <div className="col-sm-2">
                <label>Categorie de produit</label>
                      <select className="form-select" aria-label="Default select example" placeholder='categorie' id="typeBon" value={categorie} onChange={(e)=> setCategorie(e.target.value)}  required>
                        
                        <option value="poulet">Poulet</option>
                        <option value="legume">Legume</option>
                      </select>
                  </div>
                  
              </div>

              {categorie==='poulet' && <div className="row" >
                <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={poulet} label={'Poulet'} backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                    
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={tendres} label={'Tendres'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={wings} label={'Wings'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={legs} label={'Legs'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={dips} label={'Dips'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={hotdogs} label={'HotDogs'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
                  </div>
                </div>
                }
               
             {categorie==='legume' && <div className="row" >
             
               <div className='col-sm-3' style={{width:"30%" }}>
                 <ChartProcessProd  database={frite} label={'Frite'}   backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                 
               </div>
               <div className='col-sm-3' style={{width:"30%" }}>

                 <ChartProcessProd  database={laitue} label={'Laitue'}  backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                 
               </div>
               <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={tomate} label={'tomate'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={oignon} label={'oignon'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={choux} label={'choux'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={caroute} label={'carotte'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
                  </div>
              </div> }

                
 
             </Modal.Body>
             <Modal.Footer>
                     <button type="button" className="btn btn-dark" data-bs-dismiss="modal" >OK</button>
             </Modal.Footer>
       </Modal>
       )

     
    }


export default StatistiqueProcess;
