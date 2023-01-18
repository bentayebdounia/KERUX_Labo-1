import React ,{useState,useEffect} from 'react'
import Reception from '../receptionProcess/reception'
import TestNet from '../nettoyageProcess/testNet'
import TestCoupage from '../coupage/TestCoupage'

import TestCondit from '../conditionnemet/testCondit'
import TestSortie from '../sortieProcess/TestSortie'
import './etape.css'

const Etape = () => {

    const [controleReception, setControleReception] = useState(false)
    const [controleReceptionV, setControleReceptionV] = useState(false)

    const [controleEnrg, setControleEnrg] = useState(false)
    const [controleEnrgV, setControleEnrgV] = useState(false)

    const [controleNettoyage, setControleNettoyage] = useState(false)
    const [controleNettoyageV, setControleNettoyageV] = useState(false)

    const [controleCoupage, setControleCoupage] = useState(false)
    const [controleCoupageV, setControleCoupageV] = useState(false)

    const [controleCondit, setControleCondit] = useState(false)
    const [controleConditV, setControleConditV] = useState(false)

    const [controleSortie, setControleSortie] = useState(false)
    const [controleSortieV, setControleSortieV] = useState(false)
   
    function recepBtn(){
        setControleReception(true)
        setControleEnrg(false)
        setControleNettoyage(false)
        setControleCoupage(false)
        setControleCondit(false)
        setControleSortie(false)
        annulation()

    }
    
    function nettoypBtn(){
        setControleReception(false)
        setControleEnrg(false)
        setControleNettoyage(true)
        setControleCoupage(false)
        setControleCondit(false)
        setControleSortie(false)
        annulation()
        
    }
    function coupBtn(){
        setControleReception(false)
        setControleEnrg(false)
        setControleNettoyage(false)
        setControleCoupage(true)
        setControleCondit(false)
        setControleSortie(false)
        annulation()
    }
    function conditBtn(){
        setControleReception(false)
        setControleEnrg(false)
        setControleNettoyage(false)
        setControleCoupage(false)
        setControleCondit(true)
        setControleSortie(false)
        annulation()
        
    }
    function sortieBtn(){
        setControleReception(false)
        setControleEnrg(false)
        setControleNettoyage(false)
        setControleCoupage(false)
        setControleCondit(false)
        setControleSortie(true)
        annulation()
        
    }
    // VALIDATION
    function enrgBtn(){
        
        setControleEnrg(true)
        setControleReceptionV(true)
        setControleNettoyage(false)
        setControleCoupage(false)
        setControleCondit(false)
        setControleSortie(false)
        //annulation()
        
    }

    function nettoypBtnV(){
        setControleReceptionV(true)
        setControleEnrgV(true)
        setControleNettoyageV(false)
        setControleCoupageV(false)
        setControleConditV(false)
        setControleSortieV(false)
        
        
    }
    function coupBtnV(){
        setControleReceptionV(true)
        setControleEnrgV(true)
        setControleNettoyageV(true)
        setControleCoupageV(false)
        setControleConditV(false)
        setControleSortieV(false)
    }
    function conditBtnV(){
        setControleReceptionV(true)
        setControleEnrgV(true)
        setControleNettoyageV(true)
        setControleCoupageV(true)
        setControleConditV(false)
        setControleSortieV(false)
        
    }
    function sortieBtnV(){
        setControleReceptionV(true)
        setControleEnrgV(true)
        setControleNettoyageV(true)
        setControleCoupageV(true)
        setControleConditV(true)
        setControleSortieV(false)
        
    }

    //annulation
    function annulation(){
        setControleReceptionV(false)
        setControleEnrgV(false)
        setControleNettoyageV(false)
        setControleCoupageV(false)
        setControleConditV(false)
        setControleSortieV(false)
        
    }

    

    return (
        <>
           
            <div className="container" id='stepComponant'>
                <div className="row row-cols-6">
                    <div className="etape" type="submit" onClick={recepBtn}>
                        {controleReceptionV===false &&
                             <>
                                <div className="bi bi-1-circle"  style={{color:`${(controleReception===true) ? '#F6A51A' : '#D4D4D4'  }`}}  id="etape1"></div>
                                <div  style={{color:`${(controleReception===true) ? '#F6A51A' : '#D4D4D4'  }`}} >Reception</div>
                            </>
                         }
                         {controleReceptionV && 
                                <>
                                    <div className="bi bi-1-circle"  style={{color: '#399C49'}}  id="etape1"></div>
                                    <div  style={{color: '#399C49'}} >Reception</div>
                                </>
                                    } 

                    </div>

                    <div className="etape">
                        
                    {controleEnrgV===false &&
                             <>
                                <div className="bi bi-2-circle"  style={{color:`${(controleEnrg===true) ? '#F6A51A' : '#D4D4D4'  }`}}  id="etape1"></div>
                                <div style={{color:`${(controleEnrg===true) ? '#F6A51A' : '#D4D4D4'  }`}} >Enregistrement</div>
                            </>
                         }
                         {controleEnrgV && 
                                <>
                                    <div className="bi bi-2-circle"  style={{color: '#399C49'}}  id="etape1"></div>
                                    <div style={{color: '#399C49'}} >Enregistrement</div>
                                </>
                                    }  
                    </div>

                    <div className="etape" type="submit"  onClick={nettoypBtn}>
                        {controleNettoyageV===false &&
                             <>
                                <div className="bi bi-3-circle"  style={{color:`${(controleNettoyage===true) ? '#F6A51A' : '#D4D4D4'  }`}}  id="etape1"></div>
                                <div  style={{color:`${(controleNettoyage===true) ? '#F6A51A' : '#D4D4D4'  }`}} >Nettoyage</div>
                            </>
                         }
                         {controleNettoyageV && 
                                <>
                                    <div className="bi bi-3-circle"  style={{color: '#399C49'}}  id="etape1"></div>
                                    <div  style={{color: '#399C49'}} >Nettoyage</div>
                                </>
                                    }  
                    </div>

                    <div className="etape" type="submit" onClick={coupBtn}>
                        {controleCoupageV===false &&
                             <>
                                <div className="bi bi-4-circle"  style={{color:`${(controleCoupage===true) ? '#F6A51A' : '#D4D4D4'  }`}}  id="etape1"></div>
                                <div style={{color:`${(controleCoupage===true) ? '#F6A51A' : '#D4D4D4'  }`}} >Coupage</div>
                            </>
                         }
                         {controleCoupageV && 
                                <>
                                    <div className="bi bi-4-circle"  style={{color: '#399C49'}}  id="etape1"></div>
                                    <div  style={{color: '#399C49'}} >Coupage</div>
                                </>
                                    }  
                    </div>

                    <div className="etape" type="submit" onClick={conditBtn} >
                        {controleConditV===false &&
                             <>
                                <div className="bi bi-5-circle"  style={{color:`${(controleCondit===true) ? '#F6A51A' : '#D4D4D4'  }`}}  id="etape1"></div>
                                <div  style={{color:`${(controleCondit===true) ? '#F6A51A' : '#D4D4D4'  }`}} >Conditionnement</div>
                            </>
                         }
                         {controleConditV && 
                                <>
                                    <div className="bi bi-5-circle"  style={{color: '#399C49'}}  id="etape1"></div>
                                    <div  style={{color: '#399C49'}} >Conditionnement</div>
                                </>
                                    } 
                    </div>

                    <div className="etape" type="submit" onClick={sortieBtn}>
                        {controleSortieV===false &&
                             <>
                                <div className="bi bi-6-circle"  style={{color:`${(controleSortie===true) ? '#F6A51A' : '#D4D4D4'  }`}}  id="etape1"></div>
                                <div  style={{color:`${(controleSortie===true) ? '#F6A51A' : '#D4D4D4'  }`}} >Sortie</div>
                            </>
                         }
                         {controleSortieV && 
                                <>
                                    <div className="bi bi-6-circle"  style={{color: '#399C49'}}  id="etape1"></div>
                                    <div  style={{color: '#399C49'}} >Sortie</div>
                                </>
                                    } 
                    </div>
                </div>
            
            </div>

            {controleReception && <Reception recepBtn={recepBtn} enrgBtn={enrgBtn} />}
            {controleNettoyage && <TestNet nettoypBtnV={nettoypBtnV} nettoypBtn={nettoypBtn} />}
            {controleCoupage && <TestCoupage coupBtnV={coupBtnV} coupBtn={coupBtn} />}
            {controleCondit && <TestCondit conditBtnV={conditBtnV}  conditBtn={conditBtn} />}
            {controleSortie && <TestSortie sortieBtnV={sortieBtnV}  sortieBtn={sortieBtn}/>}
            
        
        </>
    )

}
export default Etape 