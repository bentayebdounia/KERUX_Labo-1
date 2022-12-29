import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2';
import { Pie, defaults } from 'react-chartjs-2'

const CategorieStatistique = (props) => {

    const [categorie_prod, setCategorie_prod] = useState([])
    

    
    //const labels = Utils.months({count: 12});

 console.log("hello");
    
 

  /*   useEffect(()=>{
        for (var i=1 ; i< 13 ; i++ ){
            if (i<12){
                seviceStatistique.getCategorieproduitFourni(props.categorie,'2022-'+i+'-01', '2022-'+i+'-1')
                .then((res) => {
                    //console.log(res.data[0]);
                    categorie_prod.push(parseFloat (res.data[0].count))
                 })
                }
                 
        if (i===12){
            seviceStatistique.getCategorieproduitFourni(props.categorie,'2022-'+i+'-01','2023-' +i+'-1')
                .then((res) => {
                    //console.log(res.data[0]);
                    categorie_prod.push(parseFloat (res.data[0].count))
                 })
                 }

                }
     },[])
            

    */    
        

       

   
//console.log(calassificate());
    return(
        < >
           
            
                
            <div >
            
                    <Bar
                        data={{
                        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                        datasets: [
                            {
                            label: props.label,
                            data: props.database,
                            backgroundColor:props.backgroundColor,
                            
                            borderColor: props.borderColor,
                            borderWidth: 1,
                            },
                            
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        
                        }}
                    />
            </div>


            
      </>
    )
}

export default CategorieStatistique;