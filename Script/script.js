//Al caricamento del DOM inizializzo la tabella (creo sotto-div)
//Variabili per cronometro
var stringaTempo = "00:00";
var scorriTempo = false;
var velocitaCronometro = 1000;
var decineMinuti,unitaMinuti,decimiSecondo,centesimiSecondo,e,f,separatoreMinSec;
//Setto impostazioni
$(document).ready(function()
{	
	var i=0;
	//Avvio cronometro
    switchCronometro();
    //Riempo il contenitore principale con le caselle (div)
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
        //Appendo al padre i div figli
        $("#mainTable").append(cella);
        //fare mescolamento
    }
    //Mescolo le celle per iniziare la partita da uno stato di non-vincita
    mescolaCelle();
    //Evento click su mescola celle
    $("#btnMescola").click(function(){
    	mescolaCelle();
    });
    //Evento click su nuova partita
    $("#btnNuovaPartita").click(function(){
    	mescolaCelle();
    	nuovaPartita();
    });
});

//Ottimizzare
//Evento click su una cella della tabella
  function clickCell(id) 
  {
  	var aumentaMosse=true;
  	//Recupero il numero di mosse corrente
  	var numeroMosse=parseInt($("#mosse").text())
  	//Variabile ausiliaria utile allo scambio del testo
	var testo=$("#mainTable").children().eq(id).text();
	//Spostamenti sinistra, destra, giu o su
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
	//Se nessuna cella è stata spostata non incremento il contatore di mosse, viceversa lo aumento di uno e controllo se ho vinto
	else
		aumentaMosse=false;
	if (aumentaMosse==true)
	{		
		numeroMosse+=1;
		$("#mosse").html(numeroMosse);
		controlloVincita();
	}
	//Ripristino lo stato della variabile ausiliatia
	aumentaMosse=true;
   }
  
//Ottimizzare con un while 
//Controllo la vincita mediante il confronto fra il testo e gli id (che sono ordinati in modo crescente)
function controlloVincita()
{
	var vincita=true;
	for (i=0; i<15; i++)
	{
		if ($("#mainTable").children().eq(i).text()!=parseInt($("#mainTable").children().eq(i).attr("id"))+1)
			vincita=false;
	}
	//Se ho vinto fermo il cronometro e mostro i dettagli della partita
	if (vincita==true)
	{
		alert("hai vinto (aggiungere dettagli: numero mosse e tempo");
		alert("Clicca su nuova partita per iniziare un altro match!")
		switchCronometro();
	}
}   

//Funzione che si occupa di mescolare le celle (testo)
function mescolaCelle() {}

//Funzione che inizializza le impostazione della partita
function nuovaPartita()
{
	$("#mosse").html(0);
	switchCronometro();
}


//Funzioni legate a cronometro
//tutto da rivedere ottimizzare
//Interruttore aziona/ferma cronometro
function switchCronometro()
{   	
        if(scorriTempo == false) 
        {            
            stringaTempo = "00:00";
            cnt = setInterval(function() {
                avviaCronometro();
            },velocitaCronometro);
        }
        else
        {
            scorriTempo = false;
            clearInterval(cnt);
        }        
}

//Misura il tempo e lo stampa
function avviaCronometro(){
	scorriTempo = true;
    decineMinuti = parseInt(stringaTempo.charAt(0));
    unitaMinuti = parseInt(stringaTempo.charAt(1));
    separatoreMinSec = ":";
    decimiSecondo = parseInt(stringaTempo.charAt(3));
    centesimiSecondo = parseInt(stringaTempo.charAt(4));
                if(centesimiSecondo >= 9) {
                    centesimiSecondo = 0;
                    if(decimiSecondo >= 5) {
                        decimiSecondo = 0;
                        if(unitaMinuti >= 9) {
                            unitaMinuti = 0;
                            if(decineMinuti >= 9)
                            {
                                clearInterval(cnt);
                            }
                            else
                            {
                                decineMinuti++;
                            }
                        }
                        else
                        {
                            unitaMinuti++;
                        }
                    }
                    else
                    {
                        decimiSecondo++;
                    }
                }
                else
                {
                    centesimiSecondo++;
                }
        //Stampo il tempo
        stringaTempo = String(decineMinuti) + String(unitaMinuti) + String(separatoreMinSec) + String(decimiSecondo) + String(centesimiSecondo);
        for ( var i = 0; i < stringaTempo.length; i++ ) {
            $("#s" + i).html(stringaTempo.charAt(i))
        }
}
 