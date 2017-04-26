<?php 

include '../../conn.php';  // 引入数据库连接页面

/* BUG 注销之后会立即执行检查语句，导致返回错误的退出状态信息
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句
*/

/* 把Cookie的值设置为空来注销Cookie */

// TODO not work

// Thanks for http://blog.csdn.net/binbin1129/article/details/5829940
// Now, works in IE
$domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
setcookie("user",null,time()-3600,"/",$domain,null,false);
setcookie("userId",null,time()-3600,"/",$domain,null,false);

/* 判断是否注销成功并且返回值 */

if($_COOKIE['userId']){
	$arr = array("logoutState"=>"no");
	echo json_encode($arr);
	exit();
}
else {
	$arr = array("logoutState"=>"yes");
	echo json_encode($arr);
}

 ?>