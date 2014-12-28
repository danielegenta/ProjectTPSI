//Al caricamento del DOM inizializzo la tabella (creo sotto-div)
$(document).ready(function(){
	for (var i = 1; i < 17; i++) {
    	var cl = "nm";
        var cn = i;
        if(i == 16) 
        {
            cn = "X";
        }
        var div = $('<div />');
        div.attr("id",i);
        //div.attr("onclick","move(" + i + ")");
        div.addClass(cl);
        div.html(cn);
        $("#mainTable").append(div);
        }
});