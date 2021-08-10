import React from 'react';

const Search = props => {
    return(
        <section id="search" >
            <div className="input-group mb-3">
              <button 
                className="btn btn-primary" 
                type="button" 
                id="button-addon1"
                onClick={props.userSearch}
                >
                  Search
              </button>
              <button 
                className="btn btn-secondary" 
                type="button" 
                id="button-addon1"
                onClick={props.clearSearch}
                >
                  Clear
              </button>

              <input 
                type="text" 
                name="name"
                className="form-control" 
                placeholder="May the force be with you" aria-label="Example text with button addon" aria-describedby="button-addon1"
                value={props.value}
                onChange={props.handleChange}
              >  
              </input>
            </div>
        </section>
    )
}
export default Search;