# CONECTA: Redesign Lattes Acessível 🎓♿

[![Licença](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-Pure-orange.svg)]()
[![W3C-WCAG](https://img.shields.io/badge/WCAG-2.1_%2523AA-blue.svg)]()


---

## 📝 Contexto do Projeto

Tradicionalmente, os sistemas governamentais e de fomento científico pecam ao criar barreiras de acessibilidade que isolam cidadãos e pesquisadores devido a restrições funcionais. Baseando-se nas diretrizes do **Design Inclusivo** e do **Design Centrado no Usuário (DCU)**, este sistema foi projetado de dentro para fora utilizando semântica pura para garantir emancipação digital e igualdade de oportunidades.

### 🚫 Barreiras Corrigidas do Sistema Legado:
* **Invisibilidade Semântica:** Substituição de tags genéricas (`<div>`, `<span>`) por elementos estruturais nativos para leitura de tela coerente (NVDA/JAWS).
* **Sequestro de Foco:** Eliminação de pop-ups e modais instáveis que quebram a navegação por teclado (Tecla Tab).
* **Carga Cognitiva Sufocante:** Redução da complexidade visual, organizando fluxos baseando-se em diretrizes científicas de comunicabilidade e inclusão para evitar a exclusão de grupos como idosos e neurodivergentes.

---

## 🛠️ Recursos Técnicos de Acessibilidade

O código-fonte deste protótipo (`index.html`) implementa mecanismos robustos alinhados à **Lei Brasileira de Inclusão (LBI)**, ao **eMAG** (Governo Eletrônico) e à **WCAG 2.1**:

1.  **Mecanismo de Bypass (Skip Link):** Um link oculto via CSS (`.skip-link`) que se torna visível ao receber foco do teclado, permitindo saltar diretamente para o `<main id="conteudo">`.
2.  **Rótulos e Inputs Acoplados Explicita e Implicitamente:** Uso rigoroso de `for` e `id` combinado com os atributos `aria-required="true"` e a classe `.sr-only` (Screen Reader Only) para omitir caracteres visuais poluentes (como `*`) de sintetizadores de voz.
3.  **Gerenciamento Dinâmico de Erros (`aria-live`):** Áreas de feedback de formulários configuradas com `aria-live="assertive"`, forçando os leitores de tela a vocalizar erros de validação imediatamente após a perda de foco.
4.  **Engenharia de Diálogo Inclusiva (Modal Acessível):** Uso combinado de `role="alertdialog"`, `aria-modal="true"` e `tabindex="-1"` para criar um aprisionamento lógico do foco do teclado dentro do modal aberto, impedindo que o cursor escape para o fundo da tela.
5.  **Customização Adaptativa:** Mecanismo global nativo via chave de controle de alto contraste no topo da página.

---

## 💻 Estrutura do Arquivo HTML

A interface é estruturada em blocos regionais limpos:
* `<header>` e `<nav aria-label="Menu principal">` (Navegação estruturada)
* `<main id="conteudo">` (Área de trabalho principal)
    * `#cadastro` (Dados pessoais com tratamento de acessibilidade)
    * `#formacao` (Estrutura de dados para formação acadêmica)
    * `#producao` (Adição e gerenciamento de produção científica)
    * `#feedback` (Espaço de validação de usabilidade)
* `<footer>` (Metadados do projeto)
* `#modalOverlay` (Componente encapsulado de aviso)

---

## 🤖 Desenvolvimento Auxiliado por Inteligência Artificial

Este projeto utilizou em seu fluxo de engenharia o modelo de linguagem **Gemini Flash**. A IA atuou como uma ferramenta colaborativa em regime de par com o desenvolvedor, sendo aplicada nas seguintes frentes:
* **Prompt-to-Component:** Geração assistida da árvore DOM do componente de diálogo inclusivo (`role="alertdialog"`).
* **Revisão de Código:** Validação da árvore de acessibilidade do HTML e verificação de redundâncias de tags.
* **Revisão Ortográfica:** Garantia de clareza textual e microtextos acessíveis de instrução de formulários.
* **Pesquisa Bibliográfica:** Mapeamento de trabalhos acadêmicos nacionais e correlação com critérios de sucesso da WCAG 2.1.

---

## 📚 Referências Normativas e Bibliográficas Utilizadas
* **Lei nº 13.146/2015** (Lei Brasileira de Inclusão)
* **eMAG** (Modelo de Acessibilidade em Governo Eletrônico)
* **ISO 9241-11** (Ergonomia da interação humano-sistema - Usabilidade)
* **WCAG 2.1 - W3C** (Web Content Accessibility Guidelines)
* **SACRAMENTO, Carolina et al. (2019)** Pontos de Verificação para o Desenvolvimento de Redes Sociais Online: Um Estudo de Caso com Idosos Brasileiros no Facebook. *(Inclusão de pontos de checagem para interfaces inclusivas e acessíveis).*

---

## 👤 Autor
* **Alice Soares** - *Discente Proponente* - Centro Universitário de Brasília (CEUB)
* **Curso:** Ciência da Computação (Componente: Interação Humano-Computador / IHC Lab)
* **Grupo de Pesquisa (Base Teórica):** A. Soares, L. G. Balduino, F. Ribeiro, A. Feitoza

---
Licença MIT. Sinta-se livre para clonar, estudar e propor melhorias para tornar a web brasileira um ecossistema democrático!
