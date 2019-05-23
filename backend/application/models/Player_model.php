<?php

class Player_model extends CI_Model {

	function __construct() {
    	parent::__construct();
	}

	function get_all_players() {
		$query = $this->db->get('players');
		$count = $query->num_rows();
			
		if($count > 0)
		{
			$result = $query->result_array();
			return $result;
		}

		return null;
	}

	function get_player($id) {
		if(isset($id)) {
			$query = $this->db->get_where('players', array('id' => $id));
			$count = $query->num_rows();
			
			if($count === 1)
			{
				$result = $query->result_array();
				return $result;
			}
		} else {
			return 'ID not provided';
		}
	}

	function add_player($data) {
		$query = $this->db->insert('players', $data);
		return $query;
	}

	function delete_player($id) {
		if(isset($id)) {
			$query = null;

			$query = $this->db->get_where('players', array('id' => $id));

			$count = $query->num_rows();

			if($count > 0) {
				$query = $this->db->delete('players', array('id' => $id));
				return $query;
			} else {
				return 'ID ' . $id . ' not found';
			}
		} else {
			$this->db->empty_table('mytable');
		}

		return null;
	}

	function delete_all_players() {
		$query = $this->db->empty_table('players');
		return $query;
	}
}
