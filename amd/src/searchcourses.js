define(['jquery','core/log','core/config','jqueryui'],function($,log,cfg){
    log.debug('Search Courses Autocomplete initialised');

        return {
            initialise: function () {
                $(document).ready(function() {
                $('#ac-input').autocomplete({
                    source: cfg.wwwroot+'/blocks/searchcourses/result.php',
                        /*source: function(request,response){
                        //$.getJSON(cfg.wwwroot+'/blocks/searchcourses/result.php' ,{query:request.term},response);

                        $.ajax({
                            url: cfg.wwwroot+'/blocks/searchcourses/result.php',
                            dataType: "json",
                            data: {
                                query: request.term
                            },

                        });
                    },*/
                    select: function( event, ui ) {
                        log.debug( ui.item);
                    }


                }).autocomplete( "instance" )._renderItem = function( ul, item ) {
                    return $( "<li>" )
                        .append( "<a href='"+cfg.wwwroot+"/course/view.php?id="+item.id+"'>" + item.fullname  + "</a>" )
                        .appendTo( ul );
                };


                });
            }
        };

});
