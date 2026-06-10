const imagens = document.querySelectorAll('.carrossel img');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');

let indiceAtual = 0;

function trocarImagem(novoIndice){
    imagens[indiceAtual].classList.remove('ativa');
    indiceAtual = novoIndice;
    imagens[indiceAtual].classList.add('ativa');
}

setaDireita.addEventListener('click', function() {
    let proximo = (indiceAtual + 1) % imagens.length;
    trocarImagem(proximo);
});

setaEsquerda.addEventListener('click', function() {
    let anterior = (indiceAtual - 1 + imagens.length) % imagens.length;
    trocarImagem(anterior);
});