<?php
usleep(300000);
$result = array(
	'status' => 0,
	'msg' => '',
	'data' => array (
		'id' => mt_rand(5,100000000)
	)
);

echo json_encode($result);