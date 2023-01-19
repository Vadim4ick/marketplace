<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$sum = $_POST['sum'];
$size = $_POST['size'];
$pack = $_POST['pack'];
$token = "5613306408:AAHoOXoVyXY94yA_KT5KBGvzvcGJDDXb74o";
$chat_id = "-1001556303533";
$arr = array(
  'ФИО: ' => $name,
  'Телефон: ' => $phone,
  'Количество единиц товара:' => $sum,
  'Габариты:' => $size,
  'Упаковка:' => $pack
);

foreach ($arr as $key => $value) {
  $txt .= "<b>" . $key . "</b> " . $value . "%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

if ($sendToTelegram) {
  return false;
} else {
  return true;
}
