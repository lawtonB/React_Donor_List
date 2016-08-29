import React, { Component } from 'react';
import BTCSorter from './BTCSorter';

const API_INDV = 'http://54.213.83.132/hackoregon/http/oregon_individual_contributors/';

const API_BIZ  =
  'http://54.213.83.132/hackoregon/http/oregon_business_contributors/';

export default class App extends Component {

  state = {
    ind: {
      items: [],
      sortOrder: 'desc',
    },
    biz: {
      items: [],
      sortOrder: 'desc',
    },
  };

  render() {
    const sorterWrapper = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    };
    const sorterStyle = {
      border: '1px solid #ddd',
      width: '49%',
      padding: 5,
    };

    const onRefreshForKey = key => async url => {
      let response = await fetch(url);
      let data = await response.json();
      this.setState({
        [key]: { ...this.state[key],
        items: data } });
    };

    const onUpdateSortForKey = key => order => {
      this.setState({
        [key]: { ...this.state[key],
        sortOrder: order } });
    };
    return (
      <div className='container'>
        <h1>BTC Data Viewer</h1>
        <div style={sorterWrapper}>
          <div style={sorterStyle}>
            <h2>Individuals</h2>

            <BTCSorter
              items={this.state.ind.items}
              sortOrder={this.state.ind.sortOrder}
              apiUrl={API_INDV}
              onRefresh={onRefreshForKey('ind')}
              onUpdateSortOrder={onUpdateSortForKey('ind')}
              />

          </div>
          <div style={sorterStyle}>
            <h2>Businesses</h2>

            <BTCSorter
              items={this.state.biz.items}
              sortOrder={this.state.biz.sortOrder}
              apiUrl={API_BIZ}
              onRefresh={onRefreshForKey('biz')}
              onUpdateSortOrder={onUpdateSortForKey('biz')}
              />
          </div>
        </div>
      </div>
    );
  }
}
