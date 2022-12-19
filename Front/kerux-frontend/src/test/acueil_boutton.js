import React ,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../bootstrap-icons-1.9.1/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './navbar/navbar'
import serviceStock from '.././service/service.stock'
import moment from 'moment'


const AcueilBoutton = () => {

    const [stock, setStock] = useState([])
    const [enStock, setenStock] = useState([])

    useEffect(() => {
        serviceStock.getStock()
        .then ((res) => {
            setStock(res.data)

        })

        
              
    })

   

    

    const StockFunction = () => {
        var convert

        var today = new Date
        console.log("hi");
        for (var i=0; i< stock.length; i++) {
            console.log("for1");
            if (stock[i].date_sortie === null){
                enStock.push(stock[i])
                console.log("if1");

            }
            
        }

        console.log(moment.utc(enStock[1].date_entree).format('MM') );

        for (var j=0; j<enStock.length-1; j++) {
            console.log("topic "+  moment.utc(enStock[i].date_entree).format('YYYY'));
           if( moment.utc(enStock[i].date_entree).format('YYYY') === today.getFullYear() ) {
            console.log("topic1");
            var diff =  today.getDate() - moment.utc(enStock[1].date_entree).format('DD')
                console.log(diff);
                if( enStock[i].categorie==='poulet'){
                    if( diff>0 && diff <2){
                        console.log("risque en stock");
                    }
                    else if (diff>2) console.log("danger en stock");
                
                
                }

           }
            
        }
    
    
    }
 

    return(
        <>
        <div className="container" id='stepComponant'>
            <button onClick={StockFunction}>Click</button>
            
        </div>
        </>
        
    )
}
export default AcueilBoutton