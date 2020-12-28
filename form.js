const formularioDeDados = document.getElementById('formulario');

function obterDadosDaTela() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const pessoafouj = document.getElementById('pessoafouj').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    return {
        nome,
        email,
        pessoafouj,
        telefone,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado
    }
}
formularioDeDados.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(obterDadosDaTela());
})

const cpf = document.querySelector("#cpf");

cpf.addEventListener("blur", function () {
    if (cpf.value) cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/, "-");
});

//para verifica��o de cep
function limpa_formul�rio_cep() {
    //Limpa valores do formul�rio de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
    document.getElementById('ibge').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
        document.getElementById('ibge').value = (conteudo.ibge);
    } //end if.
    else {
        //CEP n�o Encontrado.
        limpa_formul�rio_cep();
        alert("CEP n�o encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova vari�vel "cep" somente com d�gitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Express�o regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";
            document.getElementById('ibge').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conte�do.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep � inv�lido.
            limpa_formul�rio_cep();
            alert("Formato de CEP inv�lido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formul�rio.
        limpa_formul�rio_cep();
    }
};
