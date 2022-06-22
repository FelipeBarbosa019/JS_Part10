btn = document.querySelector ("#incluir")  
btn2 = document.querySelector("#listar")
let id = 1
const confirme = document.querySelector ("h3") 
let produtos = [];

btn.addEventListener ("click", incluir)
btn2.addEventListener ("click", listar)

function incluir() {
    // Incluido em:
    let data = new Date()
    const dia = String(data.getDate()).padStart(2,'0')
    const mes = String(data.getMonth() + 1).padStart(2,'0')
    const ano = data.getFullYear()
    const h=data.getHours();
    const m=data.getMinutes();
    const s=data.getSeconds();
    const dataatual= `${dia}/${mes}/${ano} às ${h}:${m}:${s}`
    let produto = {}

    //Guardando valores de entrada:
    const nome = document.querySelector("#nome").value;
    const descricao = document.querySelector("#descricao").value;
    const valor = parseFloat(document.getElementById ('valor').value.replace(',','.'))
    let tabela = document.querySelector("#tabela")


    //Verificação de dados:
    try {
        if(nome == "") {
            throw `Falha no cadastro do produto, preencha o nome`
        }
        if(descricao == "") {
            throw `Falha no cadastro do produto, preencha a descrição`
        }
        if(valor == "") {
            throw `Falha no cadastro do produto, preencha o valor`
        }
        if(isNaN(valor)) {
            throw `Falha no cadastro do produto, insira apenas números no campo de valor`
        }
        //Objeto:
        produto.id = id,
        produto.nome = nome,
        produto.descricao = descricao,
        produto.valor = valor,
        produto.incluidoEm = dataatual

        //Array:
        produtos.push(produto)
        // console.log(produtos)
        produto.id = id++;

        console.log(produtos)

        //Impressão:
        confirme.textContent = `Produto ${produto.nome} incluído com sucesso!`
        confirme.style.color = "#00ff00"

        //resetando display após inserção
        document.querySelector("#nome").value = ""
        document.querySelector("#valor").value = ""
        document.querySelector("#descricao").value = ""
    

        } catch (error) {
            confirme.textContent = error
            confirme.style.color = "#ff0000"
        } 
}

function listar(){
    let cont = 0
    tabela.innerHTML = ""
        // Clear table
    while (cont < produtos.length) {
        console.log(produtos.length)
        let linha = tabela.insertRow();
        // linha.textContent = "";

        let colunaId = linha.insertCell();
        let colunaNome = linha.insertCell();
        let colunaValor = linha.insertCell();
        let colunaEditar = linha.insertCell();
        let colunaApagar = linha.insertCell();
        
        colunaId.innerHTML = produtos[cont].id;
        colunaNome.textContent = produtos[cont].nome;
        colunaValor.textContent = produtos[cont].valor;

        let imagemEdit = document.createElement('img')
        imagemEdit.src = './assests/edit.svg'
        colunaEditar.appendChild (imagemEdit)
        imagemEdit.setAttribute("onclick", "editar("+ JSON.stringify(produtos[cont])+")")

        let imagemApagar = document.createElement('img')
        imagemApagar.src = './assests/excluir.png'
        colunaApagar.appendChild (imagemApagar)
        imagemApagar.setAttribute("onclick", "apagar("+produtos[cont].id+")")
        cont++;

        }
}

function editar(dados) {
    btn3 = document.querySelector("#editar")
    btn4 = document.querySelector("#btnid")
    textedit = document.querySelector("#textedit")
    document.querySelector("#nome").value = dados.nome
    document.querySelector("#valor").value = dados.valor
    document.querySelector("#descricao").value = dados.descricao
    const editar = document.querySelector ("#editar")
    textedit.textContent = "Insira o novo ID"
    editar.style.width = "30px";
    editar.style.height = "30px";
    editar.style.padding = "10px"
    btn4.style.width = "100px";
    btn4.style.height = "30px";
    btn4.value = "Confirmar";
    btn4.addEventListener ("onclick", atualizar(dados.id))
}


// function atualizar(id){
    // alert("teste")
    // let cont = 0
    // while (cont < produtos.length) {
    //     if(produtos[cont].id == id){
    //         produtos[cont].id = document.querySelector("#id").value
    //     }
    // }

function apagar(id) {
    let cont2 = 0
    let novosprodutos = []
    while (cont2 < produtos.length) {
        if(produtos[cont2].id != id ){
            novosprodutos.push(produtos[cont2]);    
        }
        cont2++;
    }
    produtos = novosprodutos
    console.log(produtos)
    listar();
}



