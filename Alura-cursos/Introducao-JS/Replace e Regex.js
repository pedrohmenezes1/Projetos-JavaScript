const CPFSemFormatacao = 'cpf é 25684677037'

const CPFFormatado = CPFSemFormatacao.replace('25684677037', '256.846.770-37') 

console.log(CPFFormatado) 
// O retorno será 'cpf é 256.846.770-37'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const frase = 'Frase com uma palavra-feia'

  frase.replace('palavra-feia', '********') 

  console.log(frase) // O retorno seria 'Frase com uma ********')

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const frase = 'Frase com uma palavra-feia e tem outra palavra-feia no final'

  const fraseAtualizada = frase.replace('palavra-feia', '********') 
  console.log(fraseAtualizada) // O retorno seria "Frase com uma ******** e tem outra palavra-feia no final"

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const frase = 'Frase que começa com um palavra-feia e tem outra palavra-feia no final'

  const fraseAtualizada = frase.replace(/palavra-feia/, '********') 
  console.log(fraseAtualizada) // "Frase que começa com um ******** e tem outra ******** no final"

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const cpf = '12345679810'

  const cpfFormatado = cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")

  console.log(cpfFormatado) // O retorno seria 256.846.770-37