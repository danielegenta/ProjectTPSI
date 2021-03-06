//Variabili globali
//Variabili per cronometro
var stringaTempo = "00:00", testoParagrafo="";
var i,j, aus,nCasuale;
var scorriTempo = false, pausa=false, vincita=false,newPartita=false, risolvibilita=true, graficaDark=true;
var nomeGiocatore;
var velocitaCronometro = 1000;
var decineMinuti,unitaMinuti,decineSecondi,unitaSecondi,e,f,separatoreMinSec;
//Al caricamento del DOM inizializzo la tabella (creo sotto-div) e setto impostazioni
$(document).ready(function()
{	
	$("p").hide();
	inputGiocatore();
    //Riempo il contenitore principale con le caselle (div)
	for (i = 0; i < 16; i++) 
	{	
    	var classeDiv = "celleTabella";
        var contenutoDiv;
        if(i == 15) 
            contenutoDiv = "";
        else
        	contenutoDiv = i+1;
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
    //Controllo se le celle son state mescolate in modo ordinato
    controlloVincita();
    //Se una cella è al posto giusto viene colorata
    coloraCelle();
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
		testoParagrafo="  L'obiettivo del gioco e' quello di formare una scala crescente, da uno a quindici, con le caselle a disposizione."+
		"Per raggiungere questo obiettivo e' necessario spostare le varie caselle sfruttando la sedicesima che e' vuota.E' possibile usufruire "+
		"di una funzione pausa la quale ferma il timer e inibisce il proseguimento del gioco fintanto che rimane attivaUlteriori strumenti sono "+
		"il timer anche se non ci sono limiti di tempo (se non il vostro record) e il contatore di mosse (anche qui non vi sono limiti.Il gioco "+
		"e' strutturato in modo da essere sempre risolvibile con un numero finito di mosse, per ulteriori informazioni cliccare sull'apposito bottone.";
		stampaParagrafo(testoParagrafo);
	});
	//Evento click su informazioni
	$("#btnCrediti").click(function(){
		testoParagrafo="  Il progetto e' stato interamente sviluppato da: Daniele Genta, Davide Massimino, Mite Nikolov e Samuele Levrone.Vedere la cartella "+
		"links utili per ulteriori informazioni sugli stili."
		stampaParagrafo(testoParagrafo);
	});
	//Evento click su crediti
	$("#btnInformazioni").click(function(){
		testoParagrafo="  Il gioco del 15 non e' sempre risolvibile, esso infatti puo' risultare impossbile da risolvere con un numero finito di mosse.Per stabilire "+
		"la risolvibilita' della matrice e' necessario utilizzare la matematica.Occorre infatti calcolare per ogni numero (eccetto l'uno) da quanti numeri "+
		"minori di se stesso e' seguito (scorrere la matrice da sx a dx). Dopo avere sommato tutte queste occorrenze se la somma e' pari: la matrice e' risolvibile, "
		"viceversa non lo e'. Fonti: vedere liks utili."
		stampaParagrafo(testoParagrafo);
	});
	//Cambio di grafica
	$("#btnGraficaBright").click(function(){
		graficaDark=false;
		$("body").css({
						"color": "black",
      				  	"background": "#e2e2e2"
    					});
    	$("#Titolo, .bottomTable").css("color","black");
		$(".background, p").css("background","lightgrey");
		$(".celleTabella").css("background","#f0f9ff");
    	$(".topButton, .middleButton, .bottomButton").css({
      				  										"background": "#fcfff4",
      														"color": "black"
    													 });
    	coloraCelle();
	});
	$("#btnGraficaDark").click(function(){
		graficaDark=true;
		$("body").css({
						"background": "radial-gradient(black 15%, transparent 16%) 0 0, radial-gradient(black 15%, transparent 16%) 8px 8px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px",
						"background-color":"#282828",
						"background-size":"16px 16px"
    					});
    	$(".background, p").css({
    							"background":"#474747",
								"width":"600px",
								"border-radius":"20px"	
    							});
    	$(".celleTabella").css({
    							"background": "linear-gradient(63deg, #999 23%, transparent 23%) 7px 0, 		linear-gradient(63deg, transparent 74%, #999 78%), 		linear-gradient(63deg, transparent 34%, #999 38%, #999 58%, transparent 62%), #444",
    						   	"background-size": "16px 48px"
    						   });
    	$(".topButton, .middleButton, .bottomButton").css({
      				  										"color": "#fff",
															"background-color": "#222"
    													});
    	$("#Titolo, .bottomTable").css("color","#222");
    	coloraCelle();
	});
});

