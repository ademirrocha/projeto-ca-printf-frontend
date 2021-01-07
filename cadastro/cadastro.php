<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
      <img style="width: 100px;" src="img/default-user.png" id="icon" alt="User Icon" />
    </div>

    <div class="message" id="message_register" hidden="hidden"></div>

    <!-- Login Form -->
    <form action="#">

      <label class="form-text">
        Nome: 
        <span class="message-text" id="name_error" hidden="hidden"></span>
      </label> 
      <input type="text" id="name" class="fadeIn second" name="name" placeholder="Nome Completo">

      <label class="form-text">
        Email:
        <span class="message-text" id="email_error" hidden="hidden"></span>
      </label> 
      <input type="email" id="email" class="fadeIn second" name="email" placeholder="E-mail">
      
      <label class="form-text">
        Senha:
        <span class="message-text" id="password_error" hidden="hidden"></span>
      </label> 
      <input type="password" id="password" class="fadeIn third" name="password" placeholder="Senha">
      <label class="form-text">Confirmar Senha:</label> 
      <input type="password" id="password_confirmation" class="fadeIn third" name="password_confirmation" placeholder="Confirmar Senha">
      <button type="button" class="fadeIn fourth" onclick="return AuthRegister(this);">Cadastrar</button>
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <label class="form-text">Já possui cadastro? <a class="underlineHover" href="#" onclick="openLogin();">Entre Aqui</a></label>
    </div>

  </div>
</div>