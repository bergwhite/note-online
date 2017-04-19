<?php 

include '../../conn.php'; // 引入数据库连接页面

if(!empty($_COOKIE["userId"])){

	/* 已经登陆 */

	$arr = array("loginState"=>"yes");
	echo json_encode($arr);
}
else {

	$user = $_POST['user'];
	$pass = md5($_POST['pass']);


	/* 前端界面未完成，暂时使用模拟信息 */

	//$user = "berg";
	//$pass = md5("23334");


	/* 验证登陆信息 */

	$sql = "select * from user where user_name='$user' and user_pass='$pass'";
	$result = mysql_query($sql);

	/* 保存登陆信息 */

	while($row = mysql_fetch_array($result)){

		/* 正在登陆 */

		$arr = array("loginState"=>"login...");
		echo json_encode($arr);

		$userId = $row["user_id"];
		// Thanks for http://blog.csdn.net/binbin1129/article/details/5829940
		// Now, works in IE
		$domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
		setcookie("user",$user,time()+3600,"/",$domain,null,false);
		setcookie("userId",$userId,time()+3600,"/",$domain,null,false);
		exit();
		// echo $row['user_name'].' '.$row['user_pass']; // 测速登陆结果

	};

	/* 输出登陆失败信息 */

	$arr = array("loginState"=>"no");
	echo json_encode($arr);
}
 ?>