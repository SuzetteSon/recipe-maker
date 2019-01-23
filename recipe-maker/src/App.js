import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import logo from './sloth.png';
import ListRecipes from './Components/listrecipes.js'
import NewRecipe from './Components/newrecipe.js';
import serializeForm from 'form-serialize';

class App extends Component {

  constructor() {
    super()
    this.state = {
     itemArray: [
       {
         avatarURL: "/zoodles.png", 
         title: "Zoodles", 
         ingredient1: "200g Zuchinni noodles", 
         ingredient2: "150ml Italian tomato sauce ", 
         ingredient3: "50g grated Parmasan", 
         ingredient4: "a pinch of salt", 
         description: "boil the zoodles for a few minutes until el dente, add sauce, cheese and salt.", 
         id: 1
        },
         {
          avatarURL: "/burger.jpg", 
          title: "Burgers", 
          ingredient1: "4 x 100g Beef patties", 
          ingredient2: "lettuce for garnish", 
          ingredient3: "a few cheese slices", 
          ingredient4: "sauce of your choice", 
          description: "cook patties, assemble burger, enjoy.", 
          id: 2
        }
        ]
    }
  }

  removeRecipe = (recipe) => {
    this.setState((state) => ({
      itemArray: state.itemArray.filter((i) => i.id !== recipe.id )
    }))
  }
  
    addRecipe(recipe) {
        this.setState(state => ({
          itemArray: state.itemArray.concat([ recipe ])
        }))
    }

  submitRecipe = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    values.id = Math.random()
    // let joined = ;
    if (this.addRecipe)
    this.setState({ itemArray: this.state.itemArray.concat(values) })
    console.log(this.state.itemArray.concat(values));
    e.target.reset();
  }

  render() {
    return (
      <div>
            <header className="App-header">
            <img src={logo} className="sloth-logo" alt="logo"/>
              The Lazy Recipe Maker
            </header>
          <Route exact path="/" render={() => (
            <ListRecipes
                itemArray={this.state.itemArray}
                onDeleteRecipe={this.removeRecipe}
               />
          )} />

          <Route path="/create"  render={({ history }) => (
              <NewRecipe
                itemArray={this.state.itemArray}
                onSubmitRecipe={this.submitRecipe}
                onAddRecipe={(recipe) => {
                  this.addRecipe(recipe)
                  history.push('/')
                }
                }                  
              />
          )}/>

      </div>
    );
  }
}

export default App;
