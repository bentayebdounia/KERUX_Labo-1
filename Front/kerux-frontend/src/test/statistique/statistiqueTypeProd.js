import React ,{useState,useEffect} from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2';



const CategorieStatistique = (props) => {

   
    

    
    //const labels = Utils.months({count: 12});

 console.log("hello");
    
   
//console.log(calassificate());
    return(
        < >
           
            
                
            <div >
                
            
                    <Bar
                        data={{
                        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                        datasets: [
                            {
                            label: 'Poulet',
                            data: props.database,
                            backgroundColor:props.backgroundColor,
                            
                            borderColor: props.borderColor,
                            borderWidth: 1,
                            },
                            {
                                label: 'Legume',
                                data: props.database2,
                                backgroundColor:props.backgroundColor2,
                                
                                borderColor: props.borderColor2,
                                borderWidth: 1,
                                }
                            
                        ],
                        }}
                        height={300}
                        width={400}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                              ticks: {
                                backdropPadding: {
                                    x: 5,
                                    y: 5
                                }
                              }}}
                        }}
                    />
            </div>


            
      </>
    )
}

export default CategorieStatistique;