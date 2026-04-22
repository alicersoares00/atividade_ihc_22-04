// Elementos Globais
const toggle = document.getElementById("contrasteToggle");
const ariaLive = document.getElementById("aria-live-region");
const originalTitle = document.title;

// --- MODO ALTO CONTRASTE ---
if (localStorage.getItem("contraste") === "alto") {
  document.body.classList.add("alto-contraste");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("alto-contraste");
    localStorage.setItem("contraste", "alto");
    anunciar("Modo de alto contraste ativado");
  } else {
    document.body.classList.remove("alto-contraste");
    localStorage.setItem("contraste", "normal");
    anunciar("Modo de alto contraste desativado");
  }
});

// --- FUNÇÕES DE ACESSIBILIDADE GERAL ---
function anunciar(mensagem) {
  if (ariaLive) {
    ariaLive.textContent = mensagem;
  }
}

function setErroTitulo(temErro) {
  if (temErro && !document.title.startsWith("[Erro]")) {
    document.title = "[Erro] " + originalTitle;
  } else if (!temErro) {
    document.title = originalTitle;
  }
}

// --- MODAL ACESSÍVEL ---
const modalOverlay = document.getElementById("modalOverlay");
const modalTitulo = document.getElementById("modalTitulo");
const modalMensagem = document.getElementById("modalMensagem");
const modalFecharBtn = document.getElementById("modalFecharBtn");
const modalOkBtn = document.getElementById("modalOkBtn");
const modalContainer = document.getElementById("modalAcessivel");

let elementoAnteriorAoFoco;

function abrirModal(titulo, mensagem, isErro = false) {
  elementoAnteriorAoFoco = document.activeElement;
  modalTitulo.textContent = titulo;
  modalMensagem.textContent = mensagem;
  
  if (isErro) {
    modalTitulo.style.color = "var(--error)";
    anunciar("Erro: " + mensagem);
  } else {
    modalTitulo.style.color = "inherit";
    anunciar("Sucesso: " + mensagem);
  }

  modalOverlay.hidden = false;
  modalContainer.focus();
}

function fecharModal() {
  modalOverlay.hidden = true;
  if (elementoAnteriorAoFoco) {
    elementoAnteriorAoFoco.focus();
  }
}

modalFecharBtn.addEventListener("click", fecharModal);
modalOkBtn.addEventListener("click", fecharModal);

// Fechar com ESC e prender foco
modalContainer.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharModal();
  }
  
  // Trap focus básico
  if (e.key === "Tab") {
    const focusableElements = modalContainer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement || document.activeElement === modalContainer) {
        lastElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
});

// --- VALIDAÇÃO DE FORMULÁRIOS ---

// Limpar erros de um campo específico
function limparErroCampo(input, erroSpan) {
  erroSpan.textContent = "";
  input.setAttribute("aria-invalid", "false");
}

// Mostrar erro em um campo específico
function setErroCampo(input, erroSpan, mensagem) {
  erroSpan.textContent = mensagem;
  input.setAttribute("aria-invalid", "true");
}

// Simulador de requisição (Camada 2)
function simularRequisicaoAsync() {
  return new Promise((resolve) => {
    anunciar("Enviando dados, aguarde...");
    setTimeout(() => {
      resolve();
    }, 1500); // Aguarda 1.5s
  });
}

// Função genérica de manipulação de submit
async function handleFormSubmit(e, formId, validacoes) {
  e.preventDefault();
  
  let valido = true;
  let primeiroCampoInvalido = null;

  // Limpa todos os erros deste formulário primeiro
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach(input => {
    const erroSpanId = input.getAttribute("aria-describedby");
    if (erroSpanId) {
      limparErroCampo(input, document.getElementById(erroSpanId));
    }
  });

  // Executa validações da Camada 1
  for (const validacao of validacoes) {
    const input = document.getElementById(validacao.id);
    const erroSpan = document.getElementById(validacao.erroId);
    let campoInvalido = false;
    let mensagemErro = "";

    if (validacao.tipo === "vazio" && !input.value.trim()) {
      campoInvalido = true;
      mensagemErro = validacao.mensagem || "Este campo é obrigatório.";
    } else if (validacao.tipo === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value.trim() || !emailRegex.test(input.value.trim())) {
        campoInvalido = true;
        mensagemErro = validacao.mensagem || "Informe um e-mail válido.";
      }
    } else if (validacao.tipo === "checkbox" && !input.checked) {
      campoInvalido = true;
      mensagemErro = validacao.mensagem || "Você deve marcar esta opção.";
    }

    if (campoInvalido) {
      valido = false;
      setErroCampo(input, erroSpan, mensagemErro);
      if (!primeiroCampoInvalido) {
        primeiroCampoInvalido = input;
      }
    }
  }

  // Tratamento de resultado da Camada 1
  setErroTitulo(!valido);

  if (!valido) {
    anunciar("Existem erros no formulário que precisam ser corrigidos.");
    primeiroCampoInvalido.focus();
    return;
  }

  // Camada 2: Simulação de envio
  const btnSubmit = form.querySelector('button[type="submit"]');
  const btnOriginalText = btnSubmit.textContent;
  btnSubmit.disabled = true;
  btnSubmit.textContent = "Enviando...";

  await simularRequisicaoAsync();

  btnSubmit.disabled = false;
  btnSubmit.textContent = btnOriginalText;
  
  form.reset();
  abrirModal("Sucesso", "Formulário enviado com sucesso!");
}

// 1. Cadastro
document.getElementById("formCadastro").addEventListener("submit", (e) => {
  handleFormSubmit(e, "formCadastro", [
    { id: "nome", erroId: "erroNome", tipo: "vazio", mensagem: "Informe seu nome completo." },
    { id: "email", erroId: "erroEmail", tipo: "email", mensagem: "Informe um e-mail com formato válido." },
    { id: "consentimento", erroId: "erroConsentimento", tipo: "checkbox", mensagem: "Obrigatório aceitar para prosseguir." }
  ]);
});

// 2. Formação
document.getElementById("formFormacao").addEventListener("submit", (e) => {
  handleFormSubmit(e, "formFormacao", [
    { id: "curso", erroId: "erroCurso", tipo: "vazio", mensagem: "Informe o nome do curso." },
    { id: "instituicao", erroId: "erroInstituicao", tipo: "vazio", mensagem: "Informe a instituição de ensino." },
    { id: "ano", erroId: "erroAno", tipo: "vazio", mensagem: "Informe o ano de conclusão." }
  ]);
});

// 3. Produção
document.getElementById("formProducao").addEventListener("submit", (e) => {
  handleFormSubmit(e, "formProducao", [
    { id: "titulo", erroId: "erroTitulo", tipo: "vazio", mensagem: "Informe o título da publicação." },
    { id: "tipo", erroId: "erroTipo", tipo: "vazio", mensagem: "Selecione o tipo de publicação." },
    { id: "anoPub", erroId: "erroAnoPub", tipo: "vazio", mensagem: "Informe o ano da publicação." }
  ]);
});

// 4. Feedback
document.getElementById("formFeedback").addEventListener("submit", (e) => {
  handleFormSubmit(e, "formFeedback", [
    { id: "comentario", erroId: "erroComentario", tipo: "vazio", mensagem: "O comentário não pode estar vazio." },
    { id: "avaliacao", erroId: "erroAvaliacao", tipo: "vazio", mensagem: "Selecione uma opção de avaliação." }
  ]);
});