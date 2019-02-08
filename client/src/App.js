import React, {
  Component
} from "react";
import {
  Route
} from "react-router-dom";
import "./App.css";
import logo from "./sloth.png";
import ListRecipes from "./Components/listrecipes.jsx";
import NewRecipe from "./Components/newrecipe.jsx";
// import serializeForm from "form-serialize";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };
  }
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({
        intervalIsSet: interval
      });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({
        intervalIsSet: null
      });
    }
  }
  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({
        data: res.data
      }));
    // .then(res => console.log(res));
  };

  // removeRecipe = recipe => {
  //   this.setState(state => ({
  //     itemArray: state.itemArray.filter(i => i.id !== recipe.id)
  //   }));
  // };

  // addRecipe(recipe) {
  //   this.setState(state => ({
  //     itemArray: state.itemArray.concat([recipe])
  //   }));
  // }

  // submitRecipe = e => {
  //   e.preventDefault();
  //   const values = serializeForm(e.target, { hash: true });

  //   values.id = Math.random();
  //   // let joined = ;
  //   if (this.addRecipe)
  //     this.setState({ itemArray: this.state.itemArray.concat(values) });
  //   console.log(this.state.itemArray.concat(values));
  //   e.target.reset();
  // };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: {
        message: updateToApply
      }
    });
  };

  render() {
    //const { data } = this.state;
    return ( <
      div >
      <
      header className = "App-header" >
      <
      img src = {
        logo
      }
      className = "sloth-logo"
      alt = "logo" / >
      The Lazy Recipe Maker <
      /header> <
      Route exact path = "/"
      render = {
        () => ( <
          ListRecipes data = {
            this.state.data
          }
          onDeleteRecipe = {
            this.deleteFromDB
          }
          />
        )
      }
      />

      <
      Route path = "/create"
      render = {
        ({
          history
        }) => ( <
          NewRecipe data = {
            this.state.data
          }
          putDataToDB = {
            this.putDataToDB
          }
          onAddRecipe = {
            recipe => {
              this.addRecipe(recipe);
              history.push("/");
            }
          }
          />
        )
      }
      /> <
      /div>
    );
  }
}

export default App;