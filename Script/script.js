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
        //div.attr("onclick","move(" + i + ")");
        cella.addClass(classeDiv);
        cella.html(contenutoDiv);
        $("#mainTable").append(cella);
    }
});