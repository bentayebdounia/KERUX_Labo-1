import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2';
import { Pie, defaults } from 'react-chartjs-2'

const ChartTypeStatistique = (props) => {

    const [categorie_prod, setCategorie_prod] = useState([])
 

   

    return(
        < >
           
            
                
            <div >
            
                    <Bar
                        data={{
                        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                        datasets: [
                            {
                                label: props.label1,
                                data: props.database1,
                                backgroundColor:props.backgroundColor1,
                                
                                borderColor: props.borderColor1,
                                borderWidth: 1,
                            },
                            {
                                label: props.label2,
                                data: props.database2,
                                backgroundColor:props.backgroundColor2,
                                
                                borderColor: props.borderColor2,
                                borderWidth: 1,
                            },
                            {
                                label: props.label3,
                                data: props.database3,
                                backgroundColor:props.backgroundColor3,
                                
                                borderColor: props.borderColor3,
                                borderWidth: 1,
                            },
                            {
                                label: props.label4,
                                data: props.database4,
                                backgroundColor:props.backgroundColor4,
                                
                                borderColor: props.borderColor4,
                                borderWidth: 1,
                            },
                            {
                                label: props.label5,
                                data: props.database5,
                                backgroundColor:props.backgroundColor5,
                                
                                borderColor: props.borderColor5,
                                borderWidth: 1,
                            },
                            {
                                label: props.label6,
                                data: props.database6,
                                backgroundColor:props.backgroundColor6,
                                
                                borderColor: props.borderColor6,
                                borderWidth: 1,
                            },
                            
                            
                            
                        ],
                        }}
                        height={400}
                        width={600}
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

export default ChartTypeStatistique;