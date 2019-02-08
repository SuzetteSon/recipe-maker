import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import axios from "axios";

class NewRecipe extends Component {
  state = {
    // data: [],
    id: 0,
    title: null,
    ingredient: null,
    description: null
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (title, ingredient, description) => {
    let currentIds = this.props.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      title: title,
      ingredient: ingredient,
      description: description
    });
  };

  render() {
    // const { data } = this.props;
    // if (this.state.ingredients !== null) {
    //   console.log(this.state.ingredients);
    //   console.log(this.state.ingredients[0]);
    // }
    return (
      <div>
        <div className="back-button">
          <Link className="close-create-recipe" to="/">
            back
          </Link>
        </div>
        <div>
          <form className="create-recipe-form">
            <ImageInput
              className="create-recipe-avatar-input"
              name="avatarURL"
              maxHeight={64}
            />

            <div>
              <div className="create-recipe-details">
                <input
                  type="text"
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                  placeholder="Title"
                  style={{ width: "200px" }}
                />
                <div className="ing">Ingredients:</div>
                <input
                  type="text"
                  onChange={e => {
                    this.setState({ ingredient: e.target.value });
                    
                  }}
                  placeholder="Ingredient"
                  style={{ width: "200px" }}
                />

                <div className="des">Description:</div>
                <input
                  type="text"
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                  placeholder="Description"
                  style={{ width: "200px" }}
                />



                <button
                  onClick={() =>
                    this.putDataToDB(
                      this.state.title,
                      this.state.ingredient,
                      this.state.description
                    )
                  }
                >
                  Add Recipe
                </button>
              </div>

              <div>
                <input
                  type="text"
                  style={{ width: "200px" }}
                  onChange={e => this.setState({ idToDelete: e.target.value })}
                  placeholder="put id of item to delete here"
                />
                <button
                  onClick={() => this.deleteFromDB(this.state.idToDelete)}
                >
                  DELETE
                </button>
              </div>

              <div>
                <input
                  type="text"
                  style={{ width: "200px" }}
                  onChange={e => this.setState({ idToUpdate: e.target.value })}
                  placeholder="id of item to update here"
                />
                <input
                  type="text"
                  style={{ width: "200px" }}
                  onChange={e =>
                    this.setState({ updateToApply: e.target.value })
                  }
                  placeholder="put new value of the item here"
                />
                <button
                  onClick={() =>
                    this.updateDB(
                      this.state.idToUpdate,
                      this.state.updateToApply
                    )
                  }
                >
                  UPDATE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewRecipe;
