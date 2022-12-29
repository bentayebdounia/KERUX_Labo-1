import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import seviceStatistique from '../../service/sevice.statistique'
import ChartProcessProd from './chartProcessProd'



const StatistiqueProcess = (props) => {

     const [categorie, setCategorie] = useState()
     const [etape, setEtape] = useState()
     //const [type_prod, setType_prod] = useState()

     
     function calassificate (produit,etape) {
        var categorie_prod = []
         for (var i=1 ; i< 13 ; i++ ){
           if (i<12){
               seviceStatistique.getPocessProd(produit,etape,'2022-'+i+'-01', '2022-'+i+'-1')
               .then((res) => {
                   //console.log(res.data[0]);
                   categorie_prod.push(parseFloat (res.data[0].count))
               })
               }
               
           if (i===12){
             seviceStatistique.getPocessProd(produit,etape,'2022-'+i+'-01','2023-' +i+'-1')
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
                        <option defaultValue={""}></option>
                        <option value="poulet">Poulet</option>
                        <option value="legume">Legume</option>
                      </select>
                  </div>
                  
              </div>

              {categorie==='poulet' && <div className="row" >
                <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('poulet',etape)} label={'Poulet'} backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                    
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('tendres',etape)} label={'Tendres'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('wings',etape)} label={'Wings'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('legs',etape)} label={'Legs'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('dips',etape)} label={'Dips'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('hotDogs',etape)} label={'HotDogs'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
                  </div>
                </div>
                }
               
             {categorie==='legume' && <div className="row" >
             
               <div className='col-sm-3' style={{width:"30%" }}>
                 <ChartProcessProd  database={calassificate('frite',etape)} label={'Frite'}   backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                 
               </div>
               <div className='col-sm-3' style={{width:"30%" }}>

                 <ChartProcessProd  database={calassificate('laitue',etape)} label={'Laitue'}  backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                 
               </div>
               <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('tomate',etape)} label={'tomate'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('oignon',etape)} label={'oignon'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('choux',etape)} label={'choux'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <ChartProcessProd  database={calassificate('carotte',etape)} label={'carotte'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
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
