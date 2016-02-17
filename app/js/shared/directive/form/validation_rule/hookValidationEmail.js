(function() {
  'use strict';

  function hookValidationEmail() {

    var regex = /^[\-a-zA-Z0-9_\.\!]+@[\-a-zA-Z0-9_\.\!]+$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;

        ctrl.$validators.email = function(){
          return true;
        }

        ctrl.$validators.hook_validation_email = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_email"] = {};


          if (ctrl.$isEmpty(value)) {

            ctrl.$setValidity('hook_validation_email', true);
            return true;

          }

          if (regex.test(value)) {

            ctrl.$setValidity('hook_validation_email', true);
            return true;

          } else {

            ctrl.$setValidity('hook_validation_email', false);
            return false;

          }
        }

      }
    };
  };

  hookValidationEmail.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationEmail', hookValidationEmail);
})();