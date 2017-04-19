<?php 

/* 数据库连接信息 */

$host = "localhost";  // 主机
$user = "root";  // 用户
$pass = "root";  // 密码
$data = "Note";  // 数据库

$conn = mysql_connect($host,$user,$pass);  // 开始连接
mysql_select_db($data,$conn);  // 选中数据库
 ?>