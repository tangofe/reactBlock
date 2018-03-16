<?php
/**
 * Created by PhpStorm.
 * User: tan
 * Date: 2017/11/29
 * Time: 17:28
 */
require ('../model/Db.class.php');
require ('../controller/Type.class.php');

$db = new Db();
$a = new Type($db);

$res = $a->getType();
echo json_encode($res);