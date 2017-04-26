<?php 

include '../../conn.php';  // 引入数据库连接页面
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句

$cookie_userId = (int)$_COOKIE["userId"];  // 获取用户ID

// 文章信息

$tag = $_POST["tag"];
$title = $_POST["title"];
$content = $_POST["content"];
$date = $_POST["date"];

/* 前端界面未完成，暂时使用模拟信息

$tag = "CSS";
$title = "这是一篇测速文章";
$content = "通过后台添加进来的";
date_default_timezone_set("UTC");
$date = date("Y-m-d");

*/

/* 执行添加语句 */

$sql = "insert into note (user_id,note_tag,note_title,note_content,note_date) values ($cookie_userId,'$tag','$title','$content','$date')";
$result = mysql_query($sql);

/* 返回JSON状态*/

if($result){
	$resultJSON = array("addState"=>"yes");
}
else {
	$resultJSON = array("addState"=>"no");
}
echo json_encode($resultJSON);

mysql_close($conn);  // 断开数据库连接

 ?>