<?php 

if(empty($_COOKIE["userId"])){
	$arr = array("loginState"=>"no");
	echo json_encode($arr);
	exit();
}

 ?>