<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Admin Bookmarks Block page.
 *
 * @package    block
 * @subpackage searchcourses
 * @copyright  University of Bath 2013
 * @author      Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

/**
 * The Search Courses Autocomplete block class
 */
class block_searchcourses extends block_base
{
    
    public function init()
    {
        $this->title = get_string('pluginname', 'block_searchcourses');
    }
    
    private function autocomplete_js()
    {
        global $PAGE, $CFG;
        $autocomplete = $CFG->wwwroot . '/blocks/searchcourses/js/module.js';
        $url          = new moodle_url($autocomplete);
        return $PAGE->requires->js($url);
    }
    public function applicable_formats()
    {
        return array(
            'site' => true,
            'course-view' => true,
            'site-index' => true,
            'my' => true
        );
    }
    public function get_content()
    {
        global $CFG;
        $this->content = new stdClass();
        $params = array();
        $count = "";
        $module = array(
            'name' => 'course_search_ac',
            'fullpath' => '/blocks/searchcourses/js/module.js'
        );
        if (!is_null($this->config)) {
            $params = array(
                'course_count' => $this->config->course_count
            );
            $this->page->requires->data_for_js('ac_course_count', array(
                'count' => $this->config->course_count
            ));
           $count     = $this->config->course_count;
        }

        $form_html = "";
        $form_html .= $this->page->requires->js_init_call('M.search_autocomplete.init', array(
            $params
        ), false, $module);
        $form_html .= "<div id=\"course_search_ac\">";
        $form_html .= "<label for=\"ac-input\">" . get_string('search_label', 'block_searchcourses') . "</label>";
        $form_html .= "<input id=\"ac-input\" type = \"text\" title = \"Start here by typing a course...\"></input>";
        $form_html .= "<div id=\"my_courses_container\"><label for = \"my_courses_flag\">My Courses</label><input type=\"checkbox\" id=\"my_courses_flag\"  name=\"my_courses_flag\" value=\"0\"/></div>";
        $form_html .= "<input type=\"hidden\" id=\"course_count\" value=\"$count\" />";
        $form_html .= "</div>";
        $this->content->text = $form_html;
        return $this->content;
    }
}
