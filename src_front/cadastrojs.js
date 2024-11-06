document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const cpf = document.getElementById('cpf').value;

    try {
        const response = await fetch('http://localhost:3000/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, dob, cpf }),
        });

        const data = await response.json();
        document.getElementById('message').innerText = data.message;

        if (response.ok) {
            // Redireciona após 2 segundos
            setTimeout(() => {
                window.location.href = "/login.html"; // Substitua pela URL correta
            }, 2000);
        }
    } catch (error) {
        document.getElementById('message').innerText = "Erro ao cadastrar. Tente novamente.";
    }

    // Limpa os campos do formulário
    this.reset();
});