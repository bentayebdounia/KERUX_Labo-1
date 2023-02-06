import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import serviceEntrepot from '../../service/service.entrepot'
import Pagination from '../../test/pagination/pagination'
import moment from 'moment'

const ListeEntrepot = (props) => {

    const [entrepot, setEntrepot] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    //les operation de pagination 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const entrepots= entrepot.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
 
    
    useEffect ( () => {
        serviceEntrepot.getAllEntrepot().then((res)=> {
            setEntrepot(res.data)
            
        })
    })
    

    const dateNow = (d) => {
        var date=  moment.utc(d).format('DD-MM-YY')
        const words = date.split('-');
        var a = parseInt(words[0])+1+'-'+(words[1])+'-'+(words[2])
        //console.log(a+1)
        return a
    }

    const annuler = () => {
        props.handleClose ()  
    }   


    return (  
        <>
            <Modal size="xl" scrollable={true} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "#7B170F"}}><i className="bi bi-house-fill" style={{color: "#7B170F" , fontSize:"25px"}}   > </i>  Liste Des Entrepots</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                    <table className="table table-bordered"  >
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nom d'entrepot</th>
                        <th scope="col">Type d'entrepot</th>
                        <th scope="col">Air de stockage</th>
                        <th scope="col">Capacité</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Date d'enregistrement d'entrepot</th>
                        <th scope="col">L'existance</th>

                        </tr>
                    </thead>
                    <tbody>
                        {entrepots.map(
                        (p, key) =>
                            <tr key={key+1}>
                                <td>{key}</td>
                                <td>{p.id_entrepot}</td>
                                <td>{p.nom_entrepot}</td>
                                <td>{p.type_entrepot}</td>
                                <td>{p.air_stockage}</td>
                                <td>{p.capacite}</td>
                                <td>{p.adresse}</td>
                                <td>{dateNow(p.date_enregistrement_entrepot)}</td>
                                <td>{p.exist}</td>
                            </tr>
                    )}
                        
                    </tbody>
                    </table>

                    {entrepots.length>=6 && <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={entrepot.length}
                            paginate={paginate}
                        />}
                    
                </div>
                    

                    
                </Modal.Body>
                
             </Modal>

             
             
        </>
        
        
     )
}
 
export default ListeEntrepot;