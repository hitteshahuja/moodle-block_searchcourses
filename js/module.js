/**
 * JavaScript required by the search automcomplete block
 *
 * @copyright  2013 University of Bath
 * @author Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.search_autocomplete = M.search_autocomplete || {};
M.search_autocomplete.block_name = 'searchcourses';
YUI().use('autocomplete', 'autocomplete-highlighters', 'cookie', 'transition', function (Y) {



    var params = [];
    var InpNode = Y.one('#ac-input');
    //Autocomplete plugin
    M.search_autocomplete.AutoCompletePlugin(Y, InpNode, params);

    InpNode.on('click', function (e) {
        var my_courses_flag = Y.one('#my_courses_flag');
        var val = my_courses_flag.get('checked');
        if (params.length == 0) {
            params.course_count = [];
        }
        params.course_count = Y.one('#course_count').get('value');
        params.mycourseflag = val;
        M.search_autocomplete.AutoCompletePlugin(Y, this, params);
    });
});

M.search_autocomplete.init = function (Y, params) {
    this.Y = Y;
    YUI().use('autocomplete', 'autocomplete-highlighters', 'cookie', function (Y) {
        if (params.length == 0) {
            params.course_count = [];
        }
        //Add title to the value of the text-box
        var txtBox = Y.one('#ac-input');
        var my_courses_flag = Y.one('#my_courses_flag');
        var val = my_courses_flag.get('checked');
        var InpNode = Y.one('#ac-input');
    });
}
M.search_autocomplete.txtHelper = function (textBox) {
    var label = textBox.get('title');
    textBox.set('value', label);
    textBox.on(['click', 'focus'], function (e) {
        e.target.set('value', '');
    });
    textBox.on(['mousedown', 'blur'], function (e) {
        e.target.set('value', label);
    });
}
M.search_autocomplete.AutoCompletePlugin = function (Y, node, params) {
    if (typeof params === 'undefined') {
        params.course_count = [];
    }

    function courseFormatter(query, results) {
        return Y.Array.map(results, function (result) {
            var course = result.raw;
            var coursename = course.fullname;
            var courseshortname = course.shortname;
            var idnumber = course.idnumber;
            var highlighted = result.highlighted;
            var courselink = M.cfg.wwwroot + '/course/view.php?id=' + course.id;
            if (course.id == 'na') {
                var msg = '<i>No Results</i>';
                return Y.Lang.sub(noResTemplate, {
                    msg: msg
                });
            }
            // Use string substitution to fill out the  template and
            // return an HTML string for this result.
            return Y.Lang.sub(courseTemplate, {
                coursename: coursename,
                courselink: courselink,
                courseshortname : courseshortname,
                idnumber: idnumber,
                highlighted: highlighted
            });
        });

    } //End of courseFormatter function

    node.plug(Y.Plugin.AutoComplete, {
        resultFormatter: courseFormatter,
        resultHighlighter: 'phraseMatch',
        resultListLocator: 'results',
        alwaysShowList: true,
        resultTextLocator: 'fullname',
        source: M.cfg.wwwroot + '/blocks/searchcourses/result.php?query={query}&course_count=' + params.course_count + '&my_courses_flag=' + params.mycourseflag
    })
}
var noResTemplate = "<div class='course_results_ac'><div class='title'>{msg}</div></div>";
var courseTemplate = "<div class='course_results_ac'><a href='{courselink}'><div class='title'>({courseshortname}) {highlighted}</div></a></div>";