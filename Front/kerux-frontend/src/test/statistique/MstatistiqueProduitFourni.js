import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import CategorieStatistique from './statistiqueCategorie'
import seviceStatistique from '../../service/sevice.statistique'



const StatistiqueProduitFourni = (props) => {

     //const [categorie, setCategorie] = useState()
     //const [type_prod, setType_prod] = useState()
     

     function calassificate (categorie) {
       var categorie_prod = []
        for (var i=1 ; i< 13 ; i++ ){
          if (i<12){
              seviceStatistique.getCategorieproduitFourni(categorie,'2022-'+i+'-01', '2022-'+i+'-1')
              .then((res) => {
                  //console.log(res.data[0]);
                  categorie_prod.push(parseFloat (res.data[0].count))
              })
              }
              
          if (i===12){
            seviceStatistique.getCategorieproduitFourni(categorie,'2022-'+i+'-01','2023-' +i+'-1')
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
              
            <div className="row" >
              <div className='col-sm-10' style={{width:"45%" }}>
                <CategorieStatistique  database={calassificate('poulet')} label={'Poulet'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                
              </div>
              <div className='col-sm-6' style={{width:"45%"}}>
                <CategorieStatistique  database={calassificate('legume')} label={'Legume'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
              </div>
            </div> 

            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" >OK</button>
            </Modal.Footer>
      </Modal>
    )
}

export default StatistiqueProduitFourni;
