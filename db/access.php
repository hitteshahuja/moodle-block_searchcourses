<?php
//Capabilities for the block

//NOTE: This has changed in Moodle 2.4 because of the addition of new capabilities
$capabilities = array(

  'blocks/searchcourses:view' => array(
      'riskbitmask' => RISK_PERSONAL,
      'captype' => 'read',
      'contextlevel' => CONTEXT_COURSE,
      'legacy' => array(
        'guest'          => CAP_PREVENT,
        'student'        => CAP_ALLOW,
        'teacher'        => CAP_ALLOW,
        'editingteacher' => CAP_ALLOW,
        'coursecreator'  => CAP_ALLOW,
        'manager'          => CAP_ALLOW
        )
    ),
    'block/searchcourses:myaddinstance' => array(
      'riskbitmask' => RISK_PERSONAL,
      'captype' => 'read',
      'contextlevel' => CONTEXT_COURSE,
      'legacy' => array(
        'guest'          => CAP_PREVENT,
        'student'        => CAP_ALLOW,
        'teacher'        => CAP_ALLOW,
        'editingteacher' => CAP_ALLOW,
        'coursecreator'  => CAP_ALLOW,
        'manager'          => CAP_ALLOW
        )
     ),
         'block/searchcourses:addinstance' => array(
      'riskbitmask' => RISK_PERSONAL,
      'captype' => 'read',
      'contextlevel' => CONTEXT_COURSE,
      'legacy' => array(
        'guest'          => CAP_PREVENT,
        'student'        => CAP_ALLOW,
        'teacher'        => CAP_ALLOW,
        'editingteacher' => CAP_ALLOW,
        'coursecreator'  => CAP_ALLOW,
        'manager'          => CAP_ALLOW
        )
     )
);
    
