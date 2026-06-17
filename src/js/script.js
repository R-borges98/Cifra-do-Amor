// --- CONFIGURAÇÃO SIMPLIFICADA ---
const canvas = document.getElementById('MatrixCanvas');
const ctx = canvas.getContext('2d');

let fontSize = 16;
let gotas = [];

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calcula colunas com base na largura atual
    const colunas = Math.floor(canvas.width / fontSize);
    gotas = []; // Reseta o array
    for (let i = 0; i < colunas; i++) {
        gotas[i] = 1; // Começa todas no topo
    }
}

// Executa uma vez e sempre que redimensionar
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

function desenharChuva() {
    // Fundo com rastro
    ctx.fillStyle = "rgba(13, 2, 8, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff0055";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        const x = i * fontSize;
        const y = gotas[i] * fontSize;

        ctx.fillText("❤️", x, y);

        // Se passar da tela ou cair aleatoriamente
        if (y > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }
        gotas[i]++;
    }
}

setInterval(desenharChuva, 50); // Aumentei um pouco o tempo para ficar mais suave


function decodificarMensagem() {
    const botao = document.querySelector('.btn-decodificar-mensagem');
    const modal = document.getElementById('modal-mensagem');
    const conteudoModal = document.getElementById('textoCriptografado'); // Agora é o ID único dentro do modal
    const som = document.getElementById('som-matrix');

    // 1. Exibe o modal imediatamente
    if (modal) {
        modal.style.display = 'block';
    }

    // 2. Lógica do suspense
    if (conteudoModal) {
        setTimeout(() => {
            if (som) som.play();
            
            //  o texto já decifrado que será exibido
            conteudoModal.innerText = "Meu amor, viver com você é como viver em um livro de romance... Aquela história de comédia romântica que todo mundo sonha em viver. Você me ensinou que todos os nossos dias são dignos de comemorações; no nosso calendário todo dia é especial. Nos amamos, nos divertimos juntos até mesmo quando só estamos jogando conversa fora, rindo de várias bobeiras que só a gente entende. Partilhar a vida contigo é extremamente maravilhoso! com você tudo fica mais leve, mais possível... Você não é apenas o meu marido, mas sim o meu melhor amigo. Você é a prova que príncipes encantados existem. Sua parceria e o seu amor são os meus combustíveis para ver a vida ainda mais bonita. Eu amo te amar! Obrigada, por me amar também... Obrigada por me fazer feliz! Eu te amo muito meu gentleman, meu preto lindo, meu grande amor."; 
            conteudoModal.style.color = "#f8818f"; 
            
            const titulo = document.querySelector('#modal-mensagem h3');
            if (titulo) titulo.innerText = "Mensagem Decifrada! 🔓";
        }, 4000);
    }

    // 3. Atualiza o botão
    botao.innerHTML = "Código Decifrado com Sucesso! ✔️";
    botao.disabled = true;
    botao.style.borderColor = "#00ffcc";
    botao.style.color = "#00ffcc";
}

    document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.getElementById('btn-guardar');
    
    if (btnGuardar) {
        btnGuardar.addEventListener('click', function() {
            // Fecha o modal
            const modal = document.getElementById('modal-mensagem');
            if (modal) modal.style.display = 'none';

            // Cria o coração
            const coracao = document.createElement('div');
            coracao.innerText = '❤️';
            coracao.classList.add('holograma-coracao');
            document.body.appendChild(coracao);

            // Redireciona
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 5000); //5000ms = 5 segundos de exibição do coração
        });
    }
});


// --- PROTEÇÃO DE PÁGINA  ---
window.onload = function () {
    const paginaAtual = window.location.pathname;
    const estaLogado = sessionStorage.getItem("acessoAutorizado");

    // Bloqueio invisível: se não estiver logado e tentar acessar a página da mensagem
    if (paginaAtual.includes("mensagem.html") && estaLogado !== "true") {
        window.location.href = "index.html";
    }
};

// 1. Verifica se está logado ao carregar a página
(function () {
    const estaLogado = sessionStorage.getItem("acessoAutorizado");
    // Se não estiver logado E estiver na página de mensagem, volta para o login
    if (window.location.pathname.includes("mensagem.html") && estaLogado !== "true") {
        window.location.href = "index.html";
    }
})();
        //--Porteiro--
// 2. Impede o navegador de mostrar a página pelo cache (ao clicar na seta)
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};

    function verificarSenha() {
    const input = document.getElementById('inputSenha');
    const btnOlhinho = document.getElementById("btnOlhinho"); // Adicionado para poder resetar
    const senhaDigitada = input.value.trim().toLowerCase();

    // Senha correta
    if (senhaDigitada === "fortaleza digital") {
        sessionStorage.setItem("acessoAutorizado", "true");
        window.location.replace("mensagem.html"); // Redireciona para a página da mensagem 
    } else {

        // Remove a classe após a animação (500ms) para poder tentar de novo
        setTimeout(() => {
            input.value = ""; // Limpa o campo
            // O RESET AGORA ESTÁ AQUI:
            input.type = "password";
            btnOlhinho.textContent = "🔒";
        }, 500);

        alert("Acesso Negado! Pense bem... Qual é o livro que me fez amar ainda mais a tecnologia? 🔒");
    }
}


// ==== FUNCIONALIDADE DO "olhinho" e cadeado no lugar do olhinho =====

    function alternarVisualizacaoSenha() {
    const inputSenha = document.getElementById("inputSenha");
    const btnOlhinho = document.getElementById("btnOlhinho");

    // Apenas troca a aparência, sem apagar o texto
    if (inputSenha.type === "password") {
        inputSenha.type = "text";
        btnOlhinho.textContent = "🔓";
    } else {
        inputSenha.type = "password";
        btnOlhinho.textContent = "🔒";
    }
}


const telaPreta = document.getElementById('telaPreta');
const elementoTexto = document.getElementById('textoDigitado');
const btnIniciar = document.getElementById('btnIniciar');

// Variável de controle para evitar cliques múltiplos
let estaDigitando = false;

function digitar(texto, i) {
    if (i < texto.length) {
        estaDigitando = true; // Trava o estado
        
        if (texto.charAt(i) === '\n') {
            elementoTexto.innerHTML += "<br><br>";
        } else {
            elementoTexto.innerHTML += texto.charAt(i);
        }
        
        // tempo de 90ms para um ritmo de digitação suave e natural
        setTimeout(() => digitar(texto, i + 1), 90);
    } else {
        // FIM DA DIGITAÇÃO
        estaDigitando = false; 
        
        // Tempo de suspense de 2 segundos antes de sumir com a tela
        setTimeout(() => {
            telaPreta.style.transition = "opacity 1s ease";
            telaPreta.style.opacity = "0";
            setTimeout(() => { telaPreta.style.display = 'none'; }, 1000);
        }, 2000); 
    }
}

const minhaFrase = "Acesso concedido 🔓 \nSistema liberado especialmente para o amor da minha vida: Valdilson Galvão ❤️";

btnIniciar.addEventListener('click', () => {
    // Impede que clique duas vezes no botão
    if (estaDigitando) return; 
    
    btnIniciar.style.display = 'none';
    elementoTexto.innerHTML = ""; // Limpa antes de começar
    digitar(minhaFrase, 0);
});