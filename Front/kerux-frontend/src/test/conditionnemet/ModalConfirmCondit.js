import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import ConditService from '../../service/service.condit'
import ModalQStock from '../coupage/Stock_coupage/Modal.ajouterEnStock'
import serviceAlert from '../../service/service.alert'
import Service_AgentProcess from '../../service/service.agentProcess'

const ModalConfirmCondit = (props) => {

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [result, setResult] = useState()

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
            else if (type === "laitue") return 'LL'+numeroBox
                else if (type === "tomate") return 'LT'+numeroBox
                    else if (type === "oignon") return 'LO'+numeroBox
                            else if (type === "choux") return 'LCH'+numeroBox
                                else if (type === "carotte") return 'LC'+numeroBox
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
    
    const confirmNCondit = async (e) => {
        e.preventDefault();
        var etape="conditionnement"
        console.log(props.process.categorie, props.process.nom_produit, etape, parseFloat(props.poids) ,parseFloat(props.nombre) , props.process.id_nettoyage, props.id_box, props.process.fk_proditfourni, cle);
        
        var cle = ajouterCle(props.process.categorie, props.process.nom_produit, props.numeroBox)
        await ConditService.ajouterConditionnement( props.process.categorie, props.process.nom_produit, etape, parseFloat(props.poids) ,parseFloat(props.nombre) , props.process.id_nettoyage, props.id_box, props.process.fk_proditfourni, cle)
        .then( (res)=> {
            console.log(res.data)
            setResult(res.data)

            serviceAlert.ajouterAlert(res.data.id_process, dateAlert()).then ((result) =>{
                console.log(result.data)
            })
            
            serviceAlert.updateAlert(props.process.id_process).then ((result) =>{
                console.log(result.data)
            })

            for(var i=0 ; i<props.agents.length ;i++) {
                console.log(props.agents[i].id_personne);
                Service_AgentProcess.ajouterAgentProcess(res.data.id_gnerate , props.agents[i].id_personne)
                .then((result)=>{
                    console.log(result.data)
                            })
            } 
        })
       
        props.confirmeConditionnemetTrue()
        handleShow3()
        props.handleClose()
        
        
        
    }

    return (
      <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Voulez-vous valider cet ??tape? </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="list-group">
              <span className="list-group-item ">
                {" "}
                <span className="attributs">ID box:</span> {props.id_box}{" "}
              </span>
              <span className="list-group-item  list-group-item-light">
                {" "}
                <span className="attributs">Categorie:</span>{" "}
                {props.process.categorie}
              </span>
              <span className="list-group-item  list-group-item-light">
                {" "}
                <span className="attributs">Type de produit:</span>{" "}
                {props.process.nom_produit}{" "}
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
              {props.process.categorie === "poulet" && (
                <span className="list-group-item list-group-item-action list-group-item-light">
                  {" "}
                  <span className="attributs">Quantit??:</span> {props.nombre}
                </span>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={props.handleClose}
            >
              Non
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => confirmNCondit(e)}
            >
              Oui
            </button>
          </Modal.Footer>
        </Modal>

        <ModalQStock
          show3={show3}
          handleClose3={handleClose3}
          handleShow3={handleShow3}
          result={result}
          toggleDisplay={props.toggleDisplay}
          PorcentagePoids={props.PorcentagePoids}
          poids={props.poids}
          nombre={props.nombre}
          categorie={props.process.categorie}
          produit={props.process.nom_produit}
          btnC={props.btnC}
        />
      </>
    );
}
 
export default ModalConfirmCondit;

