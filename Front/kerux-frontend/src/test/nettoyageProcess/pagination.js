import React  , {useState,useEffect} from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [number , setNumber] = useState(1)
  //const [suiv , setSuiv] = useState(false)
 
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

 
  function suivant () {
    if (number< pageNumbers.length+1){
        
      setNumber((prevNumber)=> prevNumber+1)
        console.log(number)
        paginate(number)
       
    }
  }

  function precident () {
    if (number> 0){
        console.log(number)
        
        setNumber((prevNumber)=> prevNumber-1)
        paginate(number)
    }
  }

  return (
    <nav className='d-flex justify-content-center'>
      <ul className='pagination'>
       


            {number>0 && <li className='page-item'>
                <a onClick={()=> precident()} href='#' className='page-link' style={{color: "#7B170F"}}>
                    precident
                    </a>
                </li>
             }
 
            <li className='page-item'>
                <a onClick={() => paginate(number)} href='#' className='page-link' style={{color: "#7B170F"}}>
                {(pageNumbers.length-(pageNumbers.length-1))}
                </a>
            </li>
            <li  className='page-item'>
                <a onClick={() => paginate(number+1)} href='#' className='page-link' style={{color: "#7B170F"}}>
                {(pageNumbers.length-(pageNumbers.length-2))}
                </a>
            </li>
            <li  className='page-item'>
                <a  href='#' className='page-link' style={{color: "#7B170F"}}>
                ......
                </a>
            </li>
            <li className='page-item'>
                <a onClick={suivant} href='#' className='page-link' style={{color: "#7B170F"}}>
                  suivant
                </a>
             </li>
        
      
      </ul>
    </nav>
  );
};

export default Pagination;
