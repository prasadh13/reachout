/* 'use strict';

(function () {
  // Authentication controller Spec
  describe('AuthenticationController', function () {
    // Initialize global variables
    var AuthenticationController,
      scope,
      Socket,
      $httpBackend,
      $stateParams,
      $state,
      $location;

    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Load the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    describe('Logged out user', function () {
      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$location_, _Socket_, _$stateParams_, _$httpBackend_) {
        // Set a new global scope
        scope = $rootScope.$new();

        // Point global variables to injected services
        $stateParams = _$stateParams_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        Socket = _Socket_;

        // Initialize the Authentication controller
        AuthenticationController = $controller('AuthenticationController as vm', {
          $scope: scope
        });
      }));

      describe('$scope.signin()', function () {
        it('should login with a correct user and password', function () {
          // Test expected GET request
          $httpBackend.when('POST', '/api/auth/signin').respond(200, 'Fred');

          scope.vm.signin(true);
          $httpBackend.flush();

          // Test scope value
          expect(scope.vm.authentication.user).toEqual('Fred');
          expect($location.url()).toEqual('/');
        });

        it('should be redirected to previous state after successful login',
          inject(function (_$state_) {
            $state = _$state_;
            $state.previous = {
              state: {
                name: 'about'
              },
              params: {},
              href: '/about'
            };

            spyOn($state, 'transitionTo');
            spyOn($state, 'go');

            // Test expected GET request
            $httpBackend.when('POST', '/api/auth/signin').respond(200, 'Fred');

            scope.vm.signin(true);
            $httpBackend.flush();

            // Test scope value
            expect($state.go).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith($state.previous.state.name, $state.previous.params);

          }));

        it('should fail to log in with nothing', function () {
          // Test expected POST request
          $httpBackend.expectPOST('/api/auth/signin').respond(400, {
            'message': 'Missing credentials'
          });

          scope.vm.signin(true);
          $httpBackend.flush();

          // Test scope value
          expect(scope.vm.error).toEqual('Missing credentials');
        });

        it('should fail to log in with wrong credentials', function () {
          // Foo/Bar combo assumed to not exist
          scope.vm.authentication.user = 'Foo';
          scope.vm.credentials = 'Bar';

          // Test expected POST request
          $httpBackend.expectPOST('/api/auth/signin').respond(400, {
            'message': 'Unknown user'
          });

          scope.vm.signin(true);
          $httpBackend.flush();

          // Test scope value
          expect(scope.vm.error).toEqual('Unknown user');
        });
      });

      /* describe('$scope.signup()', function () {
        it('should register with correct data', function () {
          scope.vm.credentials = {};
          scope.vm.credentials.firstname = 'Fred';
          scope.vm.credentials.lastname = "James";
          scope.vm.credentials.stAddr1 = "123 Senate Ave";
          scope.vm.credentials.city = "Fairfax";
          scope.vm.credentials.state = "Virginia";
          scope.vm.credentials.zipCode = "Virginia";
          scope.vm.credentials.state = "Virginia";
          scope.vm.credentials.username = "freddy";
          scope.vm.credentials.password = "Pa$$w0rd!";
          scope.vm.credentials.email = "test@email.com";
          scope.vm.credentials.phoneNum = "Virginia";
          $httpBackend.when('POST', '/api/auth/signup').respond(200, 'freddy');

          scope.vm.signup(true);
          $httpBackend.flush();

          // test scope value
          expect(scope.vm.credentials.user.username).toBe('freddy');
          expect(scope.vm.error).toEqual(null);
          expect($location.url()).toBe('/');
        });

        it('should fail to register with  duplicatete Username', function () {
          scope.vm.credentials = {};
          scope.vm.credentials.firstname = 'Fred';
          scope.vm.credentials.lastname = "James";
          scope.vm.credentials.stAddr1 = "123 Senate Ave";
          scope.vm.credentials.city = "Fairfax";
          scope.vm.credentials.state = "Virginia";
          scope.vm.credentials.zipCode = "Virginia";
          scope.vm.credentials.state = "Virginia";
          scope.vm.credentials.username = "freddy";
          scope.vm.credentials.password = "Pa$$w0rd!";
          scope.vm.credentials.email = "test@email.com";
          scope.vm.credentials.phoneNum = "Virginia";
          // Test expected POST request
          $httpBackend.when('POST', '/api/auth/signup').respond(400, {
            'message': 'Username already exists'
          });

          scope.vm.signup(true);
          $httpBackend.flush();

          // Test scope value
          expect(scope.vm.error).toBe('Username already exists');
        });
      });
    });

    describe('Logged in user', function () {
      beforeEach(inject(function ($controller, $rootScope, _Socket_, _$location_, _Authentication_) {
        scope = $rootScope.$new();

        Socket = _Socket_;
        $location = _$location_;
        $location.path = jasmine.createSpy().and.returnValue(true);

        // Mock logged in user
        _Authentication_.user = {
          username: 'test',
          roles: ['user']
        };
        Socket.socket = 'fdvkbj123';
        AuthenticationController = $controller('AuthenticationController as vm', {
          $scope: scope
        });
      }));

      it('should be redirected to home', function () {
        expect($location.path).toHaveBeenCalledWith('/');
      });

      it('should make sure socket is connected', function () {
        expect(Socket.socket).toBeTruthy();
      });
      /* describe('$destroy()', function () {
        beforeEach(function () {
          scope.$destroy();
        });

        it('should remove adduser listener', function () {
          expect(Socket.socket.cbs.adduser).toBeUndefined();
        });
      });
    });
  });
}());
*/
