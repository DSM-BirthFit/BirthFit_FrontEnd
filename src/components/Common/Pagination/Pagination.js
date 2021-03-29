import React from 'react';
import * as PaginationStyle from '../../../assets/styles/Common/Pagination/Pagination';

const Pagination = ({ pageNumbers, paginate, currentPage, maxPageNumLimit, minPageNumLimit }) => {

  const pagination = pageNumbers.map((number) => {
    if(number < maxPageNumLimit+1 && number > minPageNumLimit){
        return(
            <PaginationStyle.PageLi currentPage={currentPage} number={number} key={number} onClick={() => paginate(number)}>
                <PaginationStyle.PageSpan>
                {number}
                </PaginationStyle.PageSpan>
            </PaginationStyle.PageLi>
        );
    } else {
        return null;
    }
  });
  
  return pagination;
};

export default Pagination;