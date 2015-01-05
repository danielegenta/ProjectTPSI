//Al caricamento del DOM inizializzo la tabella (creo sotto-div)
//Variabili per cronometro
var start = "00:00.00";
    var go = false;
    var speed = 10;
    var a,b,c,d,e,f,u;
$(document).ready(function()
{	
	var i=0;
    avvia();
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
    	mescolaCelle();
    });
    $("#btnNuovaPartita").click(function(){
    	mescolaCelle();
    	nuovaPartita();
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
		alert("hai vinto (aggiungere dettagli: numero mosse e tempo");
		alert("Clicca su nuova partita per iniziare un altro match!")
		avvia();
	}
}   

function mescolaCelle() {}
function nuovaPartita()
{
//reset timer e mosse
	$("#mosse").html(0);
	avvia();
}


//cronometro
//tutto da rivedere ottimizzare
function avvia()
{   	
        if(go == false) {            
            start = "00:00.00";
            cnt = setInterval(function() {
                gostart();
            },speed);
        }else{
            go = false;
            clearInterval(cnt);
        }        
}
function gostart(){
	go = true;
    a = parseInt(start.charAt(0));
    b = parseInt(start.charAt(1));
    u = ":";
    c = parseInt(start.charAt(3));
    d = parseInt(start.charAt(4));
    e = ".";
    f = parseInt(start.charAt(6));
    g = parseInt(start.charAt(7));
        if(g >= 9) {
            g = 0;
            if(f >= 9) {
                f = 0;
                if(d >= 9) {
                    d = 0;
                    if(c >= 5) {
                        c = 0;
                        if(b >= 9) {
                            b = 0;
                            if(a >= 9) {
                                clearInterval(cnt);
                            }else{
                                a++;
                            }
                        }else{
                            b++;
                        }
                    }else{
                        c++;
                    }
                }else{
                    d++;
                }
            }else{
                f++;
            }
        } else {
            g++;
        }
        start = String(a) + String(b) + String(u) + String(c) + String(d) + String(e) + String(f) + String(g);
        for ( var i = 0; i < start.length; i++ ) {
            $("#s" + i).html(start.charAt(i))
        }
}
 