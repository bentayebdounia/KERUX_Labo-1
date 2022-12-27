import React  , {useState} from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [number , setNumber] = useState(1)

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  function suivant () {
    if (number< pageNumbers.length+1){
        console.log(number)
        setNumber(number+1)
        paginate(number)
    }
  }

  function precident () {
    if (number> 0){
        console.log(number)
        
        setNumber(number-1)
        paginate(number)
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
                <a onClick={() =>{setNumber(1); paginate(number); }} href='#' className='page-link' style={{color: "#7B170F"}}>
                {(pageNumbers.length-(pageNumbers.length-1))}
                </a>
            </li>
            <li  className='page-item'>
                <a onClick={() => {setNumber(2); paginate(number)}} href='#' className='page-link' style={{color: "#7B170F"}}>
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
