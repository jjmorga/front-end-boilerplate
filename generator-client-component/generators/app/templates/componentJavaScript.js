'use strict';

/**
 *  This is the main file for <%= jsModuleName %>
 */
 
if ($('.component-<%= sassName %>').length) {
    $(function() {
        init<%= jsObjectName %>();
    });
}

function init<%= jsObjectName %>() {
    console.log('Initializing <%= jsObjectName %>');
}
