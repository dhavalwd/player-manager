<?php

defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');


require (APPPATH . 'libraries/REST_Controller.php');
use Restserver\Libraries\REST_Controller;

class API extends REST_Controller {
	function __construct() {
		parent::__construct();
		$this->load->model('player_model', 'pm');
	}

	public function players_get() {
		$id = $this->get('id');

		if(isset($id)) {
			$data = $this->pm->get_player($this->get('id'));

			if(isset($data)) {
				// Send specific player details with 200 status code
				$this->response($data, 200);
			} else {
				// Something went wrong to get player from db, send 400 status code
				$this->response("Something went wrong, please try again", 400);
			}
		} else {
			$data = $this->pm->get_all_players();

			if(isset($data)) {
				// Send all players with 200 status code
				$this->response($data, 200);
			} else {
				// Something went wrong to get players from db, send 400 status code
				$this->response("Something went wrong, please try again", 400);
			}
		}
	}
	public function players_post() {
		// add new player
		$data = [];
		$dataArr = $this->post('data');

		if(isset($dataArr)) {
			foreach ($dataArr as $player) {

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
		} else {
			// Invalid data and send 400 status code
			$this->response("Invalid data",  400);
		}
	}
	public function players_upload_post() {
		$file = file_get_contents($_FILES["File"]["tmp_name"], FILE_USE_INCLUDE_PATH);

		if($_FILES['File']['type'] !== "application/json") {
			// Invalid file format and 400 status code
			$this->response("Invalid file format",  400);
		}

		$file = json_decode($file, true);

		if(isset($file["data"])) {
			foreach($file["data"] as $player) {

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
		} else {
			// Invalid Json file and send 400 status code
			$this->response("Invalid JSON file",  400);
		}
	}
	public function players_delete() {
		// delete player
		$id = $this->get('id');

		if(isset($id)) {
			$data = $this->pm->delete_player($this->get('id'));
			
			// Send data and 200 status code
        	$this->response($data, 200);
		} else {
			// ID not provided and send 400 status code
			$this->response("ID not provided",  400);
		}
	}
}