//Funzione che nascone/mostra paragrafo rispetto al bottone cliccato
function stampaParagrafo(testoParagrafo)
{
		$("p").hide("fast");
		$("p").html(testoParagrafo);
		$("p").show("slow");
}


//Ottimizzare
//Evento click su una cella della tabella
function clickCell(id) 
{
	if (pausa==false)
	{
		//Recupero il numero di mosse corrente
		var numeroMosse=parseInt($("#mosse").text())
  		//Variabile ausiliaria utile allo scambio del testo
		var testo=$("#mainTable").children().eq(id).text();
		possibiliSpostamenti= new Array(-1,1,-4,4);
		var spostato=false;
		var obiettivo, i=0;
		//Spostamenti sinistra, destra, giu o su
		do
		{
			obiettivo=(possibiliSpostamenti[i]);
			if ($("#mainTable").children().eq(id+obiettivo).text()=="" && $("#mainTable").children().eq(id+obiettivo).attr("id")!=undefined)
			{
				$("#mainTable").children().eq(id+obiettivo).html(testo);
				$("#mainTable").children().eq(id).html("");	
				spostato=true;
			}
			i++;		
		}
		while (spostato==false && i<4)
		//Se nessuna cella è stata spostata non incremento il contatore di mosse, viceversa lo aumento di uno e controllo se ho vinto
		if (spostato==true)
		{		
			numeroMosse+=1;
			$("#mosse").html(numeroMosse);
			controlloVincita();
		}
		//Ripristino lo stato della variabile ausiliatia
		aumentaMosse=true;
		coloraCelle();
	}
	else
		alert("gioco in pausa, cliccare riavvia per continuare la partita");
}
  
//Controllo la vincita mediante il confronto fra il testo e gli id (che sono ordinati in modo crescente)
function controlloVincita()
{
	vincita=true;
	i=0, n=0;
	for (j=0; j<15;j++)
	{
		var n=parseInt($("#mainTable").children().eq(j).attr("id"));
		n+=1;
		if ($("#mainTable").children().eq(j).text()!=n)
		{
			vincita=false;
		}
	}
	//Se ho vinto fermo il cronometro e mostro i dettagli della partita
	if (vincita==true)
	{
		vittoria();
		switchCronometro();
	}
}   

//Funzione che gestisce l'evento vittoria e la animazione
function vittoria()
{
	alert("Complimenti"+nomeGiocatore+"!!!\n\nTEMPO: "+$("#s0").text()+""+$("#s1").text()+":"+$("#s3").text()+""+$("#s4").text()+"\nMOSSE: "+$("#mosse").text()+"");
	var carattere="",stringaVittoria="Complimenti!!!!!";
	//Animazione
	var schermataVittoria=setInterval(function(){
		$("#mainTable").children().eq(i).animate({  borderSpacing: -360 }, {
    	step: function(now,fx) {
      		$(this).css('-webkit-transform','rotate('+now+'deg)'); 
     		$(this).css('-moz-transform','rotate('+now+'deg)');
      		$(this).css('transform','rotate('+now+'deg)');
    	},duration:'slow'},'linear');
		carattere=stringaVittoria.substring(i,i+1);
		$("#mainTable").children().eq(i).html(carattere);
		$("#mainTable").children().eq(i).css("color","red");
		i++;
		if (i==16)
		clearInterval(schermataVittoria);
	},100);
}

