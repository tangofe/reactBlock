<?php
/**
 * Created by PhpStorm.
 * User: tan
 * Date: 2017/11/20
 * Time: 15:18
 */
require ('../model/Db.class.php');
require ('../controller/Articles.class.php');

$db = new Db();
$a = new Articles($db);

$res = $a->selectArticle();
echo json_encode($res);
//echo $res;