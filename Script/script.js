//Al caricamento del DOM inizializzo la tabella (creo sotto-div)
//Variabili per cronometro
var stringaTempo = "00:00", testoParagrafo="";
var i,j;
var scorriTempo = false, pausa=false, vincita=false,newPartita=false, risolvibilita=true;
var velocitaCronometro = 1000;
var decineMinuti,unitaMinuti,decimiSecondo,centesimiSecondo,e,f,separatoreMinSec;
//Setto impostazioni
$(document).ready(function()
{	
	$("p").hide();
    //Riempo il contenitore principale con le caselle (div)
	for (i = 0; i < 16; i++) 
	{	
    	var classeDiv = "celleTabella";
        var contenutoDiv;
        if(i == 15) 
        {
            contenutoDiv = "";
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
    }
    //Mescolo le celle per iniziare la partita da uno stato di non-vincita
    mescolaCelle();
    //Avvio cronometro
    switchCronometro();
    //Evento click su mescola celle
    $("#btnMescola").click(function(){
    	mescolaCelle();
    });
    //Evento click su nuova partita
    $("#btnNuovaPartita").click(function(){
    	newPartita=true;
    	nuovaPartita();
    });
    //Evento click su pausa (riavvio o stop del gioco)
     $("#btnPausa").click(function(){
    	switchCronometro();
    	if (pausa==false)
    		$("#btnPausa").html("Riavvia");
    	else
    		$("#btnPausa").html("Pausa");
    	pausa=!pausa;
    });
	//Evento click su come si gioca 
	$("#btnHowTo").click(function(){
		testoParagrafo="Qui come si gioca"
		stampaParagrafo(testoParagrafo);
	});
	//Evento click su informazioni
	$("#btnCrediti").click(function(){
		testoParagrafo="Qui crediti"
		stampaParagrafo(testoParagrafo);
	});
	//Evento click su crediti
	$("#btnInformazioni").click(function(){
		testoParagrafo="Qui informazioni"
		stampaParagrafo(testoParagrafo);
	});
});

//Funzione che nascone/mostra paragrafo rispetto al bottone cliccato
function stampaParagrafo(testoP)
{
		$("p").hide("fast");
		$("p").html(testoP);
		$("p").show("slow");
}


//Ottimizzare
//Evento click su una cella della tabella
  function clickCell(id) 
  {
  	if (pausa==false)
  	{
  	var aumentaMosse=true;
  	//Recupero il numero di mosse corrente
  	var numeroMosse=parseInt($("#mosse").text())
  	//Variabile ausiliaria utile allo scambio del testo
	var testo=$("#mainTable").children().eq(id).text();
	//Spostamenti sinistra, destra, giu o su
	if ($("#mainTable").children().eq(id+1).text()=="" && id<16 && $("#mainTable").children().eq(id+1).attr("id")!=undefined)
	{
		$("#mainTable").children().eq(id+1).html(testo);
		$("#mainTable").children().eq(id).html("");	
	}
	else if ($("#mainTable").children().eq(id-1).text()=="" && id>0 && $("#mainTable").children().eq(id-1).attr("id")!=undefined)
	{
		$("#mainTable").children().eq(id-1).html(testo);
		$("#mainTable").children().eq(id).html("");
	}
	else if ($("#mainTable").children().eq(id+4).text()=="" && $("#mainTable").children().eq(id+4).attr("id")!=undefined)
	{
		$("#mainTable").children().eq(id+4).html(testo);
		$("#mainTable").children().eq(id).html("");
	}
	else if ($("#mainTable").children().eq(id-4).text()=="" && $("#mainTable").children().eq(id-4).attr("id")!=undefined)
	{
		$("#mainTable").children().eq(id-4).html(testo);
		$("#mainTable").children().eq(id).html("");

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
	else
	{
		alert("gioco in pausa, cliccare riavvia per continuare la partita");
	}
   }
  
//Controllo la vincita mediante il confronto fra il testo e gli id (che sono ordinati in modo crescente)
function controlloVincita()
{
	vincita=false;
	i=0;
	do
	{
		if ($("#mainTable").children().eq(i).text()!=parseInt($("#mainTable").children().eq(i).attr("id"))+1)
			vincita=false;
		i++;
	}
	while (vincita==false && i<15)
	//Se ho vinto fermo il cronometro e mostro i dettagli della partita
	if (vincita==true)
	{
		switchCronometro();
		alert("HAI VINTO!!!\n\nTEMPO: "+$("#s0").text()+""+$("#s1").text()+":"+$("#s3").text()+""+$("#s4").text()+"\nMOSSE: "+$("#mosse").text()+"");
	}
}   

//Funzione che si occupa di mescolare le celle (il testo) appoggiandosi ad un vettore
function mescolaCelle() 
{
		var aus,r,lunghezza;
		do 
		{
		lunghezza=14;
		numeri=new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
		for(i=0;i<15;i++)
		{	
			r=randNum(0,lunghezza);
			$("#mainTable").children().eq(i).text(numeri[r]);
			aus=numeri[lunghezza];
			numeri[lunghezza]=numeri[r];
			numeri[r]=aus;
			lunghezza--;
		}
		controlloRisolvibilita();
		alert("e' possibile risolvere: "+risolvibilita);
        }
        while (risolvibilita==false)
}

//Funzione di generazione di un numero casuale
function randNum(min,max)
{
	var m=min;
	var n=max;
	var r=m+Math.round(Math.random()*n); return(r);
}

//Funzione che controlla se la matrice è risolvibile (vedere documentazione per ulteriori informazioni)
function controlloRisolvibilita()
{
	risolvibilita=true;
	var n1=0, n2=0;
	var somma=0, conta=0;
	for ( i=0; i<15; i++)
	{
		n1=parseInt($("#mainTable").children().eq(i).text());
		for ( j=i+1; j<15; j++)
			{
				n2=parseInt($("#mainTable").children().eq(j).text());
				if (n1>n2)
					conta++;
			}
			somma+=conta;
			conta=0;
	}
	if (somma%2!=0)
		risolvibilita=false;
}

//Funzione che inizializza le impostazioni della partita
function nuovaPartita()
{
	vincita=false;
	switchCronometro();
	$("#mosse").html(0);
	mescolaCelle();
}


//Funzioni legate a cronometro
//tutto da rivedere ottimizzare
//Interruttore aziona/ferma cronometro
function switchCronometro()
{   	
        if(scorriTempo == false) 
        {            
        	if (pausa==true)
        	avviaCronometro();
        	else
        	{
            stringaTempo = "00:00";
            cronometro = setInterval(function() {
                avviaCronometro();
            },velocitaCronometro);
            }
        }
        else if (scorriTempo==true)
        {
            scorriTempo = false;
        	if (newPartita==true)
        	{
        		clearInterval(cronometro);
        		switchCronometro();
        	}
        }   
        
}

//Misura il tempo e lo stampa
function avviaCronometro(){
	if (pausa==false  && vincita==false)
	{
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
                                clearInterval(cronometro);
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
        for ( i = 0; i < stringaTempo.length; i++ ) {
            $("#s" + i).html(stringaTempo.charAt(i))
        }
    }
}
 