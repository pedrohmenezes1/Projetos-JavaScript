console.log(`Trabalhando com listas`);
/*
const salvador = `salvador`;
const saoPaulo = `São Paulo`;
const rioDeJaneiro = `Rio de Janeiro`;
*/
const listadeDestinos = new Array (
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
);

listadeDestinos.push(`Curitiba`);//Adicionar item na lista
console.log(`Destinos possíveis`);
console.log(listadeDestinos);

listadeDestinos.slice(2, 1);
console.log(listadeDestinos);

console.log(listadeDestinos[2]);
