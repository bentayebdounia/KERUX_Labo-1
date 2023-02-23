import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import CoupageService from '../../service/service.coupage'
import ModalQStock from './Stock_coupage/Modal.ajouterEnStock'
import Service_AgentProcess from '../../service/service.agentProcess'
import serviceAlert from '../../service/service.alert'

const ModalConfirmCoup = (props) => {
    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [resulte, setResult] = useState()

    const ajouterCle = (categorie, type, numeroBox) => {
        if (categorie === "poulet"){
            if (type === "poulet") return 'PP'+ numeroBox
            else if (type === "tendres") return 'PT'+ numeroBox
                 else if (type === "wings") return 'PW'+ numeroBox
                      else if (type === "dips") return 'PD'+ numeroBox
                            else if (type === "hotDogs") return 'PH'+ numeroBox
                                 else if (type === "legs") return 'PL'+ numeroBox
        }

        else if (categorie === "legume"){
            if (type === "frite") return 'LF'+ numeroBox
            else if (type === "laitue") return 'LL'+ numeroBox
                else if (type === "tomate") return 'LT'+ numeroBox
                    else if (type === "oignon") return 'LO'+ numeroBox
                            else if (type === "choux") return 'LCH'+ numeroBox
                                else if (type === "carotte") return 'LC'+ numeroBox
        }

            else return 'A'+numeroBox
    }

    const numero_box = (n) =>
    {
        if (n >0 && n<10) return (0+''+n)
        else return n
    }
  
    const dateAlert = () => {
        const d = new Date
       return d
    }

    const confirmCoupage = async (e) => {
        e.preventDefault();
        var etape="coupage"
        var today = new Date()
        var datee =today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate()
        var heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        console.log(datee)
        console.log(heure)

        var cle = ajouterCle(props.categorie, props.typeProd, props.numeroBox)
        console.log(  props.poids)
        
        await CoupageService.ajouterCoupage( props.categorie, props.typeProd, etape, props.poids, props.nombre, props.id_box,  props.fk_proditfourni, cle
            
            ).then( (res)=> {
            console.log(res.data)
            setResult(res.data)

            serviceAlert.ajouterAlert(res.data.id_process, dateAlert()).then ((result) =>{
                console.log (result.data)
            })

            

            //ajouter les agents  de nettoyage au bdd
            for(var i=0 ; i<props.agents.length ;i++) {
                console.log(props.agents[i]);
                Service_AgentProcess.ajouterAgentProcess(res.data.id_gnerate , props.agents[i].id_personne)
                .then((result)=>{
                    console.log(result.data)
                            })
            } 
        
        })
       
        
        props.handleClose2()
        props.confirmeCoupageTrue()
        handleShow3()
        
        
        
        
    }

    return (
      <>
        <Modal show={props.show2} onHide={props.handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Voulez-vous valider ce process? </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="list-group">
              <span className="list-group-item  list-group-item-light">
                {" "}
                <span className="attributs">Categorie:</span> {props.categorie}
              </span>
              <span className="list-group-item  list-group-item-light">
                {" "}
                <span className="attributs">Type de produit:</span>{" "}
                {props.typeProd}{" "}
              </span>
              <span className="list-group-item  list-group-item-light">
                {" "}
                <span className="attributs">Agent:</span>
                {props.agents.map((value, key) => {
                  return (
                    <li>
                      {" "}
                      {value.id_personne} . {value.nom} {value.prenom}{" "}
                    </li>
                  );
                })}
              </span>
              <span className="list-group-item list-group-item-action list-group-item-light">
                {" "}
                <span className="attributs">Poids:</span> {props.poids / 1000}{" "}
                Kg
              </span>
              {props.categorie === "poulet" && (
                <span className="list-group-item list-group-item-action list-group-item-light">
                  {" "}
                  <span className="attributs">Nombre:</span> {props.nombre}
                </span>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={props.handleClose2}
            >
              Non
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => confirmCoupage(e)}
            >
              Oui
            </button>
          </Modal.Footer>
        </Modal>

        <ModalQStock
          show3={show3}
          handleClose3={handleClose3}
          handleShow3={handleShow3}
          result={resulte}
          toggleDisplay={props.toggleDisplay}
          PorcentagePoids={props.PorcentagePoids}
          poids={props.poids}
          nombre={props.nombre}
          categorie={props.categorie}
          btnC={props.btnC}
          produit={props.typeProd}
        />
      </>
    );
}
 
export default ModalConfirmCoup;