import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import seviceStatistique from '../../service/sevice.statistique'
import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2';
import { Pie, defaults } from 'react-chartjs-2'


const StatistiqueProduitFourni = (props) => {

    const [categorie_prod, setCategorie_prod] = useState([])
    const [categorie_Legume, setCategorie_legume] = useState([])

    
    //const labels = Utils.months({count: 12});

 console.log("hello");
    
 useEffect(()=>{
    
        for (var i=1 ; i< 13 ; i++ ){
            if (i<12){
                seviceStatistique.getCategorieproduitFourni('poulet','2022-'+i+'-01', '2022-'+i+'-1')
                .then((res) => {
                    //console.log(res.data[0]);
                    categorie_prod.push(parseFloat (res.data[0].count))
                 })
                }
                
                 
                 
                 
        if (i===12){
            seviceStatistique.getCategorieproduitFourni('poulet','2022-'+i+'-01','2023-' +i+'-1')
                .then((res) => {
                    //console.log(res.data[0]);
                    categorie_prod.push(parseFloat (res.data[0].count))
                 })
                 }

                }
                console.log(categorie_prod);   
        })

        

       

   
//console.log(calassificate());
    return(
        <Modal   fullscreen={true} scrollable={true} show={props.show} onHide={()=> {props.handleClose() }}>
            <Modal.Header closeButton>
            <Modal.Title>Satatistique de produits fournis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                
            <div>
            
      <Bar
        data={{
          labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
          datasets: [
            {
              label: 'Poulet ',
              data: categorie_prod,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
             {
               label: 'Legume',
               data: categorie_Legume,
               backgroundColor: 'orange',
               borderColor: 'red',
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


            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" >OK</button>
            </Modal.Footer>
      </Modal>
    )
}

export default StatistiqueProduitFourni;
