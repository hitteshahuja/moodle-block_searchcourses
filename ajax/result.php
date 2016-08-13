<?php
require_once('../../../config.php');
require_login();

if (!defined('AJAX_SCRIPT')) {
    define('AJAX_SCRIPT', true);
}
require_once($CFG->libdir . '/datalib.php');
global $CFG;
$USER;
$query = $_GET['term'];
$my_courses_flag = 0;
$total = 0;
$courses['query'] = $query;
$course_count = 10; // Default value for course result list
if (!empty($_GET['course_count'])) {
    $course_count = $_GET['course_count'];
}
if (isset($_GET['my_courses_flag'])  &&  $_GET['my_courses_flag'] == "true") {
    $my_courses_flag = $_GET['my_courses_flag'];
    $courses['results'] = enrol_get_my_courses(array('id', 'shortname'), 'visible DESC,sortorder ASC', $course_count);
    //Once you have the results, filter the ones matching the search query
    $mycourses = array();
    foreach ($courses['results'] as $objCourse) {
        if (preg_match('/' . $query . '/i', $objCourse->fullname) != 0) {
            $mycourses[] = $objCourse;
        }
    }
    $courses['results'] = array_values($mycourses);
    echo json_encode($courses);

} else {
    $courses['results'] = array_values(get_courses_search(array(
        $query
    ), 'fullname ASC', 0, $course_count, $total));
    if (empty($courses['results'])) {
        $courses = array();
        echo json_encode($courses);
    } else {
        foreach($courses['results'] as $course){
            $objCrse = new \stdClass();
            $objCrse->fullname = $course->fullname;
            $objCrse->shortname = $course->shortname;
            $objCrse->id = $course->id;
            $arrCourse[] = $objCrse;
            //$arrCourse[]['id']  = $course->id;
            //$arrCourse[]['shortname']  = $course->shortname;
            //$arrCourse[]['description']  = $course->summary;

        }
        echo json_encode($arrCourse);
    }
}
