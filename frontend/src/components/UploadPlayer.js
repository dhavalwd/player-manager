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
    let $input = $("input[name=playerData]");
    let $files = $input[0].files;

    // Check if file is selected
    if ($files.length === 0) {
      this.showError($input.closest(".form-group"), "File is required");
      return;
    }

    // If input is not valid, then return;
    if (!$input.is(".is-valid")) {
      this.showError($input.closest(".form-group"), "File is not valid.");
      return;
    }

    // Use formData to send file to API
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

    // Remove in-valid from input on file change start
    // We'll figure out below if it's valid or invalid
    $this.removeClass("is-valid");

    // Remove all form-feedback when new file is added.
    $(".form-feedback span")
      .removeClass("is-success is-error")
      .text("");

    // If file is not selected, show error
    if ($files.length === 0) {
      this.showError($this.closest(".form-group"), "File is required");
      $this.removeClass("is-valid");
      return;
    }

    // We have accept attribute on input but this validation is in place if user drag and drops the file
    // If file type is other than json file, throw error

    if ($files[0].type !== "application/json") {
      this.showError(
        $this.closest(".form-group"),
        "Only Json file type allowed"
      );
      $this.removeClass("is-valid");
      return;
    }

    // Read file content and throw error if it doesn't have the right data structure
    let reader = new FileReader();
    reader.onload = () => {
      let data;

      // If parsed JSON is not valid, throw error
      try {
        data = JSON.parse(event.target.result);
      } catch (e) {
        console.log("Something is wrong with Json file");
        this.showError(
          $this.closest(".form-group"),
          "Something is wrong with Json file"
        );
        $this.removeClass("is-valid");
        return;
      }

      // If data has any players
      if (data.Players) {
        data = data.Players;

        data.forEach(player => {
          // Validate each object to make sure they have expected data structure
          if (player.Name && player.Age && player.Location) {
            let location = player.Location;

            if (!location.City || !location.Province || !location.Country) {
              this.showError(
                $this.closest(".form-group"),
                "File doesn't have expected Json data"
              );
              $this.removeClass("is-valid");
              return;
            }
          } else {
            this.showError(
              $this.closest(".form-group"),
              "File doesn't have expected Json data"
            );
            $this.removeClass("is-valid");
            return;
          }
        });
      } else {
        this.showError(
          $this.closest(".form-group"),
          "File doesn't have expected Json data"
        );
        $this.removeClass("is-valid");
        return;
      }
    };
    reader.readAsText($files[0]);

    // Update selected file's name to display to user
    $("span.form-file-name").text($files[0].name);

    // Mark input file is valid
    $this.addClass("is-valid");

    // Hide error
    this.hideError($this.closest(".form-group"));
  }

  showError($source, message) {
    $source.find(".form-error").text(message);
    $source.addClass("is-invalid").removeClass("is-valid");
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
            action="http://localhost/player-manager/backend/api/upload"
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
