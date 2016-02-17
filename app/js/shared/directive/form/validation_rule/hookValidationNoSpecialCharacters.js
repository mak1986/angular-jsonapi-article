(function() {
  'use strict';

  function hookValidationNoSpecialCharacters() {

    var regex = /^[a-zA-Z0-9_]+$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_no_special_characters = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_no_special_characters"] = {
            "$alphabets": "a-z A-Z",
            "$digits": "0-9",
            "$underscore": "_"
          }


          if (ctrl.$isEmpty(value)) {

            ctrl.$setValidity('hook_validation_no_special_characters', true);
            return true;

          }

          if (regex.test(value)) {

            ctrl.$setValidity('hook_validation_no_special_characters', true);
            return true;

          } else {

            ctrl.$setValidity('hook_validation_no_special_characters', false);
            return false;

          }
        }

      }
    };
  };

  hookValidationNoSpecialCharacters.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationNoSpecialCharacters', hookValidationNoSpecialCharacters);
})();