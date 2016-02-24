(function() {
  'use strict';

  function hookValidationMinLength() {

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var minLength = attrs.hookValidationMinLength;
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_min_length = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_min_length"] = {
            "$field": 'label.'+field,
            "$min_length": minLength
          }


          if (ctrl.$isEmpty(value)) {
            ctrl.$setValidity('hook_validation_min_length', true);
            return true;
          }

          if (value.length < minLength) {

            ctrl.$setValidity('hook_validation_min_length', false);
            return false;

          } else {

            ctrl.$setValidity('hook_validation_min_length', true);
            return true;

          }
        }

      }
    };
  };

  hookValidationMinLength.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationMinLength', hookValidationMinLength);
})();