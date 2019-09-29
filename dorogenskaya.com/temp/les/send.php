<?php
if (isset($_POST['domen'])) {$domen = $_POST['domen'];}

$address = 'drsasha5@gmail.com';
$sub = "Регистрация нового домена";
$mes = "Домен: $domen";
$verify = mail($address, $sub, $mes, "Content-type:text/plain; charset = UTF-8\r\n");

$message = array();

if ($domen) {
    $message['title'] = 'Success messages!';
    $message['message'] = 'Ваше сообщение отправлено';
} else {
    $message['message'] = 'Ошибка отправки сообщения!!!';
}

exit(json_encode($message));
