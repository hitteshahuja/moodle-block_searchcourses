/**
 * JavaScript required by the search auto-complete block
 *
 * @copyright  2016 University of Bath
 * @author Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later/**.
 */
define(['jquery', 'core/config',"jqueryui"], function ($, config,jqui) {
    var courses = ['Hello'];
    return {
        initialise: function (course_count) {
            console.log("Initi");
            $('#course_search_ac .typeahead').autocomplete(
                {
                    source: config.wwwroot+"/blocks/searchcourses/ajax/result.php",
                    minLength:2
                }
            ).autocomplete( "instance" )._renderItem = function( ul, item ) {
                console.log(item);
                return $( "<li>" )
                    .append( "<a>" + item.id + "<br>" + item.fullname + "</a>" )
                    .appendTo( ul );
            };
        }
    }
});
