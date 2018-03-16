<?php
/**
 * Created by PhpStorm.
 * User: tan
 * Date: 2017/11/29
 * Time: 17:28
 */
class Type {
    protected $db;
    public function __construct($db){
        $this->db = $db;
    }
    public function getType() {
        $sql = "select * from classify";
        $res = $this->db->selectRows($sql);
       //if ($res) {
            return $res;
       // }else {
       //     return
      //  }

    }

}