<?php
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $token = "5613306408:AAHoOXoVyXY94yA_KT5KBGvzvcGJDDXb74o";
  $chat_id = "-1001556303533";
  $arr = array(
    'ФИО: ' => $name,
    'Телефон: ' => $phone,
    'Почта:' => $email
  );
  
  foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };
  
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
  
  if ($sendToTelegram) {
    return false;
  } else {
    return true;
  }
?>