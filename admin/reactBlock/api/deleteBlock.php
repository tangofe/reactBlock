<?php
/**
 * Created by PhpStorm.
 * User: tan
 * Date: 2017/11/30
 * Time: 12:32
 */

require ('../model/Db.class.php');
require ('../controller/Articles.class.php');

$db = new Db();
$a = new Articles($db);
$res = $a->deleteArticle();
echo  json_encode($res);