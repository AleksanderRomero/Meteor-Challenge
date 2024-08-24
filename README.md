# Meteor Challenge

### Tarefas:

1. **Contar o número de Estrelas.**
2. **Contar o número de Meteoros.**
3. **Se os Meteoros estão caindo perpendicularmente ao solo (nível da água), contar quantos cairão na água.**
4. **(Opcional) Encontrar a frase escondida nos pontos no céu.**

### Respostas:

- **Número de Estrelas:** 315
- **Número de Meteoros:** 328
- **Meteoros caindo na Água:** 105
- **(Opcional) Frase Escondida:** *Não encontrada*

---

## Explicação dos Resultados:

### 1. Contagem do Número de Estrelas:
- **Método:** Cada pixel da imagem foi analisado, verificando se o valor RGB correspondia ao branco puro `(255, 255, 255)`. Todos os pixels que atenderam a esse critério foram contados como estrelas.
  
- **Resultado:** Foram identificadas 315 estrelas.

### 2. Contagem do Número de Meteoros:
- **Método:** O mesmo procedimento de análise de pixels foi utilizado para identificar meteoros, verificando os pixels com valor RGB correspondente ao vermelho puro `(255, 0, 0)`.
  
- **Resultado:** Foram identificados 328 meteoros.

### 3. Contagem de Meteoros caindo na Água:
- **Método:** Para determinar quantos meteoros cairiam na água sem serem bloqueados pelas montanhas, o código verificou cada coluna vertical na imagem:
  
   - **Passo 1:** Identificou se um meteoro estava presente na coluna.
   - **Passo 2:** Se um meteoro foi encontrado, o código continuou verificando os pixels diretamente abaixo dele.
   - **Passo 3:** Se um pixel de água (azul) foi encontrado antes de um pixel de montanha (preto), o meteoro foi contado como caindo na água.
   - **Passo 4:** Se uma montanha foi encontrada primeiro, o meteoro não foi contado.
     
- **Resultado:** Foram identificados 105 meteoros que caem diretamente na água sem serem bloqueados pelas montanhas.

---

## Como Executar o Projeto:

### Pré-requisitos:
- **Node.js** deve estar instalado na sua máquina. Você pode verificar se o Node.js está instalado executando `node -v` no terminal.

### Instruções Passo a Passo:

1. **Clone o Repositório:**
   - Para obter o código, clone o repositório Git:
     ```bash
     git clone https://github.com/AleksanderRomero/Meteor-Challenge.git
     cd Meteor-Challenge
     ```

2. **Inicie o Projeto Node.js:**
   - Dentro do diretório do projeto, inicie um novo projeto Node.js:
     ```bash
     npm init -y
     ```

3. **Instale as Dependências:**
   - Instale a biblioteca `jimp`, que será usada para manipular imagens:
     ```bash
     npm install jimp
     ```

4. **Coloque a Imagem na Pasta do Projeto:**
   - Certifique-se de que a imagem que você deseja analisar esteja no diretório do projeto.

5. **Edite o Caminho da Imagem no Código:**
   - Abra o arquivo `tarken.js` (ou o nome que você deu ao arquivo) e atualize o valor de `imagePath` com o caminho correto da imagem.

6. **Execute o Código:**
   - No terminal, dentro do diretório do projeto, execute:
     ```bash
     node tarken.js
     ```

7. **Verifique os Resultados:**
   - Os resultados serão exibidos no console, mostrando o número de estrelas, meteoros, e quantos meteoros caem na água.

