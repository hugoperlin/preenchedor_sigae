document.getElementById("btn").addEventListener("click",()=>{
    preencheFaltas();
})

function preenchedor(dados){
    var tabela = document.getElementsByTagName("table")[0];
    
    let checks = tabela.querySelectorAll('input[type="checkbox"]');

    for(let i=0;i<checks.length;i++){
        checks[i].click();
        checks[i].click();    
    }
    
    let inputs = tabela.querySelectorAll('input[type="number"]');

    if(inputs.length != dados.length){
        alert("Número insuficiente de faltas!");
        return;
    }

    for(let i=0;i<inputs.length;i++){ 
        inputs[i].value = dados[i];
    }
    alert("Feito!");
}

function preencheFaltas(){
    var entrada = document.getElementById("entrada_faltas");
    var dados = entrada.value.split("\n");
    
    if(dados[dados.length-1]==""){
        dados = dados.slice(0,dados.length-1);
    }
    
    if(dados.length < 1){
        alert("Não inseriu as faltas!");
        return;
    }
    
    chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        function(tabs) {
    
          chrome.scripting.executeScript({target:{tabId: tabs[0].id, allFrames: true}, func: getDiasAulas, args:[dados]},
            (injectionResults) => {
                for (const frameResult of injectionResults)
                  console.log('Frame Title: ' + frameResult.result);
          });
        }
      );
}


