
<h1 align="center">
  Desafio - desenvolvedor Full Stack 
</h1>
 
![Capturar](https://user-images.githubusercontent.com/27836893/93636351-26ed0900-f9ca-11ea-82be-be32309a9470.PNG)


## :construction_worker: Instalação e execução
1. Faça um clone desse repositório;</br>
   git clone https://github.com/matheusguermandi/desafio-geo.git
   
### Iniciar aplicação - Backend
1. Com o terminal aberto, verifique se está na pasta `desafio-geo\backend`;</br>
   Caso não esteja execute o comando `cd desafio-geo\backend`
   
2. Execute `yarn` para realizar a instalação das dependencias;

3. Execute `yarn dev:server` para realizar a inicialização da aplicação;

### Iniciar aplicação - Frontend
1. Com o terminal aberto, verifique se está na pasta `desafio-geo\frontend`;</br>
   Caso não esteja execute o comando `cd desafio-geo\frontend`
   
2. Execute `yarn` para realizar a instalação das dependencias;

3. Crie um arquivo .env dentro da pastar \src 

4. Copie o conteudo do .env.example e complete a API KEY do google</br>
   **OBS: Esse passo é de suma importância para o funcionamento correto da aplicação**

5. Execute `yarn start` para realizar a inicialização da aplicação;

## 📝 Rotas utilizadas
Rotas | Método 
------|--------
/deliveries| GET
/deliveries| POST
/deliveries/:id| DELETE
/deliveries| DELETE

## 🚀 Importar rotas para o Insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=DESAFIO%20ROUTEASY&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmatheusguermandi%2Fdesafio-geo%2Fmaster%2Fbackend%2Finsomnia.json%3Ftoken%3DAGUMDXKWK3IUAL5P4SS4W6C7LOUIW)

