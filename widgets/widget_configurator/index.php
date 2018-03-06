<?php
   ob_start();
   session_start();
?>

<?
   // error_reporting(E_ALL);
   // ini_set("display_errors", 1);
?>
<?php
  $msg = '';

  if (isset($_POST['login']) && !empty($_POST['username'])
     && !empty($_POST['password'])) {

     if ($_POST['username'] == 'MyHouseIsAPizza' &&
        $_POST['password'] == 'p1zz4') {
        $_SESSION['valid'] = true;
        $_SESSION['timeout'] = time();
        $_SESSION['username'] = 'MyHouseIsAPizza';

        echo '
        <!doctype html>
        <html lang=en>
          <head>
              <title>Widget Configurator</title>
              <meta charset=utf-8>
              <link rel="stylesheet" type="text/css" href="styles.css">
              <script async type="text/javascript" src="main.js"></script>
          </head>
          <body>
            <table id="wcApp">
              <tr>
                <td id="settingsPane">
                  <div id="wType_dropdown" class="cd-dropdown">
                    <span class="dropdown_target">Choose a Widget</span>
                    <input type="hidden" class="dropdown_input" name="cd-dropdown" id="wType" onchange="changeWidget(this.value)">
                    <ul class="dropdown_list">
                      <!-- list items go here -->
                    </ul>
                  </div>
                  <!-- <br> -->
                  <h2>Settings</h2>
                  <div id="settingsInputsContainer">
                    <table id="settingsInputs">
                      <!-- object created inputs go here -->
                    </table>
                  </div>
                  <br>
                  <button id="generate" type="button" onclick="generateWidget()">Generate</button>
                  <br>
                  <br>
                  Output URL:
                  <br>
                  <textarea id="outputTextarea"></textarea>
                  Output Embed:
                  <br>
                  <textarea id="outputEmbedTextarea"></textarea>
                  <br>
                  <br>
                  Change Preview Pane Size:
                  <br>
                  <table>
                    <tr>
                      <td>
                        Width
                      </td>
                      <td>
                        <input id="prevWidth" placeholder="300" type="text"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Height
                      </td>
                      <td>
                        <input id="prevHeight" placeholder="600" type="text"/>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <button id="setSize" type="button" onclick="setSize()">Set Size</button>
                </th>
                <td id="previewPane">
                  <iframe id="previewFrame" scrolling="no"></iframe>
                </th>
              </tr>
            </table>
          </body>
        </html>
        ';
     }else {
        $msg = 'Wrong username or password';
        showLogin($msg);
     }
  }
  else {
    showLogin("");
  }
  function showLogin($msg) {
    echo '
    <html lang = "en">
       <head>
          <style>
             body {
                padding-top: 40px;
                padding-bottom: 40px;
                font-family: helvetica;
             }

             .form-signin {
                max-width: 200px;
                padding: 15px;
                margin: 0 auto;
                color: black;
             }

             .form-signin .form-signin-heading,
             .form-signin .checkbox {
                margin-bottom: 10px;
             }

             .form-signin .checkbox {
                font-weight: normal;
             }

             .form-signin .form-control {
                position: relative;
                height: auto;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 10px;
                font-size: 16px;
             }

             .form-signin .form-control:focus {
                z-index: 2;
             }

             .form-signin input[type="email"] {
                margin-bottom: -1px;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                border-color:black;
             }

             .form-signin input[type="password"] {
                margin-bottom: 10px;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                border-color:black;
             }

             h2{
                text-align: center;
                color: black;
             }
          </style>

       </head>
       <body>
      <h2>Login to Widget Configurator</h2>
      <div class = "container form-signin">
      </div>

      <div class = "container">

         <form class = "form-signin" role = "form"
            action = "'.htmlspecialchars($_SERVER['PHP_SELF']).'" method = "post">
            <h4 class = "form-signin-heading">'.$msg.'</h4>
            <input type = "text" class = "form-control"
               name = "username" placeholder = "Username"
               required autofocus></br>
            <input type = "password" class = "form-control"
               name = "password" placeholder = "Password" required>
               <br>
            <button class = "btn btn-lg btn-primary btn-block" type = "submit"
               name = "login">Login</button>
         </form>
      </div>

   </body>
</html>
    ';
  }
?>
