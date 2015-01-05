//Al caricamento del DOM inizializzo la tabella (creo sotto-div)
$(document).ready(function()
{
	var i=0;
	for (i = 0; i < 16; i++) 
	{	
    	var classeDiv = "celleTabella";
        var contenutoDiv;
        if(i == 15) 
        {
            contenutoDiv = "X";
        }
        else
        {
        	contenutoDiv = i+1;
        }

        var cella = $('<div />');
        cella.attr("id",i);
        cella.attr("onclick","clickCell(" +i+ ")");
        cella.addClass(classeDiv);
        cella.html(contenutoDiv);
        $("#mainTable").append(cella);
        //fare mescolamento
    }
    
     $("#btnMescola").click(function(){
     	alert("Rimescolare le celle")
      });
       $("#btnNuovaPartita").click(function(){
     	alert("Rimescolare le celle, azzerare tempo e mosse")
      });
});

//Ottimizzare
  function clickCell(id) 
  {
  	var aumentaMosse=true;
  	var numeroMosse=parseInt($("#mosse").text())
  		//alert($("#mainTable").children().eq(id+1).text());
	var testo=$("#mainTable").children().eq(id).text();
	if ($("#mainTable").children().eq(id+1).text()=="X" && id<16)
	{
		$("#mainTable").children().eq(id+1).html(testo);
		$("#mainTable").children().eq(id).html("X");
	}
	else if ($("#mainTable").children().eq(id-1).text()=="X" && id>0)
	{
		$("#mainTable").children().eq(id-1).html(testo);
		$("#mainTable").children().eq(id).html("X");
	}
	else if ($("#mainTable").children().eq(id+4).text()=="X")
	{
		$("#mainTable").children().eq(id+4).html(testo);
		$("#mainTable").children().eq(id).html("X");
	}
	else if ($("#mainTable").children().eq(id-4).text()=="X")
	{
		$("#mainTable").children().eq(id-4).html(testo);
		$("#mainTable").children().eq(id).html("X");
	}
	else
		aumentaMosse=false;
	//aumento contatore mosse
	if (aumentaMosse==true)
	{
		
		numeroMosse+=1;
		$("#mosse").html(numeroMosse);
		//controllo vincita
		controlloVincita();
	}
	aumentaMosse=true;
	
   }
  
//Ottimizzare con un while 
function controlloVincita()
{
	var vincita=true;
	for (i=0; i<15; i++)
	{
		if ($("#mainTable").children().eq(i).text()!=parseInt($("#mainTable").children().eq(i).attr("id"))+1)
			vincita=false;
	}
	if (vincita==true)
	{
		alert("hai vinto");
	//reset timer e mosse
	$("#mosse").html(0);
	}
}   

 