//Funzione che si occupa di mescolare le celle (il testo) appoggiandosi ad un vettore
function mescolaCelle() 
{
	aus=0;
	nCasuale=0;
	puliziaCelle();
	do 
	{
		lunghezzaVett=14;
		vettoreTestoCelle=new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
		for (i=0 ; i<15; i++)
		{	
			nCasuale=randNum(0,lunghezzaVett);
			$("#mainTable").children().eq(i).text(vettoreTestoCelle[nCasuale]);
			$("#mainTable").children().css("color","#222");
			aus=vettoreTestoCelle[lunghezzaVett];
			vettoreTestoCelle[lunghezzaVett]=vettoreTestoCelle[nCasuale];
			vettoreTestoCelle[nCasuale]=aus;
			lunghezzaVett--;
		}
		controlloRisolvibilita();
		alert("e' possibile risolvere: "+risolvibilita);
    }
    while (risolvibilita==false)
}

//Funzione di generazione di un numero casuale (appoggio per mescolamento)
function randNum(min,max)
{
	var m=min;
	var n=max;
	var nCasuale=m+Math.round(Math.random()*n); return(nCasuale);
}

//Funzione che ri-inizializza il testo nelle celle
function puliziaCelle() 
{
	for (i=0; i<16; i++)
	{
		 if (graficaDark==true)
		{
			$("#mainTable").children().eq(i).css({
    							"background": "linear-gradient(63deg, #999 23%, transparent 23%) 7px 0, 		linear-gradient(63deg, transparent 74%, #999 78%), 		linear-gradient(63deg, transparent 34%, #999 38%, #999 58%, transparent 62%), #444",
    						   	"background-size": "16px 48px"
    						   });
		}
		else
		{
			$("#mainTable").children().eq(i).css("background","#f0f9ff");
		}
	}
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
	pausa=false;
	newPartita=false;
	inputGiocatore();
}

//Funzione che gestisce il nome del nomeGiocatore
function inputGiocatore()
{
	nomeGiocatore=prompt("Inserire nome giocatore", nomeGiocatore);
	if (nomeGiocatore=="" || nomeGiocatore==null || nomeGiocatore==undefined)
		nomeGiocatore="Player 1";
	$("#nomeGiocatore").html(nomeGiocatore);
}

//Funzioni legate a cronometro
function switchCronometro()
{   	
    if(scorriTempo == false) 
    {            
        if (pausa==true)
        	avviaCronometro();
        else
        {
        	stringaTempo = "00:00";
            cronometro = setInterval(function() 
            {
                avviaCronometro();
            },velocitaCronometro);
        }
    }
    else if (scorriTempo==true)
    {
        scorriTempo = false;
        if (newPartita==true)
        {
        	pausa=false;
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
    decineSecondi = parseInt(stringaTempo.charAt(3));
    unitaSecondi = parseInt(stringaTempo.charAt(4));
                if(unitaSecondi >= 9) {
                    unitaSecondi = 0;
                    if(decineSecondi >= 5) {
                        decineSecondi = 0;
                        if(unitaMinuti >= 9) {
                            unitaMinuti = 0;
                            if(decineMinuti >= 9)
                                clearInterval(cronometro);
                            else
                                decineMinuti++;
                        }
                        else
                            unitaMinuti++;
                    }
                    else
                        decineSecondi++;
                }
                else
                    unitaSecondi++;
        //Stampo il tempo
        stringaTempo = String(decineMinuti) + String(unitaMinuti) + String(separatoreMinSec) + String(decineSecondi) + String(unitaSecondi);
        for ( i = 0; i < stringaTempo.length; i++ ) {
            $("#s" + i).html(stringaTempo.charAt(i))
        }
    }
}


function coloraCelle()
{
/*
	for (i=0; i<16; i++)
	{
		if($("#mainTable").children().eq(i).text()==(parseInt($("#mainTable").children().eq(i).attr("id"))+1))
			$("#mainTable").children().eq(i).css("background","lightgreen")
		else if (graficaDark==true)
		{
			$("#mainTable").children().eq(i).css({
    							"background": "linear-gradient(63deg, #999 23%, transparent 23%) 7px 0, 		linear-gradient(63deg, transparent 74%, #999 78%), 		linear-gradient(63deg, transparent 34%, #999 38%, #999 58%, transparent 62%), #444",
    						   	"background-size": "16px 48px"
    						   });
		}
		else
		{
			$("#mainTable").children().eq(i).css("background","#f0f9ff");
		}
	}
*/
}