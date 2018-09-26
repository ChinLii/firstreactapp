import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import AllWebStatus from "./components/allWebStatus";

class App extends Component {
  state = {
    webs: [
      {
        id: 1,
        url: "https://jsonplaceholder.typicode.com/posts/42",
        status: null
      },
      {
        id: 2,
        url: "https://jsonplaceholder.typicode.com/posts/",
        status: null
      }
    ]
  };
  // shouldComponentUpdate() {}
  componentWillReceiveProps() {}

  handleCheckingStatus = () => {
    let newWebs = { ...this.state.webs };
    newWebs = this.state.webs.map(web => {
      fetch(web.url)
        .then(function(response) {
          web.status = response.status;
        })
        .catch(error => {
          console.log(error);
        });
      return web;
    });
    this.setState({ webs: newWebs });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <AllWebStatus
            /* Passing value to components in props state  */
            webs={this.state.webs}
            onChecking={this.handleCheckingStatus}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
