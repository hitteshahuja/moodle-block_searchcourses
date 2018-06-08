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
 * SearchCourses Block page.
 *
 * @package    block
 * @subpackage searchcourses
 * @copyright  University of Bath 2016
 * @author      Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

/**
 * The Search Courses Autocomplete block class
 */
class block_searchcourses extends block_base {

    /**
     *
     */
    public function init() {
        $this->title = get_string('pluginname', 'block_searchcourses');
    }

    /**
     * @return array
     */
    public function applicable_formats() {
        return array(
            'site' => true,
            'course-view' => true,
            'site-index' => true,
            'my' => true
        );
    }


    /**
     *
     * {@inheritDoc}
     * @see block_base::is_empty()
     */
    function is_empty() {
        if (!has_capability('blocks/searchcourses:view', $this->context)) {
            return true;
        }
        return parent::is_empty();
    }


    /**
     * @return stdClass
     */
    public function get_content() {
        global $CFG, $PAGE;
        $this->content = new stdClass();
        $params = array();
        if (is_null($this->config)) {
            $count = 0;
        } else {
            $count = $this->config->course_count;
        }
        $PAGE->requires->jquery_plugin('ui-css');
        $PAGE->requires->js_call_amd('block_searchcourses/searchcourses', 'initialise', ['course_count' => $count]);
        if (!is_null($this->config)) {
            $params = array(
                'course_count' => $this->config->course_count
            );
            /* $this->page->requires->data_for_js('ac_course_count', array(
                 'count' => $this->config->course_count
             ));*/
            $count = $this->config->course_count;
        }

        //Render from Template
        $form = new \block_searchcourses\output\searchform();
        $renderer = $this->page->get_renderer('block_searchcourses');
        $this->content->text = $renderer->render($form);
        return $this->content;
    }
}
