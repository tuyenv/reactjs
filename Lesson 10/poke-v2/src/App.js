import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokemonIndexList from './components/PokemonIndexList';
import PokemonModal from './components/PokemonModal';
import PokemonDetail from './components/PokemonDetail';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 0,
      totalPages: 0,
      count: 0,
      loaded: false,
      showModal: false,
      selectedPokemon: null,
      displayHome: "",
      displayDetail: "displayNone"
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleClickInfo = this.handleClickInfo.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  loadPokemon(url) {
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
        console.log(json);
        let pages = Math.round(json.count / this.state.limit);

        this.setState({
          pokemon: json.results,
          totalPages: pages,
          count: json.count,
          loaded: true
        });
      }).catch(err => {
        console.log(err)
      })
  }

  componentWillMount() {
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`);
  }

  handlePaginationSelect(selectedPage) {
    console.log(selectedPage);
    let offset = this.state.limit * selectedPage;
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
    this.setState({
      activePage: selectedPage
    });
  }

  handleLimitChange(event) {
    console.log(event.target.innerHTML);
    this.setState({
      limit: +event.target.innerHTML || this.state.count,
      activePage: 1
    }, () => {
      this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`);
    })
  }

  handleModalOpen(pokemon) {
    if (pokemon.url !== undefined) {
      fetch(`${pokemon.url}`)
        .then(response => {
          return response.json()
        }).then(json => {
          this.setState({
            selectedPokemon: json,
            showModal: true
          })
        }).catch(ex => {
          console.log('parsing failed', ex);
        })
    }
  }

  handleModalClose() {
    this.setState({
      showModal: false
    });
  }

  handleClickInfo(pokemon) {
    if (pokemon.url !== undefined) {
      fetch(`${pokemon.url}`)
        .then(response => {
          return response.json()
        }).then(json => {
          this.setState({
            displayHome: "displayNone",
            displayDetail: "",
            selectedPokemon: json
          })
        }).catch(ex => {
          console.log('parsing failed', ex);
        })
    }
  }

  handleClickBack() {
    this.setState({
      displayHome: "",
      displayDetail: "displayNone"
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pokemon Dashboard</h2>
        </div>

        <div className={this.state.displayHome}>
          {this.state.loaded ? null : "Loading..."}
          <PokemonIndexList
            display={this.state.loaded}
            options={[10,50,100,200]}
            selectedValue={this.state.limit}
            allValue={this.state.count}
            onOptionSelected={this.handleLimitChange}
            listOfPokemon={this.state.pokemon}
            bsSize="small"
            items={this.state.totalPages}
            activePage={this.state.activePage}
            onSelect={this.handlePaginationSelect}
            totalPages={this.state.totalPages}
            openModal={this.handleModalOpen}
            openInfo={this.handleClickInfo}
            />
            <PokemonModal closeModal={this.handleModalClose} showModal={this.state.showModal} pokemon={this.state.selectedPokemon} />
        </div>

        <div className={this.state.displayDetail}>
          <PokemonDetail pokemon={this.state.selectedPokemon} clickBack={this.handleClickBack} />
        </div>
      </div>
    );
  }
}

export default App;
