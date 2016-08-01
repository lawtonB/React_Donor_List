import React, { Component } from 'react';

const BTC_URL = 'http://54.213.83.132/hackoregon/http/oregon_individual_contributors/5/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      sortOrder: 'asc',
      total: '',
    };
  }
//async return a promise
//await
  async componentWillMount() {
    let response = await fetch(BTC_URL);
    let data = await response.json();
    // data.sort((a, b) => this.props.sortOrder ===  'abc');
    this.setState({
      items: data,
      total: ''
    });
  }
  onKeyDownHandler(e) {
    switch (e.key) {
      case 'enter': {
        if (e.target.value === '') {
          return;
        }
        const newTotal = e.target.value;
        this.setState({
          total: newTotal,
        });
      }
    }
  }

//pass state items: [] from parent App to child BTCSorter: items= {this.state.items} passes prop items to BTCSorter

  render() {
    console.log('total is ' + this.state.total);
    return (
      <div>
      <input
      type='text'
      placeholder='enter number' value={this.state.total}
      onKeyDown={this.onKeyDownHandler.bind(this)}
      onChange={e => this.setState({ total: e.target.value })}>
      </input>
        <div className='container'>
          <BTCSorter items={this.state.items}/>
        </div>
      </div>
    );
  }
}

class BTCSorter extends Component {

  render() {
    const myItems = this.props.items.map((item, idx) => {
      return (
        <tr key={item.sum + idx}>
          <td>
            {item.contributor_payee}
          </td>
          <td>
            {item.sum + ' $'}
          </td>
        </tr>
      );
    });

    return (
      <div>
      <h4>Donator Name</h4>
      <table className='table'><tbody>{myItems}</tbody>
      </table>
      </div>
    );
  }
}
