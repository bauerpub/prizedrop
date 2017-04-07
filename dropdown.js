import React from "react";
import ReactDOM from "react-dom";

class PrizeDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {drawings: null};
  }

  componentDidMount() {
    this.getDrawings();
  }

  getDrawings() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {message: "getDrawings"}, (drawings) => {
        this.setState({"drawings": drawings});
      });
    });
  }

  renderDrawings() {
    switch (this.state.drawings) {
      case null:
      case undefined:
        return <div>Loading...</div>;
    }

    return (
      this.state.drawings.map((drawing) => (
        <li key={drawing.id}>
          <img src={drawing.photo_url} style={{height: "90px", width: "120px"}} />
          <a href={drawing.url}>{drawing.title}</a>
        </li>
      ))
    );
  }

  render() {
    return (
      <ul>
        {this.renderDrawings()}
      </ul>
    );
  }
}

ReactDOM.render(<PrizeDrop />, document.getElementById("sweep"));
