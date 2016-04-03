(function() {
  'use strict';

  function hookValidationRequired() {

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_required = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_required"] = {
            "$field": 'label.'+field
          }


          if (ctrl.$isEmpty(value)) {
            ctrl.$setValidity('hook_validation_required', false);
            return false;
          }

          ctrl.$setValidity('hook_validation_required', true);
          return true;

        }

      }
    };
  };

  hookValidationRequired.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationRequired', hookValidationRequired);
})();