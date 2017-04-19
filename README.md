## 在线笔记

在线演示：[http://berg-lab.com/Note/](http://berg-lab.com/Note/)

```

程序后台使用PHP，数据库使用MySQL。后端只提供接口给前端调用，前端对返回的JSON数据进行处理。

项目通过配置Gulp达到一次性上线，把Less转成CSS再压缩，以及把ES6转为ES5再对JS进行压缩。

```

## 配置环境

使用项目前，请确保安装好了PHP环境。下面是创建在线笔记数据库的代码。

> 创建数据库

```

创建数据库
------------
create database Note;

选中数据库
------------
use Note;

创建user表
------------
create table user(
	user_id int(11) auto_increment primary key,
	user_name varchar(20) unique key,
	user_pass varchar(33),
	user_mail varchar(30) unique key
);

创建note表
------------
create table note(
  note_id int(10) auto_increment primary key,
  user_id int(10),
  note_tag varchar(20),
  note_title varchar(100),
  note_content varchar(10000),
  note_date date
);

```

> 连接数据库

请在conn.php里面修改成你自己的连接信息。

```

conn.php
-----------------
<?php 
$host = "localhost";  // 主机
$user = "root";  // 用户
$pass = "root";  // 密码
$data = "Note";  // 数据库

$conn = mysql_connect($host,$user,$pass);  // 开始连接
mysql_select_db($data,$conn);  // 选中数据库
 ?>

```

## 构建项目

```

npm install  // 安装依赖
npm run build  // 构建项目

```

## 项目上线

```

把dist目录内的内容上传到网站目录即可

```