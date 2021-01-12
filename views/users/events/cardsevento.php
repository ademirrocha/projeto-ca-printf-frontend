    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap-grid.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">  
    <link rel="stylesheet" href="css/templatemo-style.css">
    <link rel="stylesheet" type="text/css" href="css/menu.css">
    <link rel="stylesheet" type="text/css" href="css/responsive.css">
    <link rel="stylesheet" type="text/css" href="css/cards.css">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Third navbar example">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.php">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample03">
          <ul class="navbar-nav me-auto mb-2 mb-sm-0">
            <li class="nav-item active">
              <a class="nav-link active" aria-current="page" href="cardsevento.php">Eventos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="cardsprojetos.php">Projetos</a>
            </li>
            <li class="nav-item dropdown">
             <a class="nav-link active dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Documentos</a>
             <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li><a class="dropdown-item" href="#">PPC</a></li>
              <li><a class="dropdown-item" href="#">RegulamentoEstagio</a></li>
              <li><a class="dropdown-item" href="#">RegulamentoHorasComplementares</a></li>
              <li><a class="dropdown-item" href="#">AtasReunião</a></li>
            </ul>
          </li>
        </ul> 
      </div>
    </div>
  </nav>
  <section style="background-image: url('img/mini-profile-bg-02.jpg');">
    <div class="container-fluid">
      <div class="tm-portfolio-name  text-white tm-bg-green mx-auto" style="width:320px; ">
        <h1 class="card-title h1">Eventos</h1>
      </div> 
      <p class="lead">O Centro Academico Precisa armazenar seus projetos em lugares que possam divulgar e fortalecer o Campus-Arinos</p>
      <a class="btn btn-primary d-grid gap-2 col-2 mx-auto" href="index.php" role="button">VoltarInicio</a>
    </div>
  </section>
  <br>
  <div class="card">
    <div class="card-body p-3 mb-5 bg-light rounded">
      <h5 class="card-title h1">Evento Ca</h5>
      <p class="card-text">Hackton</p>
      <p class="card-text">Ativo</p>
      <a href="eventos.php" target="_blank" class="card-link">Evento_Hackton</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
  <div class="card start-50">
    <div class="card-body p-3 mb-5 bg-light rounded">
      <h5 class="card-title h1">Projeto CA</h5>
      <p class="card-text">Fabrica De Software 2020</p>
      <p class="card-text">Ativo</p>
      <a href="projeto.php" target="_blank" class="card-link">Projeto</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>

  <script src="js/jquery.min.js"></script>
  <script src="js/parallax.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
  <script src="js/scripts.js"></script>
  <script src="js/requests.js"></script>


  <script>

    function detectMsBrowser() {
      using_ms_browser =
      navigator.appName == "Microsoft Internet Explorer" ||
      (navigator.appName == "Netscape" &&
        navigator.appVersion.indexOf("Edge") > -1) ||
      (navigator.appName == "Netscape" &&
        navigator.appVersion.indexOf("Trident") > -1);

      if (using_ms_browser == true) {
        alert(
          "Please use Chrome or Firefox for the best browsing experience!"
          );
      }
    }
    function setBrandMarginTop() {
      var bottomContainerHeight = $(".tm-welcome-container").height();

      $(".tm-brand-container-outer").css({
        "margin-top": -bottomContainerHeight + "px"
      });
    }

    $(function() {
      setBrandMarginTop();
      detectMsBrowser();

        // Handle window resize event
        $(window).resize(function() {
          setBrandMarginTop();
        });
      });
    

    $( document ).ready(function() {
      onLoads();
    });
    
  </script>
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>