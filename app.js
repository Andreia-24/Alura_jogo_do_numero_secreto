let listaNumSort = [];
let numFinal = parseInt (Math.random () * 5000 + 1);
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Male",{rate: 1.5});
}

function msgInicial(){
    exibirTextoNaTela("h1","Jogo do número secreto");
    exibirTextoNaTela("p",`Escolha um número entre 1 e ${numFinal}`);
}

msgInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1","acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas":"tentativa";
        let msgTentativas = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p",msgTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela("p","número secreto é menor");
        } else {
            exibirTextoNaTela("p","número secreto é maior");
        }
        tentativas++; 
        limparTxt();
    }
}

function gerarNumeroAleatorio() {
    let numSort = parseInt(Math.random () * numFinal + 1);
    let quantElementosLista = listaNumSort.length;
    if (quantElementosLista == numFinal){
        listaNumSort = {};
    }
    if (listaNumSort.includes(numSort)){
        return gerarNumeroAleatorio();
    } else {
        listaNumSort.push(numSort);
        return numSort;
    }
}

function limparTxt(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reboot(){
    numeroSecreto = gerarNumeroAleatorio();
    limparTxt();
    tentativas = 1;
    msgInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}