import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import CategorieStatistique from './statistiqueCategorie'
import seviceStatistique from '../../service/sevice.statistique'



const StatistiqueProduitFourni = (props) => {
     const [poulet, setPoulet] = useState([])
     const [legume, setLegume] = useState([])
    
    
      // setPoulet(calassificate('poulet'))
      // setLegume(calassificate('legume'))
   
      useEffect( () =>{
        setPoulet(calassificate('poulet'))
        
      },poulet)

      useEffect (()=>{
        setLegume(calassificate('legume'))
      },legume)
      
     function  calassificate (categorie) {
       const categorie_prod = []

       
        for (var i=1 ; i< 13 ; i++ ){
          
          if (i<12){
            console.log(categorie+' '+i);
               seviceStatistique.getCategorieproduitFourni(categorie,'2023-'+(i)+'-1', '2023-'+(i+1)+'-1')
              .then( async (res) => {
                  console.log(res.data[0]);
                  await categorie_prod.push(parseFloat (res.data[0].count))
              })
              }
              
          else if (i===12){
            console.log(categorie+' '+i);
            seviceStatistique.getCategorieproduitFourni(categorie,'2023-'+i+'-1','2024-' +1+'-1')
                .then(async (res) => {
                    console.log(res.data[0]);
                     await categorie_prod.push(parseFloat (res.data[0].count))
                })
                }

                }
                
                console.log(categorie_prod);
                return categorie_prod
     }
     console.log(poulet);
     console.log(legume);

    
    return(
        <Modal   fullscreen={true} scrollable={true} show={props.show} onHide={()=> {props.handleClose() }}>
            <Modal.Header closeButton>
            <Modal.Title>Satatistique de produits fournis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
            <div className="row" >
              <div className='col-sm-5' style={{width:"45%" , marginLeft:"3%" }}>
                <CategorieStatistique  database={poulet} label={'Poulet'} backgroundColor={'rgba(255, 159, 64, 0.2)'} borderColor= {'rgb(255, 159, 64)'} />
                </div>
                <div className='col-sm-5' style={{width:"45%" }}>
                <CategorieStatistique  database={legume} label={'Legume'} backgroundColor={'rgba(255, 205, 86, 0.2)'} borderColor= {'rgb(255, 205, 86)'} />
                
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
