# Projeto Firebase com NodeTS

<div style="display: inline-block;">
  <img style="width: 200px; vertical-align: middle;" alt="firebase" src="https://jafapps.com.br/wp-content/uploads/2019/01/jafapps_.png"/>
  <img style="width: 200px; vertical-align: middle;" alt="nodejs" src="https://miro.medium.com/v2/resize:fit:900/1*TY9uBBO9leUbRtlXmQBiug.png"/>
  <img style="width: 200px; vertical-align: middle;" alt="typescript" src="https://www.svgrepo.com/show/374144/typescript.svg"/>
</div>

## Tecnologias Usadas

- **Firebase**
  - Emulators: Functions e Firestore
- **NodeJS**

## Requisitos

- **Node.js** versão 18 ou superior
- **NPM** versão 10.1.0

## Instalação

Para instalar os pacotes necessários, utilize o NPM:

```bash
npm install
```

## Scripts Disponíveis

- `lint`: Verifica o código utilizando ESLint.
- `build`: Compila o código TypeScript.
- `build:watch`: Compila o código TypeScript em modo watch.
- `serve`: Compila o código e inicia os emuladores do Firebase (apenas Functions).
- `shell`: Compila o código e inicia o shell do Firebase Functions.
- `start`: Inicia o shell do Firebase Functions.
- `deploy`: Realiza o deploy das Functions para o Firebase.
- `logs`: Exibe os logs das Functions no Firebase.
- `test`: Executa os testes utilizando Jest.
- `test:watch`: Executa os testes em modo watch.

## Execução

Execute os comandos na pasta /functions:

- `build`: Compila o código TypeScript.

Navegue para raiz do projeto e execute o emulador do firebase com

```shell
  firebase emulators:start
```

## Endpoints

### POST /fireStoreFunction

Envia dados para o Firestore.

#### Corpo da Requisição

```json
{
  "name": "string"
}
```

## Testes

Os arquivos de teste estão localizados dentro do projeto. Para executá-los, utilize o comando:

```bash
npm test
npm test:watch
```
