import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
// import sortBy from 'sort-by';
import { Link } from 'react-router-dom';

class ListRecipes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // itemArray: [],
      query: ''
    }
  }

  updateSearch = (query) => {
    this.setState({query: query.trim()})
  }

  clearSearch = () => {
    this.setState({ query: '' })
  }
  
  render() {

    const { itemArray, onDeleteRecipe } = this.props;
    const { query } = this.state;

    let searchRecipes;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i' )
      searchRecipes = itemArray.filter((recipe) => match.test(recipe.title))
    } else {
      searchRecipes = itemArray;
    }


    return (
      <div className="list-recipes">
        <div className="list-recipe-top">
          <input className="search-recipes" 
          type="text" 
          placeholder="  seach recipes"
          value={query}
          onChange={(event) => this.updateSearch(event.target.value)}>

          </input>

            <Link href="#new"
              to='/create'
              className="new-recipe">new</Link>

            </div>
          {searchRecipes.length !== itemArray.length && (
            <div className="show-recipes">
            <span>Showing {searchRecipes.length} of {itemArray.length} recipes.</span><br></br>
            <button onClick={this.clearSearch}>See all</button>
            </div>
          )}

        <ul className="recipe-list">
          {searchRecipes.map((item) => {
            return (
              <li key={Math.random()} className="recipe-list-item">
                <div className="recipe-details">
                  <div className='recipe-avatar' style={{
                    backgroundImage: `url(${item.avatarURL})`
                    }}>
                    <h2 className='recipe-title'>{item.title}</h2>
                    </div>
                    <div className='recipe-body'>

                      <div className='ingredients'>
                      <div className='ingre-name'>Ingredients: </div><br></br>
                        <p>{item.ingredient1}</p>
                        <p>{item.ingredient2}</p>
                        <p>{item.ingredient3}</p>
                        <p>{item.ingredient4}</p>
                        <p>{item.ingredient5}</p>

                      </div>
                      <div className='description'>
                      <div className='descr-name'>Description: </div><br></br>
                        <div className='description-box'>{item.description}</div>
                      </div>
                      <div>
                        <button onClick={() => onDeleteRecipe(item)} className="recipe-remove" >Remove</button>
                      </div>
                    </div>
                  
                </div>
              </li>
            )
          })}
        </ul>
      
      </div>
    );
  }
}

export default ListRecipes;