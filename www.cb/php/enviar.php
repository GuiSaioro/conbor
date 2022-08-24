<?php


//error_reporting(0);

$nome = utf8_encode($_POST['nome']);
$empresa = utf8_encode($_POST['empresa']);
$email = utf8_encode($_POST['email']);
$tel = utf8_encode($_POST['tel']);
$mensagem = utf8_encode($_POST['mensagem']);
//$mensagem = utf8_encode($_POST['mensagem']);

require './php-mailer/PHPMailerAutoload.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
//$mail->SMTPDebug = SMTP::DEBUG_SERVER; 

/*
  Habilitando debug SMTP
  0 = off (uso em produção)
  1 = Mensagens ao Cliente
  2 = Mensagens ao Cliente e Servidor
*/

$mail->SMTPDebug = 0;

//$mail->setLanguage('pt-br', '/language/phpmailer.lang-pt_br.php');


// config servidor

$mail->Host = "mail-nt.braslink.com";
$mail->Port = "25";
//$mail->SMTPSecure = false;
$mail->SMTPSauth = false;
$mail->Username = "";
$mail->Password = "";

//Config de mensagem

$mail->setFrom($mail->Username, "Site CONBOR/Mectrans"); // Remetente
$mail->addAddress("deptec2@conbor.com.br");   //Destinatário
$mail->Subject = "Contato";             //Assunto

$conteudo_email = "E-mail do site:<br>
Nome: $nome<br>
Empresa: $empresa<br>
Telefone: $tel<br>
e-mail:($email):
<br>
<br>
Mensagem: $mensagem";


$mail->IsHTML(true);
$mail->Body = $conteudo_email;

if (isset($_POST['enviar'])){
  //print_r($_POST);

  if (!empty($_POST['g-recaptcha-response']))
  // continuar o envio
  $url = "https://www.google.com/recaptcha/api/siteverify";
  $secret = "6LeJHaAhAAAAAN2DNAiJq9CZNnyijNYwwwtj_JCu";
  $response = $_POST['g-recaptcha-response'];
  $variaveis = "secret=" .$secret. "&response=".$response;

  $ch = curl_init($url);
  curl_setopt( $ch, CURLOPT_POST, 1);
  curl_setopt( $ch, CURLOPT_POSTFIELDS, $variaveis);
  curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt( $ch, CURLOPT_HEADER, 0);
  curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
  $resposta = curl_exec($ch);
  //print_r($resposta);
  $resultado = json_decode($resposta);
  //print_r($resultado);
  //echo $resultado->sucess;
  if ($resultado->success == 1){
    header("Location: enviado.html");
  }else{
    echo "Falha no envio. $mail->ErrorInfo";
}


}

/*if($mail->send()){
  //header("Location: enviado.html");



  } else{
    echo "Falha no envio. $mail->ErrorInfo";
}*/
?>