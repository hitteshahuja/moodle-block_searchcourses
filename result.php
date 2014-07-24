<?php
require_once('../../config.php');
require_login();

if(!defined('AJAX_SCRIPT')){
    define('AJAX_SCRIPT', true);
}
require_once($CFG->libdir . '/datalib.php');
global $CFG;
$USER;
$query            = $_GET['query'];
$my_courses_flag  = 0;
$total            = 0;
$courses['query'] = $query;
$course_count     = 10; // Default value for course result list
if (!empty($_GET['course_count'])) {
    $course_count = $_GET['course_count'];
}
if (($_GET['my_courses_flag']) == "true") {
    $my_courses_flag    = $_GET['my_courses_flag'];
    $courses['results'] = enrol_get_my_courses(array('id', 'shortname'), 'visible DESC,sortorder ASC', $course_count);
    //Once you have the results, filter the ones matching the search query
    $mycourses          = array();
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
        $objCourse          = new stdClass();
        $objCourse->id      = 'na';
        $courses['results'] = array_values(array(
            $objCourse
        ));
        echo json_encode($courses);
    } else {
        echo json_encode($courses);
    }
}
