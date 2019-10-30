import React from 'react';

import { Namicorn } from 'namicorn'
const namicorn = new Namicorn()

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      result: '',
      valid: false,
      errorMessages: {
        UNREGISTERED_DOMAIN: 'this domain is unregistered.',
        INVALID_DOMAIN: 'this is not a valid domain.',
        NO_ADDRESSES_FOUND: 'this domain has no addresses associated with it.'
      }
    }
  }

  S_handleInput = (event) => { // state manipulation function
    this.setState({
      search: event.target.value
    })
  }

  S_setDefault = (event) => {
    this.setState({
      search: 'mcafee2020.zil'
    })
  }

  S_clearSearch = () =>{
    this.setState({
      result: '',
      valid: false
    })
  }

  R_handleSubmit = async (event) => { // request handler
    let valid;
    let data;

    event.preventDefault();
    this.S_clearSearch()
    valid = await namicorn.isSupportedDomain(this.state.search)
    data = await namicorn.resolve(this.state.search)

    if (valid === false) {
      this.setState({ result: this.state.errorMessages.INVALID_DOMAIN })
    }
    else if (valid === true && data.meta.owner === null) {
      this.setState({ result: this.state.errorMessages.UNREGISTERED_DOMAIN })
    }
    else {
      if (Object.keys(data.addresses).length === 0) {
        this.setState({ result: this.state.errorMessages.NO_ADDRESSES_FOUND })
      }
      else {
        this.setState({ result: data, valid: true })
      }
    }
  }

  r_buildList = (content) => { // renderer helper function
    let r = this.state.result

    if (this.state.valid === true) {
      content = Object.keys(r.addresses).map((key, index) => {
        return (<li key={index} >{key}: {r.addresses[key]}</li>)
      })
    }
    else {
      content = r;
    }
    return content;
  }

  render() {
    let content = ''
    if (this.state.result !== '') {
      content = this.r_buildList(content)
    }

    return (
      <div>
        <input type="text" onChange={this.S_handleInput} value={this.state.search} placeholder="enter address" />
        <button onClick={this.R_handleSubmit}>submit</button>
        <button onClick={this.S_setDefault}>mcafee</button>
          {content}
      </div>
    )
  }
}

export default App;
