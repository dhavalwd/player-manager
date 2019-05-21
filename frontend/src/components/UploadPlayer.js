import React from "react";

class UploadPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmitPlayer = this.onSubmitPlayer.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmitPlayer(e) {
    e.preventDefault();

    console.log("e inside onSubmit", e);
  }

  onInputChange(e) {
    e.preventDefault();

    console.log("e inside input change", e);
  }

  render() {
    return (
      <div className="UploadPlayer">
        <div className="container">
          <h2>Upload Athletes</h2>
          <form onSubmit={this.onSubmitPlayer}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">File</label>
              <input
                type="file"
                id="playerData"
                name="playerData"
                accept="image/png, image/jpeg"
                onChange={this.onInputChange}
              />
              <label htmlFor="playerData">Browse:</label>
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadPlayer;
