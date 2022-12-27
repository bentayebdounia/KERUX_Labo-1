import React  , {useState,useEffect} from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [number , setNumber] = useState(1)
  const [updatenumber , setUpdatenumber] = useState()

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() =>{
    setUpdatenumber(number)
  })
  function suivant () {
    if (number< pageNumbers.length+1){
        
        setNumber(number+1)
        console.log(updatenumber)
        paginate(updatenumber)
    }
  }

  function precident () {
    if (number> 0){
        console.log(updatenumber)
        
        setNumber(number-1)
        paginate(updatenumber)
    }
  }

  return (
    <nav className='d-flex justify-content-center'>
      <ul className='pagination'>
       


            {number>0 && <li className='page-item'>
                <a onClick={precident} href='#' className='page-link' style={{color: "#7B170F"}}>
                    precident
                    </a>
                </li>
             }
 
            <li className='page-item'>
                <a onClick={() =>{setNumber(1); paginate(updatenumber); }} href='#' className='page-link' style={{color: "#7B170F"}}>
                {(pageNumbers.length-(pageNumbers.length-1))}
                </a>
            </li>
            <li  className='page-item'>
                <a onClick={() => {setNumber(2); paginate(updatenumber)}} href='#' className='page-link' style={{color: "#7B170F"}}>
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
