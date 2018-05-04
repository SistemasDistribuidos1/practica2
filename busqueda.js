
$(function() {

    var boton = $("#boton");
    var fechaMin= $("#fechaMin");
    var fechaMax = $("#fechaMax1");
    var etiqueta = $("#etiqueta1");
    var lugar = $("#lugar1");
    var listfoto= new Array();
    /*evento que se activa cuando el usuario busca a partir de una fecha determinada */
    boton.click(dateMin, dateMax, tag, place, mediaType, freeText);
    
    
    /*funcion que busca a traves de flickr las imgenes subidas despues de fecha*/
    function dateMin(){ 
        $("#imagenes #busq").remove();
        var fecha = fechaMin.val();
            if(fecha.length > 0){
        
            $("#imagenes").append($("<p id=\"busq\">"+fecha+"</p>"));
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
                + api_key + '&user_id=' +user_id + '&min_taken_date=' + fecha +
                '&format=json&nojsoncallback=1',
                mostrar_fotos
            );
            }   
    }

    /*funcion que busca a traves de flickr las imagenes o videos subidos antes de fecha*/
    function dateMax(){ 
        $("#imagenes #busq").remove();
        var fechaMax = $("#fechaMax1").val();
            if(fechaMax.length > 0){
        
            $("#imagenes").append($("<p id=\"busq\">"+fechaMax+"</p>"));
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
                + api_key + '&user_id=' + user_id + '&max_taken_date=' + fechaMax +
                '&format=json&nojsoncallback=1',
                mostrar_fotos
            );
            }
    }

    function tag(){ 
        $("#imagenes #busq").remove();
        var etiqueta = $("#etiqueta1").val();
            if (etiqueta.length > 0){

            $("#imagenes").append($("<p id=\"busq\">"+etiqueta+"</p>"));
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
                + api_key + '&user_id=' +user_id + '&tags=' + etiqueta +
                '&format=json&nojsoncallback=1',
                mostrar_fotos
            );
            }
    }

    
    function place(){ 
        $("#imagenes #busq").remove();
        var lugar = $("#lugar1").val();
            if(lugar.length > 0){
            $("#imagenes").append($("<p id=\"busq\">"+lugar+"</p>"));
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
                + api_key + '&user_id=' +user_id + '&has_geo=' + lugar +
                '&format=json&nojsoncallback=1',
                mostrar_fotos
            );
            }
    }

    /*funcion que busca a traves de flickr las imagenes o videos subidos en función de su tipo, puediendo ser
      all(todos por defecto), photos(fotos) o videos*/
    function mediaType(){ 
        $("#imagenes #busq").remove();
        var tipo = $("#tipo1").val();
            if(tipo.length > 0){
            $("#imagenes").append($("<p id=\"busq\">"+tipo+"</p>"));
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
                + api_key + '&user_id=' +user_id + '&media=' + tipo +
                '&format=json&nojsoncallback=1',
                mostrar_fotos
            );
            }
    }
 
    /*funcion que busca fotos o videos cuyo titulo, etiqueta o descripcion contiene el texto buscado*/
    function freeText(){ 
        $("#imagenes #busq").remove();
        var texto = $("#texto1").val();
        
        if(texto.length > 0){
        $("#imagenes").append($("<p id=\"busq\">"+texto+"</p>"));
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&text=' + texto +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
        }
    }


    /**
     * muestras las fotos obtenidas de flickr
     * @param info 
     */
    function mostrar_fotos(info){
        
        
        $("#imagenes #img").remove(); 
        
        var i;
        
	    for (i=0;i<info.photos.photo.length;i++) {
	        var item =info.photos.photo[i];
	        var url = 'https://farm'+item.farm+".staticflickr.com/"+item.server
		          +'/'+item.id+'_'+item.secret+'_m.jpg';
            console.debug(url);       
            $("#imagenes").append($("<img id=\"img\" style=width: 180px; height: 150px;\" width=\"180\" height=\"150\"/>").attr("src",url));                         
        }
        $("#imagenes #img").click(zoom);
        
         
    }

    function validar(){
        var validado = true;
        elementos = document.getElementsByClassName("inputFormu");
        for(i=0;i<elementos.length;i++){
          if(!elementos[i].value == "" || !elementos[i].value == null){
          validado = false
          }
        }
        
        
      }


    /*Cambia el tamaño de la imagen*/
    var nW,nH,oH,oW;
    function zoom(info){
         var iWideSmall="180px";
         var iHighSmall="150px";
         var iWideLarge="540px";
         var iHighLarge="450px";
        
        oW=this.style.width;
        oH=this.style.height;
        if((oW==iWideLarge)||(oH==iHighLarge)){ 
            nW=iWideSmall;
            nH=iHighSmall; }
        else{ 
            nW=iWideLarge;
            nH=iHighLarge;
            } 
        this.style.width=nW;
        this.style.height=nH;
    }


}
)	