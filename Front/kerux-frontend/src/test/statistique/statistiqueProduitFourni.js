import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import seviceStatistique from '../../service/sevice.statistique'
import { Bar, getDatasetAtEvent } from 'react-chartjs-2';


const StatistiqueProduitFourni = (props) => {

    const [categorie_prod, setCategorie_prod] = useState([])
    //const labels = Utils.months({count: 12});

 console.log("hello");
    

    const calissificate = () => {

        for (var i=1 ; i< 13 ; i++ ){
            seviceStatistique.getCategorieproduitFourni('poulet','2022-'+i+'01')
            .then((res) => {
                categorie_prod.push( res.data)
        })
        }
       
    }

    return(
        <Modal   fullscreen={true} scrollable={true} show={props.show} onHide={()=> {props.handleClose() }}>
            <Modal.Header closeButton>
            <Modal.Title>Satatistique de produits fournis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Bar
                    data = {{
                        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin' , 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                        }}
                    height = {400}
                    width = {600}
                    option ={{
                        maintainAspectRadio: false
                    }}
                />


            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" >OK</button>
            </Modal.Footer>
      </Modal>
    )
}

export default StatistiqueProduitFourni;
