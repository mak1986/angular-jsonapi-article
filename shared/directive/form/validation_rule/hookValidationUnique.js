(function() {
  'use strict';

  function hookValidationUnique(CONFIG, ResourceManager) {
    //function hookValidationUnique($q, $timeout){

    return {
      require: 'ngModel',
      scope: {
        controller: "=hookValidationUniqueBindController",
        model: "=hookValidationUniqueBindModel"
      },
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;

        if (!ctrl['$substitutions']) {
          ctrl['$substitutions'] = {};
        }

        ctrl['$substitutions']["hook_validation_unique"] = {
          "$field": 'label.'+field
        }

        ctrl.$asyncValidators[field] = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          var where = {};
          where[field] = value;
          return ResourceManager.readWhere(scope.controller.type, where).then(function(resources) {
            //console.log(resources);
            if (resources.length == 0) {

              ctrl.$setValidity('hook_validation_unique', true);
              return true;

            } else if (scope.controller.mode == "edit" && resources.length == 1 && resources[0].id == scope.model.id) {

              ctrl.$setValidity('hook_validation_unique', true);
              return true;

            } else {

              ctrl.$setValidity('hook_validation_unique', false);
              return false;

            }

          }, function(reason) {

            ctrl.$setValidity('hook_validation_unique', false);
            console.log("something went wrong");


            return undefined;

          });

        };

      }
    };
  };

  hookValidationUnique.$inject = [
    'CONFIG',
    'ResourceManager'
  ];

  angular.module('_Directive')
    .directive('hookValidationUnique', hookValidationUnique);
})();