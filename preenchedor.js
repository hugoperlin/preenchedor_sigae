document.getElementById("btn").addEventListener("click",()=>{
    preencheFaltas();
})

function getDiasAulas(x1){
    var tabela = document.getElementsByTagName("table")[0];
    var header = tabela.getElementsByTagName("thead")[0];
    
    function clicou(evt,x2){
        let colunaAula = evt.target;
        let aula = colunaAula.className.split(" ")[0];
        let celulas = tabela.getElementsByClassName("aula_"+aula);
        
        if(celulas.length != x2.length){
            alert("Número insuficiente de faltas!");
            return;
        }

        for(let i=0;i<celulas.length;i++){        
            celulas[i].innerHTML = x2[i];
        }
    }

    for(let i=0;i<header.children.length;i++){
        header.children[i].addEventListener("dblclick",(evt)=>{clicou(evt,x1);});
    }

    

}

function preencheFaltas(){
    var entrada = document.getElementById("entrada_faltas");
    var dados = entrada.value.split("\n");
    
    if(dados[dados.length-1]==""){
        dados = dados.slice(0,dados.length-1);
    }
    
    if(dados.length <= 1){
        console.log("aqui...");
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
      alert("Clique uma vez no dia a ser preenchido!\n Depois novamente, mas com dois cliques!");
}


