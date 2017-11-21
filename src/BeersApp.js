import React, { Component } from 'react';
import {connect} from "react-redux";
import './BeersApp.css';
import {Beers} from "./components/Beers";
import {Search} from "./components/Search";
import {searchBeers, cancelSearch} from "./actions/beersActions";

class BeersApp extends Component {
  handleBeerSearch = (query) => {
    this.props.searchBeers(query);
  };
  render() {
      // console.log('BeersApp', this.props);
    return (
      <div className="BeersApp">
        <Search
          defaultValue={''}
          onChange={this.handleBeerSearch}
          messages={this.props.messages}
          loading={this.props.loading}
          cancel={this.props.cancelSearch}
        />
        <Beers beers={this.props.beers} loading={this.props.loading}/>
      </div>
    );
  }
}
function mapState(state) {
    return state.beersReducer;
}
export default connect(mapState, {searchBeers, cancelSearch})(BeersApp);
