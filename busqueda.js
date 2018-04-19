$(function() {
    var boton = $("#boton");
    var fecha;
   var listfoto= new Array();
    /*evento que se activa cuando el usuario busaca a partir de una fecha determinada */
    boton.click( dateMin);
    /*funcion que busca a traves de flickr las imgenes subidas despues de fecha*/
    function dateMin(fecha){ 
        fecha = $("#fechaMin").val();
        alert(fecha);
        
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&min_taken_date=' + fecha +
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
        fecha = $("#fechaMin").val();
        $("#imagenes").append($("<p>"+fecha+"</p>"));
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