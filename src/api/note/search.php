<?php 

include '../../conn.php';  // 引入数据库连接页面
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句

$cookie_userId = (int)$_COOKIE["userId"];  // 获取用户ID

/* 查询语句 */

$sql = "select * from note where user_id = $cookie_userId order by note_id";  // 写入语句
$result = mysql_query($sql);  // 执行语句
$resultJSON = array();  // 定义数组

/* 开始查询 */

while($row = mysql_fetch_array($result)){

  $arr = array('id'=>$row['note_id'],'tag'=>$row['note_tag'],'title'=>$row['note_title'],'content'=>$row['note_content'],'date'=>$row['note_date']);  // 文章的信息保存到一个数组
  $resultJSON[] = $arr;  // 每天文章分别保存为一个数组值
};

/* 输出结果 */

echo json_encode($resultJSON);  // 输出JSON内容

/* 断开连接 */

mysql_close($conn);

 ?>