//Al caricamento del DOM inizializzo la tabella (creo sotto-div)
$(document).ready(function()
{
	var i=0;
	for (i = 0; i < 16; i++) 
	{
    	var classeDiv = "celleTabella";
        var contenutoDiv = i;
        if(i == 16) 
        {
            contenutoDiv = "X";
        }
        var cella = $('<div />');
        cella.attr("id",i);
        cella.attr("onclick","clickCell(" + i + ")");
        cella.addClass(classeDiv);
        cella.html(contenutoDiv);
        $("#mainTable").append(cella);
    }
     $("#btnMescola").click(function(){
     	alert("Rimescolare le celle")
      });
       $("#btnNuovaPartita").click(function(){
     	alert("Rimescolare le celle, azzerare tempo e mosse")
      });
});

  function clickCell(id) {
        alert("hai cliccato: "+id);
    }
 