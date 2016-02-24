(function() {
  'use strict';

  function hookValidationMaxLength() {

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var maxLength = attrs.hookValidationMaxLength;
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_max_length = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_max_length"] = {
            "$field": 'label.'+field,
            "$max_length": maxLength
          }


          if (ctrl.$isEmpty(value)) {
            ctrl.$setValidity('hook_validation_max_length', true);
            return true;
          }

          if (value.length > maxLength) {

            ctrl.$setValidity('hook_validation_max_length', false);
            return false;

          } else {

            ctrl.$setValidity('hook_validation_max_length', true);
            return true;

          }
        }

      }
    };
  };

  hookValidationMaxLength.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationMaxLength', hookValidationMaxLength);
})();