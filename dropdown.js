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
      chrome.tabs.sendMessage(tabs[0].id, "getDrawings", (drawings) => {
        this.setState({"drawings": drawings});
      });
    });
  }

  renderDrawings() {
    if (this.state.drawings === null || this.state.drawings === undefined) {
      return <div>Nothing yet</div>;
    }

    return (
      this.state.drawings.map((drawing) => (
        <li>
          <img src={drawing.photo_url} />
          <a href={drawing.url}>{drawing.title}</a>
        </li>
      ))
    );
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderDrawings()}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<PrizeDrop />, document.getElementById("sweep"));
