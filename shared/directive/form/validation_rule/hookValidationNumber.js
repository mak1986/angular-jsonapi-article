(function() {
  'use strict';

  function hookValidationNumber() {

    var regex = /^[0-9]*$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;

        ctrl.$validators.hook_validation_number = function(modelValue, viewValue) {
          var value = modelValue || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_number"] = {}

          if (ctrl.$isEmpty(value)) {

            ctrl.$setValidity('hook_validation_number', true);
            return true;

          }

          if (regex.test(value)) {

            ctrl.$setValidity('hook_validation_number', true);
            return true;

          } else {

            ctrl.$setValidity('hook_validation_number', false);
            return false;

          }
        }

      }
    };
  };

  hookValidationNumber.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationNumber', hookValidationNumber);
})();