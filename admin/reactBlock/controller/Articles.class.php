<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/10
 * Time: 8:54
 */
class Articles {
    protected $db;
    public function __construct($db){
        $this->db = $db;
    }
    //react
    public function saveArticle() {
        $title = $_POST['title'];
        $content = htmlspecialchars($_POST['content']);
        $type = $_POST['type'];
        $sql = "select * from article where title='{$title}'";
        $res = $this->db->selectRow($sql);
       // print_r($res); 在sql中字符串的zhi要加单引号；
        if ($res) {
            return array( 'code'=>400,'msg'=> '存在文章标题');
        }else {
            $sql = "insert into article(title,content,fid) values('{$title}','{$content}','{$type}')";
            $res = $this->db->otherData($sql);
            if ($res) {
                return array( 'code'=>200,'msg'=> '插入文章成功');
            }
        }
    }
    //react
    public function upArticle() {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $content = htmlspecialchars($_POST['content']);
        $type = $_POST['type'];
        $sql = "update article set title='{$title}',content='{$content}',fid='{$type}' where id={$id}";
        $res = $this->db->otherData($sql);
        if ($res) {
            return array( 'code'=>200,'msg'=> '修改文章成功');
        }else{
            return array( 'code'=>400,'msg'=> '修改文章失败');
        }
    }
    //react
    public function selectAllArticle() {
        //print_r($GLOBALS['HTTP_RAW_POST_DATA']);
       // print_r($_POST);
        //print_r(  file_get_contents('php://input') );
        $json = file_get_contents('php://input');
        $json1 = json_decode($json);
        $fid = $json1->id;
        //print_r($fid);
        //return $_POST;
        $sql = "select * from article where fid={$fid}";
        $res = $this->db->selectRows($sql);
        if ($res) {
            return array('code' => 200, 'data' => $res);
            //return "{res:{code:200,data:".json_encode($res).",info:'获取信息成功'} }";
        }else {
            //return "{res:{code:400,data:'',info:'获取信息失败'} }";
            return array('code' => 400, 'data' => $res);
        }
    }
    public function selectArticle() {
        $id = $_POST['id'];
        $sql = "select * from article where id={$id}";
        $res = $this->db->selectRow($sql);
            $con = htmlspecialchars_decode($res['content']);
            $res['content']=$con;

        return $res;
    }
    public function deleteArticle() {
       // $json = file_get_contents('php://input');
       // $json1 = json_decode($json);
       // $id = $json1->id;
        //$fid = $json1->fid;
        $id = $_POST['id'];
        $sql = "delete from article where id={$id}";
        $res = $this->db->otherData($sql);
        if ($res) {
            //$sql ="select * from article where fid={$fid}";
            //$re = $this->db->selectRow($sql);
            //if ($re) {
                return array( 'code'=>200,'data' => $res,'msg'=> '删除文章成功');
           // } else {
              //  return array( 'code'=>400,'msg'=> '删除文章失败');
           // }
        }else {
            return array( 'code'=>400,'msg'=> '删除文章失败');
        }
    }
}