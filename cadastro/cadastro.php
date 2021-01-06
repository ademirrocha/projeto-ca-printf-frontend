<div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <img style="width: 100px;" src="img/default-user.png" id="icon" alt="User Icon" />
      </div>

      <!-- Login Form -->
      <form method="POST" action="#">
        <label class="form-text">Nome:</label> 
        <input type="text" id="name" class="fadeIn second" name="name" placeholder="Nome Completo">
        <label class="form-text">Email:</label> 
        <input type="email" id="email" class="fadeIn second" name="email" placeholder="E-mail">
        <label class="form-text">Senha:</label> 
        <input type="password" id="password" class="fadeIn third" name="password" placeholder="Senha">
        <label class="form-text">Confirmar Senha:</label> 
        <input type="password" id="password_confirmation" class="fadeIn third" name="password_confirmation" placeholder="Confirmar Senha">
        <input type="submit" class="fadeIn fourth" value="Cadastrar">
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <label class="form-text">Já possui cadastro? <a class="underlineHover" href="#" onclick="openLogin();">Entre Aqui</a></label>
      </div>

    </div>
  </div>