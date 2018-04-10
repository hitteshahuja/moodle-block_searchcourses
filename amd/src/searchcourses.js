/**
 * JavaScript required by the search auto-complete block
 *
 * @copyright  2018 University of Bath
 * @author Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later/**.
 */
define(['jquery', 'core/config', 'jqueryui', 'core/templates', 'block_searchcourses/courseinfo'], function ($, config, jqui, templates, courseinfo) {
    var source = config.wwwroot + "/blocks/searchcourses/ajax.php?course_count=0";
    var course_url = config.wwwroot + '/course/view.php?id=';
    return {
        initialise: function () {
            $('#course_search_ac #ac-input').autocomplete(
                {
                    source: source,
                    minLength: 2,
                    search: function (event, ui) {
                        var loadingImg = document.createElement("img");
                        $(loadingImg).attr("src", M.util.image_url('/i/ajaxloader', 'moodle'));
                        $(loadingImg).attr("alt", "Loading");
                        $(loadingImg).attr("class", "block_searchcourses-loader");
                        $(loadingImg).insertAfter($(this));
                    },
                    response: function (event, ui) {
                        // Show a loading icon
                        $('.block_searchcourses-loader').hide();

                    },
                    focus: function (event, ui) {
                        console.log("foc");
                    },
                    select: function (event, ui) {
                        console.log(ui);
                        courseinfo.showcourseinfo(ui.item);
                        /*$( "#project" ).val( ui.item.label );
                        $( "#project-id" ).val( ui.item.value );
                        $( "#project-description" ).html( ui.item.desc );
                        $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );*/
                        //return false;
                    }
                }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div class='courseresultnode'>\n" +
                        "  <span><strong>Full Name: </strong> <span class='label label-info'>" + item.fullname + "</span> </p>\n" +
                        "    <p><strong> Short Name: </strong><span class='label label-info'> " + item.shortname + " </span> </p>\n" +
                        "     <p><strong> ID Number: </strong> <span class='label label-info'>" + item.idnumber + " </span> </p>\n" +
                        "  <p><strong> Category: </strong> <span class='label label-info'>" + item.category + " </span> </p>\n" +
                        "</div>")
                    .appendTo(ul);
            };
        }

    }
});
