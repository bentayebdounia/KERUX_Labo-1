import React ,{useState,useEffect} from 'react'
import Alert from 'react-bootstrap/Alert';
import serviceAlert from '../../service/service.alert'

const Acueil = () => {

    const [alertDanger, setAlertdanger] = useState()
    const [alertWarnning, setAlertwarnning] = useState()
    const [alertPrimary, setAlertprimary] = useState()

    const dateAlert = (n) => {
        const d = new Date
        
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+n)
    }
    useEffect(()=>{
        serviceAlert.countAlert(dateAlert(0)).then((res)=> {
            setAlertdanger(res.data[0].count)
            console.log(res.data[0].count);
        })

    })

    useEffect(()=>{
        serviceAlert.countAlert(dateAlert(2)).then((res)=> {
            setAlertwarnning(res.data[0].count)
            console.log(res.data[0].count);
        })

    })

    useEffect(()=>{
        serviceAlert.countAlertPrimary(dateAlert(1)).then((res)=> {
            setAlertprimary(res.data[0].count)
            console.log(res.data[0].count);
        })

    })
//<i className="bi bi-exclamation-triangle-fill"></i>
    return (
        <div style={{marginTop: "100px", marginLeft:"5%", marginRight:"5%"}}>
          

            <Alert variant={'danger'}>
            <i className="bi bi-exclamation-triangle-fill"></i>
                Vous avez ( {alertDanger} ) produit en attente 
            </Alert>
            <Alert variant={'warning'}>
                Vous avez ( {alertWarnning} ) produits en attente 
            </Alert>

            <Alert variant={'primary'}>
             Vous avez ( {alertPrimary} ) produits en attente
            </Alert>
        </div>
      );

}

export default Acueil

