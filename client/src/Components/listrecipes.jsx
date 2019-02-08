import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
// import sortBy from 'sort-by';
import { Link } from "react-router-dom";

class ListRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };
  }

  updateSearch = query => {
    this.setState({ query: query.trim() });
  };

  clearSearch = () => {
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    const { data } = this.props;

    let searchRecipes;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      searchRecipes = data.filter(recipe => match.test(recipe.title));
    } else {
      searchRecipes = data;
    }

    return (
      <div className="list-recipes">
        <div className="list-recipe-top">
          <input
            className="search-recipes"
            type="text"
            placeholder="  seach recipes"
            value={query}
            onChange={event => this.updateSearch(event.target.value)}
          />

          <Link href="#new" to="/create" className="new-recipe">
            new
          </Link>
        </div>
        {searchRecipes.length !== data.length && (
          <div className="show-recipes">
            <span>
              Showing {searchRecipes.length} of {data.length} recipes.
            </span>
            <br />
            <button onClick={this.clearSearch}>See all</button>
          </div>
        )}

        <ul className="recipe-list">
          {data.length <= 0
            ? "No Recipes yet..."
            : data.map(dat => (
                <li className="recipe-list-item" key={Math.random()}>
                  {/* <span style={{ color: "gray" }}> id: </span> {dat.id}{" "} */}
                  <div className="recipe-details">
                    <br />
                    <h2 className="recipe-title">{dat.title}</h2>

                    <div className="recipe-body">
                      <div className="ingredients">
                        <span className="ingre-name"> Ingredient: </span>
                        <div>{dat.ingredient}</div>
                      </div>
                      <div className="description">
                        <span className="descr-name"> Description: </span>
                        <div className="description-box">{dat.description}</div>
                      </div>
                      <br />
                    </div>
                    <button className="recipe-remove">Remove</button>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default ListRecipes;
