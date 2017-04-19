<?php 

include '../../conn.php';  // 引入数据库连接页面

// 已登陆用户退出注册

/* BUG undefined userId
if($_COOKIE["userId"]){
	$resultJSON = array("registerState"=>"no");
	exit();
};*/

// 注册信息

$user = $_POST["user"];
$pass = md5($_POST["pass"]);
if ($_POST["mail"]) {
	$mail = $_POST["mail"];
}
else {
	$mail = "init@berg.com";
}
//$mail = $_POST["content"];

/* 模拟信息测试 */
/*
$user = "lloxafs";
$pass = "worlxdasfd";
$mail = "hello@wosas.coms";
*/
/* 执行添加语句 */

$sql = "insert into user (user_name,user_pass,user_mail) values ('$user','$pass','$mail')";
$result = mysql_query($sql);

/* 返回JSON状态*/

// mysql_fetch_array($result)
// mysql_affected_rows()

if($result){
	$sql = "select * from user where user_name = '$user'";  // 写入语句
	$resultId = mysql_query($sql);
	while($row = mysql_fetch_array($resultId)){
		//$user = urldecode($row["user_name"]);
		$user = $row["user_name"];
		$userId = $row["user_id"];
		// 插入默认笔记
		$defaultTitle = "这是一条默认的笔记";
		$defaultContent = "试着用鼠标滑到这篇文章上，点击显示出的修改按钮吧。鼠标点击文章外部就会自动保存哦。";
		$defaultTag = "未分类";
		date_default_timezone_set("UTC");
		$defaultDate = date("Y-m-d");
		$sql = "insert into note (user_id,note_tag,note_title,note_content,note_date) values ($userId,'$defaultTag','$defaultTitle','$defaultContent','$defaultDate')";  // 写入语句
		mysql_query($sql);
		// 设置cookie
		// Thanks for http://blog.csdn.net/binbin1129/article/details/5829940
		// Now, works in IE
		$domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
		setcookie("user",$user,time()+3600,"/",$domain,null,false);
		setcookie("userId",$userId,time()+3600,"/",$domain,null,false);
		$resultJSON = array("registerState"=>"yes");
	}
	
}
else {
	$resultJSON = array("registerState"=>"no");
}
echo json_encode($resultJSON);

mysql_close($conn);  // 断开数据库连接

 ?>