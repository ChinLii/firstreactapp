import React, { Component } from "react";
import NavBar from "../navbar";
import AllWebTime from "./allWebTime";

class Time extends Component {
  state = {
    webs: [
      {
        id: 1,
        url: "https://tnk.auth0.com/.well-known/openid-configuration",
        time: null
      },
      {
        id: 2,
        url: "https://waylar-api-dot-waylar-gateway.appspot.com/ ",
        time: null
      },
      { id: 3, url: "https://flow-api.waylar.net/", time: null },
      { id: 4, url: "https://office-api.waylar.net/", time: null },
      { id: 5, url: "https://fbackend1.waylar.net/api/devices", time: null },
      { id: 6, url: "https://realtime.waylar.net/socket.io/", time: null }
    ]
  };

  // shouldComponentUpdate() {}
  componentWillReceiveProps() {}

  setStatus = status => {
    this.setState({ webs: status });
  };

  handleCheckingTime = () => {
    let newWebs = [];
    for (let index = 0; index < this.state.webs.length; index++) {
      let start_time = new Date().getTime();
      fetch(this.state.webs[index].url)
        .then(res => {
          let timeresponse = new Date().getTime() - start_time;
          const web = { id: index, url: res.url, time: timeresponse };
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
          <AllWebTime
            webs={this.state.webs}
            onChecking={this.handleCheckingTime}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Time;
