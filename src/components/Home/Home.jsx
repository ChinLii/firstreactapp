import React, { Component } from "react";
import NavBar from "../navbar";
import AllWebStatus from "./allWebStatus";

class Home extends Component {
  state = {
    webs: [
      {
        id: 1,
        url: "https://tnk.auth0.com/.well-known/openid-configuration",
        status: null
      },
      {
        id: 2,
        url: "https://waylar-api-dot-waylar-gateway.appspot.com/ ",
        status: null
      },
      { id: 3, url: "https://flow-api.waylar.net/", status: null },
      { id: 4, url: "https://office-api.waylar.net/", status: null },
      { id: 5, url: "https://fbackend1.waylar.net/api/devices", status: null },
      { id: 6, url: "https://realtime.waylar.net/socket.io/", status: null }
    ]
  };

  // shouldComponentUpdate() {}
  componentWillReceiveProps() {}

  setStatus = status => {
    this.setState({ webs: status });
  };

  handleCheckingStatus = () => {
    let newWebs = [];
    for (let index = 0; index < this.state.webs.length; index++) {
      fetch(this.state.webs[index].url)
        .then(res => {
          console.log(res.time);
          const web = { id: index, url: res.url, status: res.status };
          newWebs = newWebs.concat(web);
          this.setStatus(newWebs);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <AllWebStatus
            webs={this.state.webs}
            onChecking={this.handleCheckingStatus}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
