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
                    response: function(event, ui){
                        //hide the loading img
                        $('.block_searchcourses-loader').hide();


                    }
                }).autocomplete("instance")._renderItem = function (ul, item) {
                var that = $(this);
                var template = templates.render('block_searchcourses/courseinfo',
                    {
                        'longname' : item.fullname,
                        'course_url': course_url+ item.id
                    })
                    .done(function (html) {
                        return $("<li>").append(html).appendTo(ul);
                    }).fail(function (ex) {
                });
                //this is need for the autocomplete to work
                return $("<li>").appendTo(ul);
            };
        }

    }
});
