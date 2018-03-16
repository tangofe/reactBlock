<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/9
 * Time: 16:09
 */
require ('../model/Db.class.php');
require ('../controller/Articles.class.php');

$db = new Db();
$a = new Articles($db);

if (isset($_POST['id'])) {
    $res = $a->upArticle();
    echo json_encode($res);
}else {
    $res = $a->saveArticle();
    echo json_encode($res);
}