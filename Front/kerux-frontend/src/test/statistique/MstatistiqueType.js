import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import CategorieStatistique from './statistiqueCategorie'
import seviceStatistique from '../../service/sevice.statistique'


const StatistiqueTypeProduit = (props) => {

     const [categorie, setCategorie] = useState()
     



    function calassificate (categorie) {
      var categorie_prod = []
       for (var i=1 ; i< 13 ; i++ ){
         if (i<12){
             seviceStatistique.getTypeproduitFourni(categorie,'2022-'+i+'-01', '2022-'+i+'-1')
             .then((res) => {
                 //console.log(res.data[0]);
                 categorie_prod.push(parseFloat (res.data[0].count))
             })
             }
             
         if (i===12){
           seviceStatistique.getTypeproduitFourni(categorie,'2022-'+i+'-01','2023-' +i+'-1')
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
            <Modal.Title>Satatistique de produits fournis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mb-3">
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
                    <CategorieStatistique  database={calassificate('poulet',)} label={'Poulet'} backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                    
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('tendres')} label={'Tendres'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('wings')} label={'Wings'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('legs')} label={'Legs'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('dips')} label={'Dips'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('hotDogs')} label={'HotDogs'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
                  </div>
                </div>
                }

                {categorie==='legume' && <div className="row" >
                <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('frite',)} label={'frite'} backgroundColor={'rgba(255, 99, 132, 0.2)'} borderColor= {'rgb(255, 99, 132)'} />
                    
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('laitue')} label={'laitue'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('tomate')} label={'tomate'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('oignon')} label={'oignon'} backgroundColor={'rgba(75, 192, 192, 0.2)'} borderColor= {'rgb(75, 192, 192)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('choux')} label={'choux'} backgroundColor={'rgba(54, 162, 235, 0.2)'} borderColor= {'rgb(54, 162, 235)'} />
                  </div>
                  <div className='col-sm-3' style={{width:"30%"}}>
                    <CategorieStatistique  database={calassificate('carotte')} label={'carotte'} backgroundColor={'rgba(153, 102, 255, 0.2)'} borderColor= {'rgb(153, 102, 255)'} />
                  </div>
                </div>
                }

            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" >OK</button>
            </Modal.Footer>
      </Modal>
    )
}

export default StatistiqueTypeProduit;
