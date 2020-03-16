import React from 'react';

const range = (start, end) => {
  let result = []
  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}

const computePagination = (page, pages) => {
  if (pages <= 10) {
    return range(1, pages + 1);
  }

  if (page < 6) {
    return range(1, 11);
  }

  if ((page + 5) > pages) {
    return range(pages - 9, pages + 1);
  }

  return range(page - 4, page + 6);
}

const Pagination = ({page, pages, onClick}) => (
  <nav className="pagination is-centered" role="navigation">

    {page > 1 ? 
      <a 
        className="pagination-previous" 
        onClick={() => onClick && onClick(page - 1)}>
        Previous
      </a> 
      : null
    }

    {page < pages ? 
      <a 
        className="pagination-next"
        onClick={() => onClick && onClick(page + 1)}>
        Next
      </a> : null
    }

    <ul className="pagination-list">

      <li>
        <a 
          className="pagination-link"
          onClick={() => onClick && onClick(1)}>
          First
        </a>
      </li>

      {computePagination(page, pages).map(i => (
        <li key={i}>
          <a 
            className={`pagination-link ${page === i ? 'is-current' : ''}`}
            onClick={() => onClick && onClick(i)}>
            {i}
          </a>
        </li>
      ))}

      <li>
        <a 
          className="pagination-link"
          onClick={() => onClick && onClick(pages)}>
          Last
        </a>
      </li>

    </ul>

  </nav>
);

export default Pagination;
