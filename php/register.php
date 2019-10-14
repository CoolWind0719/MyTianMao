<?php
    header("content-type: text/html;charset= UTF-8");

    $username = $_POST['username'];
    $userpwd = $_POST['userpwd'];
    $banknum = $_POST['banknum'];
    $bankuser = $_POST['bankuser'];
    $shenfenId = $_POST['shenfenId'];
    $userphone = $_POST['userphone'];
    $useremail = $_POST['useremail'];

    $conn = mysql_connect("localhost","root","root");
    if(!$conn){
        echo("数据库出错".mysql_error());
    }else{
        mysql_select_db("lpf",$conn);
 
        $sqlstr = "select * from mytianmao where name = '$username'";
        $result = mysql_query($sqlstr,$conn);
        $query_num = mysql_num_rows($result);
        if($query_num>0){
            mysql_close($conn);
            echo "0";
        }else{
            $sqlstr = "insert into mytianmao (name,password,banknum,bankuser,shenfen,phone,email) values ('$username','$userpwd','$banknum','$bankuser','$shenfenId','$userphone','$useremail')";
            $result = mysql_query($sqlstr,$conn);
            mysql_close($conn);
            if($result!=1){
                echo "-1";
            }else{
                echo "1";
            }
        }
    }

?>