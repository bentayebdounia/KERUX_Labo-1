import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2';


const ChartProcessProd = (props) => {

    

 console.log("hello");
   

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
                            }
                            
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

export default ChartProcessProd;