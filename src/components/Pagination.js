import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipses = '...';
    
    // Handle pagination logic
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    } else {
      // If current page is less than 4
      if (currentPage < 4) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`page-button ${currentPage === i ? 'active' : ''}`}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="ellipsis1">{ellipses}</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>
        );
      }
      // If current page is between 4 and totalPages - 3
      else if (currentPage >= 4 && currentPage <= totalPages - 3) {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={`page-button ${currentPage === 1 ? 'active' : ''}`}
          >
            {1}
          </button>
        );
        pageNumbers.push(<span key="ellipsis1">{ellipses}</span>);
        
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`page-button ${currentPage === i ? 'active' : ''}`}
            >
              {i}
            </button>
          );
        }
        
        pageNumbers.push(<span key="ellipsis2">{ellipses}</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>
        );
      }
      // If current page is greater than totalPages - 3
      else {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={`page-button ${currentPage === 1 ? 'active' : ''}`}
          >
            {1}
          </button>
        );
        pageNumbers.push(<span key="ellipsis1">{ellipses}</span>);
        
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`page-button ${currentPage === i ? 'active' : ''}`}
            >
              {i}
            </button>
          );
        }
      }
      
      // Previous and Next buttons
      pageNumbers.unshift(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev-next-button"
        >
          Previous
        </button>
      );
      pageNumbers.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="prev-next-button"
        >
          Next
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
