// Array simulado de CPFs existentes
const cpfsExistentes = ["48651513895", "12345678900"]; // Adicione outros CPFs existentes aqui

//status de entrada e saída de cada usuário
const statusUsuarios = {};

function validarCPF(cpf) {
    return cpf.length === 11 && !isNaN(cpf);
}

// Função para calcular a diferença entre horários
function calcularDuracao(entrada, saida) {
    const diffMs = saida - entrada; // diferença em milissegundos
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHoras}h ${diffMinutos}m`;
}

// Função para registrar entrada
function registrarEntrada() {
    const cpf = document.getElementById("cpf").value;
    const message = document.getElementById("message");

    if (!validarCPF(cpf) || !cpfsExistentes.includes(cpf)) {
        message.textContent = "CPF inválido ou não cadastrado.";
        message.style.color = "red";
        return;
    }

    // Verifica se o usuário já registrou a entrada
    if (statusUsuarios[cpf] && statusUsuarios[cpf].status === "entrada") {
        message.textContent = "Erro: entrada já registrada. Por favor, registre a saída primeiro.";
        message.style.color = "red";
    } else {
        // Registra a entrada
        statusUsuarios[cpf] = {
            status: "entrada",
            horaEntrada: new Date() // Armazena o horário de entrada
        };
        message.textContent = `Entrada registrada para o CPF ${cpf}.`;
        message.style.color = "green";
    }
}

// Função para registrar saída
function registrarSaida() {
    const cpf = document.getElementById("cpf").value;
    const message = document.getElementById("message");

    if (!validarCPF(cpf) || !cpfsExistentes.includes(cpf)) {
        message.textContent = "CPF inválido ou não cadastrado.";
        message.style.color = "red";
        return;
    }

    // Verifica se o usuário já registrou a saída ou se a entrada não foi registrada
    if (!statusUsuarios[cpf] || statusUsuarios[cpf].status !== "entrada") {
        message.textContent = "Erro: registre a entrada antes de registrar a saída.";
        message.style.color = "red";
    } else {
        // Calcula a duração do tempo
        const horaSaida = new Date();
        const duracao = calcularDuracao(statusUsuarios[cpf].horaEntrada, horaSaida);
        
        // Registra a saída
        statusUsuarios[cpf] = {
            status: "saida",
            horaEntrada: null
        };
        message.textContent = `Saída registrada para o CPF ${cpf}. Duração: ${duracao}.`;
        message.style.color = "green";
    }
}

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário e o comportamento padrão
    
    // Obtém o CPF digitado
    const cpf = document.getElementById('cpf').value;

    // Verifica se o CPF já existe
    if (cpfsExistentes.includes(cpf)) {
        document.getElementById('message').innerText = "Cadastro já existente!";
    } else {
        document.getElementById('message').innerText = "Cadastro concluído!";
        cpfsExistentes.push(cpf); // Adiciona o CPF à lista de existentes

        // Redireciona para a tela de login após o cadastro bem-sucedido
        setTimeout(() => {
            window.location.href = "/login.html"; // Substitua pela URL correta
        }, 2000); // Aguarda 2 segundos para exibir a mensagem antes de redirecionar    
    }
    
    // Limpa os campos do formulário
    this.reset();
});