/**
 * JavaScript required by the search auto-complete block
 *
 * @copyright  2016 University of Bath
 * @author Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later/**.
 */
define(['jquery', 'core/config',"jqueryui"], function ($, config,jqui) {
    return {
        initialise: function (course_count) {
            $(function () {
                $(document).tooltip({
                    content: function () {
                        return $(this).prop('title');
                    }
                });
            });

            $('#course_search_ac .typeahead').autocomplete(
                {
                    source: config.wwwroot+"/blocks/searchcourses/ajax/result.php?course_count="+course_count,
                    minLength:2
                }
            ).autocomplete( "instance" )._renderItem = function( ul, item ) {
                var course_url = config.wwwroot+'/course/view.php?id='+item.id;
                var tooltip_data = "<p><b>Short Name: </b>"+item.shortname+"</p>";
                return $( "<li>" )
                    .append( "<a id='course-result-node' data-placement='left' data-toggle='tooltip' title='"+tooltip_data+"' href='"+course_url+"'>" + item.fullname + "</a>" )
                    .appendTo( ul );
            };
        }
    }
});
