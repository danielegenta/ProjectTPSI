//Al caricamento del DOM inizializzo la tabella (creo sotto-div)
	 
$(document).ready(function()
{
	var i=0, j=0;
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

  function clickCell(id) 
  {
	alert($("#mainTable").children().eq(id+1).text());
	var testo=$("#mainTable").children().eq(id).text();
	if ($("#mainTable").children().eq(id+1).text()=="X")
	{

		$("#mainTable").children().eq(id+1).html(testo);
		$("#mainTable").children().eq(id).html("X");
	}
	else if ($("#mainTable").children().eq(id-1).text()=="X")
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
   }
 