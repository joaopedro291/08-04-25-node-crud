document.getElementById('frmLeitura').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('txtNome').value;
    const login = document.getElementById('txtLogin').value;
    const notificacao = document.getElementById('notificacao');

    if (nome.trim().length == 0 && login.trim().length == 0) {
        notificacao.innerHTML = "<b class=\"text-danger\">É necessário digitar um nome ou login para realizar a pesquisa.</b>"
        return false;
    }

    const senha = document.getElementById('txtSenha').value;
    const tipo = 'leitura';

    const response = await fetch('/api/mysql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, login, senha, tipo })
    });

    const result = await response.json();
    console.log(result.message);
    // console.log(result.id);
    // console.log(result.nome);
    // console.log(result.login);
    const txtId = document.getElementById('txtId');
    const txtNome = document.getElementById('txtNome');
    const txtLogin = document.getElementById('txtLogin');

    txtId.value = result.id;
    txtNome.value = result.nome;
    txtLogin.value = result.login;
    let exibir = (parseInt(result.linhas) > 0) ? " Exibindo o primeiro." : " Nada a exibir.";
    notificacao.innerText = "Foi/foram encontrado(s) " + result.linhas + " resultado(s)." + exibir;
    console.log(result.linhas);
});