document.addEventListener("DOMContentLoaded", function () {

  const toggleDarkModeButton = document.getElementById("modoEscuro");
  const body = document.body;

  // Verifica se o modo escuro está ativado ao carregar a página
  if (localStorage.getItem("modoEscuro") === "true") {
    body.classList.add("dark");
  }

  // Alterna a classe 'dark' no body ao clicar no botão
  toggleDarkModeButton.addEventListener("click", () => {
    if (localStorage.getItem("modoEscuro") === "false") {
      localStorage.setItem("modoEscuro", "true");
    } else {
      localStorage.setItem("modoEscuro", "false");
    }
  });

});



document.addEventListener("DOMContentLoaded", function () {
  let synth = window.speechSynthesis;
  let isSpeaking = false;
  let currentUtterance = null;

  let playPauseButtons = document.querySelectorAll(".playPauseBtn");

  playPauseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let img = button.querySelector(".playPauseIcon");
      if (isSpeaking) {
        synth.cancel();
        playPauseButtons.forEach((btn) => {
          let icon = btn.querySelector(".playPauseIcon");
          icon.src = "../assets/image/sound-on-svgrepo-com.svg";
        });
        isSpeaking = false;
      } else {
        let aviso =
          button.closest(".aviso") ||
          button.closest(".orientacoesTexto") ||
          button.closest(".orientacoesTextoIndex") ||
          button.closest(".tituloOrientacoes") ||
          button.closest(".tituloOrientacoesQuemSomos") ||
          button.closest(".listaAlunos");
        if (aviso) {
          // Verifica se o elemento foi encontrado
          let texto = aviso.innerText || aviso.textContent;
          narrarTexto(texto, img);
        }
      }
    });
  });

  function narrarTexto(texto, img) {
    if (currentUtterance) {
      synth.cancel(); // Cancela a fala atual se houver uma em andamento
    }

    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.onend = function () {
      img.src = "../assets/image/sound-on-svgrepo-com.svg";
      isSpeaking = false;
    };

    utterance.onerror = function () {
      // Adicionado para tratar possíveis erros
      img.src = "../assets/image/sound-on-svgrepo-com.svg";
      isSpeaking = false;
    };

    synth.speak(utterance);
    img.src = "../assets/image/sound-off-svgrepo-com.svg";
    isSpeaking = true;
    currentUtterance = utterance;
  }
});



// Controla o tamanho da fonte
document.addEventListener("DOMContentLoaded", function () {
  const botaoMaisFonte = document.getElementById("fonteMais");
  const botaoMenosFonte = document.getElementById("fonteMenos");
  const body = document.body;

  const tamanhoOriginal = parseFloat(getComputedStyle(body).fontSize);

  botaoMaisFonte.addEventListener("click", function (event) {
    event.preventDefault();
    let currentFontSize = parseFloat(getComputedStyle(body).fontSize);
    let novoTamanho = currentFontSize * 1.2; // Aumenta em 30%

    if (novoTamanho > tamanhoOriginal * 1.2) {
      // Limita a 140% do original
      novoTamanho = tamanhoOriginal * 1.2;
    }

    body.style.fontSize = novoTamanho + "px";
  });

  botaoMenosFonte.addEventListener("click", function (event) {
    event.preventDefault();
    let currentFontSize = parseFloat(getComputedStyle(body).fontSize);
    let novoTamanho = currentFontSize * 0.835; // Diminui em 30%

    if (novoTamanho < tamanhoOriginal * 0.835) {
      // Limita a 90% do original
      novoTamanho = tamanhoOriginal * 0.835;
    }

    body.style.fontSize = novoTamanho + "px";
  });
});



// Limita a quantidade de caracteres em um parágrafo
document.addEventListener("DOMContentLoaded", function () {
  const textElements = document.querySelectorAll(".orientacoesTextoIndex p");
  const charLimit = 150; // Limite de caracteres

  textElements.forEach((element) => {
    let originalText = element.innerText;
    if (originalText.length > charLimit) {
      let truncatedText = originalText.substring(0, charLimit) + "...";
      element.innerText = truncatedText;
    }
  });
});
