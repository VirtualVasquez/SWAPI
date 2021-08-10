import React from 'react';

const Pagination = props => {

      const createButtons = () =>{
        const buttons = [];
        for (let pageNum =1; pageNum <= 9; pageNum++){
          const button = (<li
            key={pageNum} 
            className="page-item page-link"
            onClick={() => props.pageSelect(pageNum)}
          >
            {pageNum}
          </li>);
          buttons.push(button);
        }
        return buttons
      }

    const displayButtons = createButtons();

    const decrementPage = () =>{
      props.prevPage(props.currentPage - 1);
    }
    const incrementPage = () =>{
      props.nextPage(props.currentPage + 1);
    }

    return(
        <section id="pagination">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li 
                className="page-item page-link"
                onClick={decrementPage}
              >
                Previous
              </li>
              {displayButtons}
              <li 
                className="page-item page-link"
                onClick={incrementPage}
                >
                  Next
              </li>
            </ul>
          </nav>
        </section>
    )

}

export default Pagination;