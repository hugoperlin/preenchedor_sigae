document.getElementById("btn").addEventListener("click",()=>{
    preencheFaltas();
});

document.getElementById("btnCopiar").addEventListener("click",()=>{
    copiador();
});

function copiar(){
    var linhas = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    var dados="";

    for(let i=0;i<linhas.length;i++){
        
        var colunas = linhas[i].getElementsByTagName("td");

        for(let i=0;i<4;i++){
            var texto = colunas[i].innerText;
            dados = dados+texto+"\t";
        }
        dados = dados+"\n";
        
    }
    
//Create a textbox field where we can insert text to. 
var copyFrom = document.createElement("textarea");

//Set the text content to be the text you wished to copy.
copyFrom.textContent = dados;

//Append the textbox field into the body as a child. 
//"execCommand()" only works when there exists selected text, and the text is inside 
//document.body (meaning the text is part of a valid rendered HTML element).
document.body.appendChild(copyFrom);

//Select all the text!
copyFrom.select();

//Execute command
document.execCommand('copy');

//(Optional) De-select the text using blur(). 
copyFrom.blur();

//Remove the textbox field from the document.body, so no other JavaScript nor 
//other elements can get access to this.
document.body.removeChild(copyFrom);

alert("Copiado!");
}

function copiador(){
    chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        function(tabs) {
    
          chrome.scripting.executeScript({target:{tabId: tabs[0].id, allFrames: true}, func: copiar, args:[]},
            (injectionResults) => {
                for (const frameResult of injectionResults)
                  console.log('Frame Title: ' + frameResult.result);
          });
        }
      );
}



function preenchedor(dados){
    
    var tabela = document.getElementsByTagName("table")[0];
    var linhas = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    if(linhas.length != dados.length){
        alert("Número insuficiente de faltas!");
        return;
    }

    for(let i=0;i<linhas.length;i++){
        let matricula = linhas[i].getElementsByTagName("td")[2].innerText;
        if(matricula != dados[i][0]){
            alert(`Problema na sequência de dados!\n ${matricula}!=${dados[i][0]}`);
            return;
        }
    }

    let checks = tabela.querySelectorAll('input[type="checkbox"]');

    for(let i=0;i<checks.length;i++){
        checks[i].click();
        checks[i].click();    
    }
    
    let inputs = tabela.querySelectorAll('input[type="number"]');

    for(let i=0;i<inputs.length;i++){ 
        inputs[i].value = dados[i][1];
    }
    alert("Feito!");
}

function preencheFaltas(){
    var entrada = document.getElementById("entrada_faltas");
    var linhas = entrada.value.split("\n");
    if(linhas[linhas.length-1]==""){
        linhas = linhas.slice(0,linhas.length-1);
    }

    var dados = [];

    for(let i=0;i<linhas.length;i++){
        dados.push(linhas[i].split("\t"));
    }
  
    if(dados.length < 1){
        alert("Não inseriu as faltas!");
        return;
    }
    
    chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        function(tabs) {
    
          chrome.scripting.executeScript({target:{tabId: tabs[0].id, allFrames: true}, func: preenchedor, args:[dados]},
            (injectionResults) => {
                for (const frameResult of injectionResults)
                  console.log('Frame Title: ' + frameResult.result);
          });
        }
      );
}


