<?php 

include '../../conn.php';  // 引入数据库连接页面
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句

$cookie_userId = (int)$_COOKIE["userId"];  // 获取用户ID

/* 获取登陆信息

$oldPass = $_POST['oldPass'];
$newPass =  $_POST['newPass'];

 */

/* 前端界面未完成，暂时使用模拟信息 */

$oldPass = md5('2333');
$newPass =  md5('23334');

/* 验证密码 */

$sql = "select * from user where user_id='$cookie_userId' and user_pass='$oldPass'";
$result = mysql_query($sql);

/* 保存登陆信息 */

while($row = mysql_fetch_array($result)){

	$sql2 = "update user SET user_pass = '$newPass' where user_id = $cookie_userId";
	$result2 = mysql_query($sql2);
	if(mysql_affected_rows()) {

		/*输出登陆状态*/

		$arr = array("passwordState"=>"yes");
		echo json_encode($arr);
		exit();
	}

};

/* 输出未登陆状态信息 */

$arr = array("passwordState"=>"no");
echo json_encode($arr);

 ?>