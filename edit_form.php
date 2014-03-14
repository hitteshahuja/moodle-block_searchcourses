<?php

class block_searchcourses_edit_form extends block_edit_form{
	
	protected function specific_definition($mform){
		//Header
		$mform->addElement('header');
		//Number of courses to show in the drop-down
		$course_count_attributes = array('style'=>'width:3em');
		$mform->addElement('text','config_course_count',get_string('course_count_label','block_searchcourses'),$course_count_attributes);
		$mform->setDefault('config_course_count',15);
		$mform->setType('config_course_count',PARAM_INT);
	}
}
