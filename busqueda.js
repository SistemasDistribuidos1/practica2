$(function() {
    var boton = $("#boton");
    var fecha = $("#fechaMin").value;
    function dateMin(){ 
        $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
	        + api_key + '&user_id=' +user_id + '&min_taken_date=' + fecha+
	        '&format=json&nojsoncallback=1',
	        mostrar_fotos
        );
    }
    boton.click( dateMin);

function mostrar_fotos(info){
	var i;
	for (i=0;i<info.photos.photo.length;i++) {
	   var item = info.photos.photo[i];
	   var url = 'https://farm'+item.farm+".staticflickr.com/"+item.server
		          +'/'+item.id+'_'+item.secret+'_m.jpg';
       console.debug(url);
       
       $("#imagenes").append($("<img/>"+"<p>"+2018+"</p>").attr("src",url));
      
    }
}

}
)	