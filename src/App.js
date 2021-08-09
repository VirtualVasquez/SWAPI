import './App.css';
import axios from 'axios';
import React from 'react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Table from './components/Table.js';
import Pagination from './components/Pagination.js';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search:'',
      results:["placeholder"],
      currentIndex: 0,
      peopleCall:[
        'https://swapi.dev/api/people/?page=1',
        'https://swapi.dev/api/people/?page=2',
        'https://swapi.dev/api/people/?page=3',
        'https://swapi.dev/api/people/?page=4',
        'https://swapi.dev/api/people/?page=5',
        'https://swapi.dev/api/people/?page=6',
        'https://swapi.dev/api/people/?page=7',
        'https://swapi.dev/api/people/?page=8',
        'https://swapi.dev/api/people/?page=9',
      ],
      api:"https://swapi.dev/api/people/?page=1",
      error: "These aren't the droids you're looking for. Or anyone you are looking for, really. Try again."
    }
    this.getPlanet = this.getPlanet.bind(this);
    this.getSpecies = this.getSpecies.bind(this);
    this.setHomeWorldAndSpecies = this.setHomeWorldAndSpecies.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.userSearch = this.userSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

  }

  handleChange(event){
    this.setState({search:event.target.value})
  }
  clearSearch(){
    this.setState({
      search:'',
      api:"https://swapi.dev/api/people/?page=1",
      currentIndex: 0,
    })
    if(this.state.api !== "https://swapi.dev/api/people/?page=1" || this.state.results.length === 0)
    this.getAPI(this.state.api);
  }

  userSearch(){
    let query = "https://swapi.dev/api/people/?search=" + this.state.search
    this.getAPI(query);
  }

  getPlanet = async(character) =>{
    // const planet = String(character.homeworld).replace("http", "https");
    const planet = String(character.homeworld);
    const response = await axios.get(planet);
    return response.data.name
  }
  getSpecies = async (character) =>{
    if(character.species.length === 0){
      return "Human";
    } else {
      //const response = await axios.get(String(character.species).replace("http", "https"));
      const response = await axios.get(String(character.species));
      return response.data.name
    }
  }
  setHomeWorldAndSpecies = async (characters) => {
    if (characters.length === 0){
      this.setState({results:[]})
    }
    for (const character of characters) {
      character.homeworld = await this.getPlanet(character);
      character.species = await this.getSpecies(character);

    }
    this.setState({
      results:[...characters]
    })
  }
  getAPI = (url) => {
    axios.get(url)
    .then((response) => this.setHomeWorldAndSpecies(response.data.results))
  }

  prevPage = () =>{
    if(this.state.currentIndex > 0 && this.state.results.length > 0){
      this.setState({
        currentIndex: this.state.currentIndex - 1
      })
      this.getAPI(this.state.peopleCall[this.state.currentIndex])
    }
  }

  pageSelect = (url, number) => {
     this.setState({
       currentIndex: number
     })
     this.getAPI(url)
  }

  nextPage = (number) =>{
    if(this.state.currentIndex < 8 && this.state.results.length > 0){
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
      this.getAPI(this.state.peopleCall[this.state.currentIndex])
    }
  }

  
  componentDidMount() {
    this.getAPI(this.state.api)
  }

  render(){

    return (
      <div className="container">
        <Header/>
        <Search 
          value={this.state.search}
          userSearch={this.userSearch}
          clearSearch={this.clearSearch}
          handleChange={this.handleChange}
        />
        <Table
          results={this.state.results}
        />          
        <p>{this.state.results.length === 0  ? this.state.error : ''}</p>
        <Pagination 
          prevPage = {this.prevPage}
          results = {this.state.results}
          peopleCall = {this.state.peopleCall}
          pageSelect = {this.pageSelect}
          nextPage = {this.nextPage}
        />
      </div>
    );
  }

}


export default App;
