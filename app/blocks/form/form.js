$(document).ready(function() {
    
    // Example
    $( '.btn-menu, .hidden-menu ul a' ).click( function() {
        if ( $( '.hidden-menu' ).is( ':hidden' ) ) {
            $( '.hidden-menu' ).show();
        } else {
            $( '.hidden-menu' ).hide();
        }
    });
    
});
