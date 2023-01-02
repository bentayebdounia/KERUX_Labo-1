import React  , {useState,useEffect} from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [number , setNumber] = useState(1)
  //const [suiv , setSuiv] = useState(false)
  //const [verify, setVerify] = useState(false)
 
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

   
 
 function increment(n){
  return n+1
 }
  function suivant () {
    console.log(number)
    if (number < pageNumbers.length){ 
       paginate(increment(number))
       setNumber(increment(number))
    }
  }

  function decrement (n){
    return n-1
  }
  function precident () {
    if (number> 1){
        console.log(number)
        paginate(decrement(number))
        setNumber(decrement(number))
    }
  }

  function one (n){
    return 1
  }

  function two (n){
    return 2
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
                <a onClick={() => {setNumber(one(number)); paginate(one(number))}} href='#' className='page-link' style={{color: "#7B170F"}}>
                {(pageNumbers.length-(pageNumbers.length-1))}
                </a>
            </li>
            <li  className='page-item'>
                <a onClick={() => {setNumber(two(number)); paginate(two(number))}} href='#' className='page-link' style={{color: "#7B170F"}}>
                {(pageNumbers.length-(pageNumbers.length-2))}
                </a>
            </li>
            <li  className='page-item'>
                <a  href='#' className='page-link' style={{color: "#7B170F"}}>
                ......
                </a>
            </li>
            <li className='page-item'>
                <a  onClick={()=> suivant()} href='#' className='page-link' style={{color: "#7B170F"}}>
                  suivant
                </a>
             </li>
        
      
      </ul>
    </nav>
  );
};

export default Pagination;
