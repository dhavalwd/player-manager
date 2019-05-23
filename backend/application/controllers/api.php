<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// Allow different methods
header('Access-Control-Allow-Origin: *');
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    exit;
}


require (APPPATH . 'libraries/REST_Controller.php');
use Restserver\Libraries\REST_Controller;

class API extends REST_Controller {
	function __construct() {
		parent::__construct();
		$this->load->model('player_model', 'pm');
	}

	// API: to get players or individual player
	public function players_get() {
		$id = $this->get('id');

		if(isset($id)) {
			// If ID is provided then get individual player
			$data = $this->pm->get_player($this->get('id'));

			if(isset($data)) {
				// Send specific player details with 200 status code
				$this->response($data, 200);
			} else {
				// No players available, send 200 status code
				$this->response("No players available", 200);
			}
		} else {
			// else get all players from database
			$data = $this->pm->get_all_players();

			if(isset($data)) {
				// Send all players with 200 status code
				$this->response($data, 200);
			} else {
				$data = [];
				// No players available, send 200 status code
				$this->response($data, 200);
			}
		}
	}

	// API: to add new players
	public function players_post() {
		// add new player
		$data = [];
		$dataArr = $this->post('Players');

		// if $dataArr is set and not null
		if(isset($dataArr)) {
			foreach ($dataArr as $player) {

				// Validate if each player object has expected format, if not then throw error
				if(isset( $player['Name'], $player['Age'], $player['Location']['City'], $player['Location']['Province'], $player['Location']['Country'])) {
					// Data structure checked
					$data['name'] = $player['Name'];
					$data['age'] = $player['Age'];
					$data['city'] = $player['Location']['City'];
					$data['province'] = $player['Location']['Province'];
					$data['Country'] = $player['Location']['Country'];
	
					// Add player to db
					$result = $this->pm->add_player($data);
				} else {
					// Unexpected data structure and send 400 status code
					$this->response("Invalid data structure",  400);
				}
			}
			$this->response($data, 200);
		} else {
			// Invalid data and send 400 status code
			$this->response("Invalid data",  400);
		}
	}

	// API: To add players by uploading JSON file to Api endpoint
	public function players_upload_post() {
		$file = file_get_contents($_FILES["File"]["tmp_name"], FILE_USE_INCLUDE_PATH);

		// If file format is other than JSON, throw error
		if($_FILES['File']['type'] !== "application/json") {
			// Invalid file format and 400 status code
			$this->response("Invalid file format",  400);
		}

		// Decode data to JSON
		$file = json_decode($file, true);

		// If Players object present
		if(isset($file["Players"])) {
			foreach($file["Players"] as $player) {

				// Validate if each player object has expected format, if not then throw error
				if( isset( $player['Name'], $player['Age'], $player['Location']['City'], $player['Location']['Province'], $player['Location']['Country'])) {
					// File structure checked
					$data['name'] = $player['Name'];
					$data['age'] = $player['Age'];
					$data['city'] = $player['Location']['City'];
					$data['province'] = $player['Location']['Province'];
					$data['Country'] = $player['Location']['Country'];
					
					$result = $this->pm->add_player($data);
				} else {
					// Unexpected data structure and send 400 status code
					$this->response("Invalid data structure",  400);
				}
			}

			$this->response($data, 200);
		} else {
			// Invalid Json file and send 400 status code
			$this->response("Invalid JSON file",  400);
		}
	}

	// API: to delete players or individual player
	public function players_delete() {
		$id = $this->get('id');

		// If Id is set, then delete individual player
		if(isset($id)) {
			$data = $this->pm->delete_player($id);

			if(isset($data)) {
				// Send data and 200 status code
				$this->response("Deleted individual player", 200);
			} else {
				// Something went wrong and 400 status code
				$this->response("Something went wrong", 400);
			}
			
		} else {
			// else delete all player
			$data = $this->pm->delete_all_players();

			if(isset($data)) {
				// ID not provided and send 200 status code
				$this->response("Deleted all players",  200);
			} else {
				// Something went wrong and 400 status code
				$this->response("Something went wrong", 400);
			}
		}
	}
}
