// Variáveis Gerais
const variaveisGerais = {
  containerJogador: document.querySelector(".secao-jogador"),
  botaoJogar: document.querySelector(".secao-jogador__jogar"),
  inputNome: document.querySelector(".secao-jogador__nome"),
  containerResposta: document.querySelector(
    ".secao-inicio__container-resposta"
  ),
  containerRanking: document.querySelector(".resultado-container"),
  acertos: document.querySelector(".resultado__acertos-valor"),
  cor0: document.querySelector(".lista-principal__cor0"),
  cor1: document.querySelector(".lista-principal__cor1"),
  cor2: document.querySelector(".lista-principal__cor2"),
  cor3: document.querySelector(".lista-principal__cor3"),

  isFimJogo: true,
  arrayOrdemMaquina: [],
  arrayCliqueJogador: [],
  pontos: 0,
  maioresPontuacoes: [],
};

// Função que realiza randomização para adicionar no arrayOrdemMaquina;
const randomValues = () => {
  let valorRandomico = Math.floor(Math.random() * 4);

  variaveisGerais.arrayOrdemMaquina.push(valorRandomico);
  variaveisGerais.arrayCliqueJogador = [];

  for (let index in variaveisGerais.arrayOrdemMaquina) {
    let corDoElemento = adicionaCor(variaveisGerais.arrayOrdemMaquina[index]);
    acenderCor(corDoElemento, Number(index) + 1);
  }
};

// Função que definirá qual número em relação a qual div com a cor específica;
const adicionaCor = (cor) => {
  if (cor === 0) {
    return variaveisGerais.cor0;
  } else if (cor === 1) {
    return variaveisGerais.cor1;
  } else if (cor === 2) {
    return variaveisGerais.cor2;
  } else if (cor === 3) {
    return variaveisGerais.cor3;
  }
};

// Função que irá acender a cor específica e apagar;
const acenderCor = (elemento, numero) => {
  numero = numero * 500;

  // Acende a cor;
  setTimeout(() => {
    elemento.classList.add("active");
  }, numero + 300);

  // Apaga a cor
  setTimeout(() => {
    elemento.classList.remove("active");
  }, numero + 700);
};

// Função início de jogo;
const inicioDoJogo = () => {
  variaveisGerais.acertos.innerHTML = "";
  variaveisGerais.containerResposta.innerHTML = `Bem vindo(a) ao Genius Kenzie ${variaveisGerais.inputNome.value}!`;

  setTimeout(() => {
    proximoNivel();
  }, 1500);

  variaveisGerais.pontos = 0;
  variaveisGerais.arrayOrdemMaquina = [];
  variaveisGerais.arrayCliqueJogador = [];
};

// Função declarada no botão para iniciar o jogo;
const jogar = () => {
  variaveisGerais.isFimJogo = false;
  inicioDoJogo();
};

// Função para incrementar um nível a mais;
const proximoNivel = () => {
  setTimeout(() => {
    variaveisGerais.containerResposta.innerHTML =
      "Preste atenção na sequência e aguarde as cores pararem de piscar.";
  }, 1000);

  variaveisGerais.pontos++;

  setTimeout(() => {
    randomValues();
  }, 1000);
};

// Função verificadora da ordem dos cliques do jogador e escolha da máquina;
const verificarOrdem = () => {
  for (let index in variaveisGerais.arrayCliqueJogador) {
    if (
      variaveisGerais.arrayCliqueJogador[index] !=
      variaveisGerais.arrayOrdemMaquina[index]
    ) {
      fimDeJogo();
      return;
    }
  }

  if (
    variaveisGerais.arrayCliqueJogador.length ===
    variaveisGerais.arrayOrdemMaquina.length
  ) {
    variaveisGerais.containerResposta.innerHTML =
      "Parabéns, você vai para o próximo nível";
    setTimeout(() => {
      pontuacaoTela();
      proximoNivel();
    }, 1000);
  }
};

// Função para adicionar pontuação no HTML;
const pontuacaoTela = () => {
  variaveisGerais.acertos.innerHTML = variaveisGerais.pontos;
};

// Função que verifica o clique do jogador;
const cliqueJogador = (cor) => {
  variaveisGerais.arrayCliqueJogador.push(cor);

  adicionaCor(cor).classList.add("active");

  setTimeout(() => {
    adicionaCor(cor).classList.remove("active");
    verificarOrdem();
  }, 400);
};

// Função para finalizar o jogo;
const fimDeJogo = () => {
  variaveisGerais.containerResposta.innerHTML =
    "Que pena, você errou a sequência";
  variaveisGerais.arrayOrdemMaquina = [];
  variaveisGerais.arrayCliqueJogador = [];

  variaveisGerais.maioresPontuacoes.push(variaveisGerais.pontos);
  variaveisGerais.containerRanking.innerHTML = "";

  // localStorage.setItem("meuRanking", JSON.stringify(variaveisGerais.maioresPontuacoes));

  ranking(variaveisGerais.maioresPontuacoes);

  setTimeout(() => {
    variaveisGerais.containerResposta.innerHTML =
      "Caso queira jogar novamente, clique no botão 'Comece a Jogar'";
  }, 2000);

  variaveisGerais.isFimJogo = true;
};

// Função que adiciona ranking top 3 de acertos do usuário
const ranking = (array) => {
  let desordenarArray = array.sort((a, b) => b - a);
  desordenarArray.forEach((elemento, posicao) => {
    if (posicao >= 0 && posicao < 3) {
      const divContainer = document.createElement("div");
      divContainer.classList.add("resultado-container__top");

      const spanTop = document.createElement("span");
      spanTop.classList.add("top");

      const spanValor = document.createElement("span");
      spanValor.classList.add("valor");

      spanTop.innerText = `${posicao + 1}º`;
      spanValor.innerText = `${elemento - 1} Pontos`;

      divContainer.appendChild(spanTop);
      divContainer.appendChild(spanValor);

      variaveisGerais.containerRanking.appendChild(divContainer);
    }
  });
};

// Funções para acionar o clique o jogador no elemento HTML específico;
variaveisGerais.cor0.onclick = () => {
  if (!variaveisGerais.isFimJogo) cliqueJogador(0);
};
variaveisGerais.cor1.onclick = () => {
  if (!variaveisGerais.isFimJogo) cliqueJogador(1);
};
variaveisGerais.cor2.onclick = () => {
  if (!variaveisGerais.isFimJogo) cliqueJogador(2);
};
variaveisGerais.cor3.onclick = () => {
  if (!variaveisGerais.isFimJogo) cliqueJogador(3);
};
