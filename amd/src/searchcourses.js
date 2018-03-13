/**
 * JavaScript required by the search auto-complete block
 *
 * @copyright  2016 University of Bath
 * @author Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later/**.
 */
define(['jquery', 'core/config','jqueryui','core/templates'], function ($, config,jqui,templates) {
    return {
        initialise: function (course_count) {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            });

            $('#course_search_ac .typeahead').autocomplete(
                {
                    source: config.wwwroot+"/blocks/searchcourses/ajax.php?course_count="+course_count,
                    minLength:2
                }
            ).autocomplete( "instance" )._renderItem = function( ul, item ) {
                var course_url = config.wwwroot+'/course/view.php?id='+item.id;
                var html = "<p>Course Full Name : "+item.fullname+ " </p><p>Course Short Name : "+item.shortname+" </p><p>Course ID Number : "+item.shortname+"</p>";
                var link = $("a").attr({
                    class : 'course-result-node',
                    "data-placement" : 'left',
                    href : course_url,
                    "data-toggle":'tooltip',
                    text : item.fullname,
                    title : html

                });
                /*templates.render('block_searchcourses/courseinfo',
                    {
                        'shortname': item.shortname,
                        'longname' : item.fullname,
                        'idnumber': item.idnumber
                    })
                    .then(function (html) {
                        console.log(html);
                        link.attr("title",html);
                        link.text(item.fullname);
                        //return html;
                    }).fail(function (ex) {
                });*/
                var tooltip_data = item.fullname;
                return $( "<li>" )
                    //.append(link)
                    .append( "<a id='course-result-node' data-placement='left' data-toggle='tooltip' title='"+tooltip_data+"' href='"+course_url+"'>" + item.fullname + "</a>" )
                    .appendTo( ul );
            };
        }
    }
});
