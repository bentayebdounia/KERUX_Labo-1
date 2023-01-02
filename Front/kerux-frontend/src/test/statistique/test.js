import React, {useEffect, useState} from 'react'
import CategorieStatistique from './statistiqueCategorie'
import seviceStatistique from '../../service/sevice.statistique'
import StatistiqueProduitFourni from './MstatistiqueProduitFourni'

export default function Test(props) {
    const [test, setTest] = useState(calassificate())
console.log('hhh');
    function calassificate () {
        var categorie_prod = []
        for (var i=1 ; i< 13 ; i++ ){
            
           if (i<12){
            
               seviceStatistique.getCategorieproduitFourni('poulet','2022-'+i+'-01', '2022-'+i+'-1')
               .then( async(res) => {
                    
                   console.log(res.data[0])
                  await categorie_prod.push(parseFloat (res.data[0].count))
               })
               }
               
           if (i===12){
            console.log(i);
             seviceStatistique.getCategorieproduitFourni('poulet','2022-'+i+'-01','2023-' +i+'-1')
                 .then(async(res) => {
                    
                     console.log(res.data[0]);
                     await categorie_prod.push(parseFloat (res.data[0].count))
                 })
                 }
 
                 }
                 console.log(categorie_prod);
                 
                 return categorie_prod
      }
      
 
  return (
    <div>
        <StatistiqueProduitFourni
                                         data1={test}
                                        
                                          show={props.show}
                                          handleClose={props.handleClose}
                  />
    </div>
  )
}
