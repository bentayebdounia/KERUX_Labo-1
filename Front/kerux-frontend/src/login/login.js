import React ,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import LoginServer from '../service/service.login'
import ModelReponse from '../Models/Model.repense'
import ServiceRole from '../service/service.role'
import './login.css'

//import {ipcRendrer} from 'electron'

const Login=() => {
    const [id, setId]=useState('')
    const [password, setPassword]=useState('')
    const history = useHistory();

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [message,setMessage] = useState()
    
    const connecter = (e) => {

        //var id = document.forms['form']['id']
        //var password = document.forms['form']['password']
        if (id.length > 0 && password.length > 0){
            console.log("bienvenue");
            LoginServer.getPersonneById(id).then(res =>{
                if (res.data === "ID n'existe pas"){
                    
                    setMessage("ID n'existe pas")
                    handleShow()
                    setId('')
                    setPassword('')
                    
                }
                else {
                    LoginServer.login(id, password).then(res =>{
                        if(res.data==="Mot de passe incorrect"){
                            setMessage("Mot de passe incorrect")
                            handleShow()
                            setId('')
                            setPassword('')

                        }
                            //alert("Mot de passe incorrect")
                        else {


                            history.push(  {
                                                         pathname:'/admin' ,
                                                         name: res.data[0].nom  ,
                                                         lastname: res.data[0].prenom ,
                                                         id: res.data[0].id_personne
                                                     }  );
                            
                        console.log(res.data[0].nom , res.data[0].prenom);}
                    })
                }
            })
            
            
            
            //document.location.href = 'https://google.com'
            //admin.getRole()
        }
        else {
            setMessage("Veuiller remplir les champs")
            handleShow()
            }
                
           
    }

    function print () {
    
        //ipcRendrer.send('print',JSON.stringify([{"hello":'hello'}]))
       }

return (
    <div className="container-fluid">
        <div className="container mb-5 my-5 py-5 pt-5">
            <div className="form-floating mb-4" id='formFloatingLog'>
                <h1>CONNECTION</h1>
            </div>
            <form className="needs-validation" name="form" novalidate>
                <div className="form-floating mb-4" id='formFloatingLog'>
                    <input type="number" className="form-control my-3" name="id" placeholder="ID" value={id} onChange={(e)=> setId(e.target.value)} required />
                    <label for="floatingInput">ID</label>
                    </div>
                    <div className="form-floating mb-5" id='formFloatingLog'>
                    <input type="password" className="form-control" name="password" placeholder="Mot de passe" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    <label for="floatingPassword">mot de passe</label>
                </div>
                
            </form>
            <div className="d-grid gap-2 " style={{marginLeft: "100px", marginRight:" 100px"}}>
            <button className="btnlog" type="submit" onClick={(e) => connecter(e)} >CONNECTER</button>
            </div>
        </div>
        <ModelReponse show={show} handleClose={handleClose} handleShow={handleShow} titre={"Login"} message={message}  />
    </div>
    
)

}
export default Login