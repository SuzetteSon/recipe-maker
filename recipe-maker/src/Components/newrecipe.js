import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput'


class NewRecipe extends Component {

  state = {
    itemArray: this.props.itemArray,
  }


  // newRecipe = (event) => {
  //   console.log('clicked');
  //   const item = {};
  //   item.title = 'Beef Lasagna';
  //   item.text = 'Delicious';
  //   console.log(item)
  //   // item.push({ title, text })
  //   // this.setState({itemArray: item})
  // }

  render() {
    return(
      <div>
      <div className='back-button'>
        <Link className='close-create-recipe' to='/'>back</Link>
        </div>
        <div>
        <form onSubmit={this.props.onSubmitRecipe} className='create-recipe-form'>
          <ImageInput
            className='create-recipe-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-recipe-details'>

            <input type='text' name='title' placeholder='Title'/>
            <div className='ing'>Ingredients:</div>
            <input type='text' name='ingredient1' placeholder='Ingredient 1'/>
            <input type='text' name='ingredient2' placeholder='Ingredient 2'/>
            <input type='text' name='ingredient3' placeholder='Ingredient 3'/>
            <input type='text' name='ingredient4' placeholder='Ingredient 4'/>
            <div className='des'>Description:</div>
            <input type='text' name='description' placeholder='Description'/>
            <button >Add Recipe</button>
          </div>
        </form>
      </div>


      </div>
    )
  }
}

export default NewRecipe;