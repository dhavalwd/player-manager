import React from "react";
import axios from "axios";
import $ from "jquery";

class UploadPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmitPlayer = this.onSubmitPlayer.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmitPlayer(e) {
    e.preventDefault();

    // Check if file is there to upload
    let $input = $("input[name=playerData]");
    let $files = $input[0].files;

    if ($files.length === 0) {
      this.showError($input.closest(".form-group"), "File is required");
      return;
    }

    let formData = new FormData();

    formData.append("File", $files[0]);

    axios
      .post(
        "http://localhost/player-manager/backend/api/players/upload",
        formData
      )
      .then(res => {
        if (res.data) {
          console.log("Players uploaded successfully!");
          $(".form-feedback");
          $(".form-feedback span")
            .addClass("is-success")
            .removeClass("is-error")
            .text("Players uploaded successfully!");
        }
      })
      .catch(function(error) {
        console.log(error);
        $(".form-feedback span")
          .addClass("is-error")
          .removeClass("is-success")
          .text("Something went wrong. Please try again later.");
      });
  }

  onInputChange(e) {
    e.preventDefault();
    let $this = $(e.currentTarget);
    let $files = $this[0].files;

    if ($files.length === 0) {
      this.showError($this.closest(".form-group"), "File is required");
      return;
    }

    if ($files[0].type !== "application/json") {
      this.showError(
        $this.closest(".form-group"),
        "Only Json file type allowed"
      );
      return;
    }

    // Read content and throw error if not the right structure up front if user has File Api available
    let reader = new FileReader();
    reader.onload = () => {
      let data;

      try {
        data = JSON.parse(event.target.result);
      } catch (e) {
        console.log("Something is wrong with Json file");
        this.showError(
          $this.closest(".form-group"),
          "Something is wrong with Json file"
        );
        return;
      }

      if (data.Players) {
        data = data.Players;

        data.forEach(player => {
          if (player.Name && player.Age && player.Location) {
            let location = player.Location;

            if (!location.City || !location.Province || !location.Country) {
              this.showError(
                $this.closest(".form-group"),
                "File doesn't have expected Json data"
              );
              return;
            }
          } else {
            this.showError(
              $this.closest(".form-group"),
              "File doesn't have expected Json data"
            );
            return;
          }
        });
      } else {
        this.showError(
          $this.closest(".form-group"),
          "File doesn't have expected Json data"
        );
        return;
      }
    };
    reader.readAsText($files[0]);

    $("span.form-file-name").text($files[0].name);

    this.hideError($this.closest(".form-group"));
  }

  showError($source, message) {
    $source.find(".form-error").text(message);
    $source.addClass("is-invalid");
  }

  hideError($source) {
    $source.find(".form-error").text("");
    $source.addClass("is-valid").removeClass("is-invalid");
  }

  render() {
    return (
      <div className="UploadPlayer">
        <div className="container">
          <h2>Upload Athletes</h2>
          <form
            onSubmit={this.onSubmitPlayer}
            action="http://localhost/player-manager/backend/api/data.upload"
            noValidate
            className="form form-upload"
          >
            <div className="form-group fileUpload">
              <span className="form-file-name" />
              <input
                type="file"
                id="playerData"
                name="playerData"
                accept=".json"
                required
                onChange={this.onInputChange}
              />
              <label htmlFor="playerData" className="btn btn-primary">
                Browse
              </label>
              <span className="form-error" />
            </div>
            <div className="form-feedback">
              <span />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadPlayer;
