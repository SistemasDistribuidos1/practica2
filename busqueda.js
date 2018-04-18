$(function() {
    var boton = $("#boton");
    
   var listfoto= new Array();
    
    boton.click( dateMin);
    function dateMin(fecha){ 
        var fecha = $("#fechaMin").val();
        alert(fecha);
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&min_taken_date=' + fecha +
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }
    

function mostrar_fotos(info){
	var i;
	for (i=0;i<info.photos.photo.length;i++) {
        if (!containe(info.photos.photo[i])){
           
	    var item =info.photos.photo[i];
	    var url = 'https://farm'+item.farm+".staticflickr.com/"+item.server
		          +'/'+item.id+'_'+item.secret+'_m.jpg';
       console.debug(url);
       
       $("#imagenes").append($("<img/>"+"<p>"+2018+"</p>").attr("src",url)); 
        listfoto.push(info.photos.photo[i]);
        }
    }

      
    

}
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