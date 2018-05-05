
$(function() {

    var boton = $("#boton");
    var fechaMin= $("#fechaMin");
    
    /*var etiqueta = $("#etiqueta1");*/
    var lugar = $("#lugar1");
    var listfoto= new Array();
    /*evento que se activa cuando el usuario pulsa buscar */
    boton.click(buscar);

    
    
    /*funcion que busca a traves de flickr las imgenes */
    function buscar(){ 
        $("#imagenes .busq").remove();
        var fecha ='&min_taken_date=' + $("#fechaMin").val();
        var fechaMax ='&max_taken_date='+ $("#fechaMax1").val();
        var etiqueta ='&tags='+ $("#etiqueta1").val();
        var lugar ='&has_geo='+ $("#lugar1").val();
        var tipo = '&media='+$("#tipo1").val();
        var texto = '&text='+$("#texto1").val();
       
            if(fechaMin.val().length = 0){
                fecha="";
            }
            if($("#fechaMax1").val().length = 0){
                fechaMax="";
            }
            if($("#etiqueta1").val().length = 0){
                etiqueta="";
            }
            if($("#lugar1").val().length = 0){
                lugar="";
            }
            if($("#tipo1").val().length = 0){
                tipo="";
            }
            if($("#texto1").val().length = 0){
                texto="";
            }
 

                 $("#imagenes").append($("<p class=\"busq\"> A partir de la fecha: "+$("#fechaMin").val()+". "+
                 "Antes de la fecha: "+$("#fechaMax1").val()+". "+
                 "Con etiqueta: "+$("#etiqueta1").val()+". "+
                 "Esta geocalizado(0=no/otra cosa=si): "+$("#lugar1").val()+". "+
                 "Tipo de multimedia: "+$("#tipo1").val()+". "+
                 "Contiene el texto: "+$("#texto1").val()+". "+"</p>"));
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=' 
                + api_key + '&user_id=' +user_id +  fecha + fechaMax +etiqueta+lugar+tipo+texto+
                '&format=json&nojsoncallback=1',
                mostrar_fotos
            );
             
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