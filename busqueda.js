
$(function() {

   var boton = $("#boton");
    var fechaMin= $("#fechaMin");
   var listfoto= new Array();
    /*evento que se activa cuando el usuario busaca a partir de una fecha determinada */
    boton.click( dateMin);
    
    /*funcion que busca a traves de flickr las imgenes subidas despues de fecha*/
    function dateMin(fecha){ 

        var fecha = $("#fechaMin").val();
       
        $("#imagenes").append($("<p>"+fecha+"</p>"));
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&min_taken_date=' + fecha +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }
    var botonMax = $("#botonMax");
    botonMax.click(dateMax);
    /*funcion que busca a traves de flickr las imagenes o videos subidos antes de fecha*/
    function dateMax(fechaMax){ 
        var fechaMax = $("#fechaMax1").val();
        $("#imagenes").append($("<p>"+fechaMax+"</p>"));
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&max_taken_date=' + fechaMax +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }
    var botonTag = $("#botonTag");
    botonTag.click(tag);
    
    function tag(etiqueta){ 
        var etiqueta = $("#etiqueta1").val();
        $("#imagenes").append($("<p>"+etiqueta+"</p>"));
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&tags=' + etiqueta +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }

    

    var botonPlace = $("#botonPlace");
    botonPlace.click(place);
    
    function place(lugar){ 
        var lugar = $("#lugar1").val();
        $("#imagenes").append($("<p>"+lugar+"</p>"));
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&has_geo=' + lugar +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }

    var botonMediaType = $("#botonMediaType");
    botonMediaType.click(mediaType);
    /*funcion que busca a traves de flickr las imagenes o videos subidos en función de su tipo, puediendo ser
      all(todos por defecto), photos(fotos) o videos*/
    function mediaType(tipo){ 
        var tipo = $("#tipo1").val();
        $("#imagenes").append($("<p>"+tipo+"</p>"));
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&media=' + tipo +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }
    
    var botonText = $("#botonText");
    botonText.click(freeText);
    /*funcion que busca fotos o videos cuyo titulo, etiqueta o descripcion contiene el texto buscado*/
    function freeText(texto){ 
        var texto = $("#texto1").val();
        $("#imagenes").append($("<p>"+texto+"</p>"));
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&text=' + texto +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }
    /**
     * muestras las fotos obtenidas de flickr
     * @param info 
     */
    function mostrar_fotos(info){
	    var i;
	    for (i=0;i<info.photos.photo.length;i++) {
            if (!containe(info.photos.photo[i])){
           
	        var item =info.photos.photo[i];
	        var url = 'https://farm'+item.farm+".staticflickr.com/"+item.server
		          +'/'+item.id+'_'+item.secret+'_m.jpg';
        console.debug(url);
       
        $("#imagenes").append($("<img/>").attr("src",url)); 
        
        listfoto.push(info.photos.photo[i]);
            }
        }
       
    }

    /**
     * comprueba si la foto ya estaba o se acaba de subir
     *  
     */
    function containe(foto){
        var esta=false;
        var j;
        for(j=0;j<listfoto.length;j++){
            if(foto==listfoto[j])
                esta=true;
        }
        return esta;
    }


}
)	