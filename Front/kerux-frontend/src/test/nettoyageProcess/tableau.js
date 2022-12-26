import React ,{useState,useEffect} from 'react'

const Tableau = (props) => {

    return(
        <>

                <div className="divTab" style={{width:"80%", height:'160px' , marginLeft:"17%", overflow : 'auto'}}>
                        <table className="table table-bordered" >
                        <thead>
                            <tr><th scope="col">#</th>
                            <th scope="col">ID personne</th>
                            <th scope="col">Nom Prenom</th>
                            
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.agentNettoyage.map(
                                    (p, key) =>
                                    <tr key={key}>
                                        <td>{key +1}</td>
                                        <td>{p.id_personne}</td>
                                        <td>{p.nom}</td>
                                        
                                        
                                        
                                    </tr>
                                )
                            }
                            
                            
                        </tbody>
                        </table>
                </div>
        </>
        
        )


}

export default Tableau




