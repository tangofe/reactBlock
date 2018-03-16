<?php
  $origin       = isset($_SERVER['HTTP_ORIGIN'])?$_SERVER['HTTP_ORIGIN']:'';
    $allowOrigin  = [
                        'http://localhost:8000',
                        'http://localhost:80'
                    ];
    if (in_array($origin, $allowOrigin)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }

    header('Access-Control-Allow-Methods: PUT,POST,GET,DELETE,OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, Accept');


  $a = [1,2,3];
  echo json_encode($a);
  
?>