(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });
    menuService.addMenuItem('topbar', {
      title: 'Search',
      state: 'search-locations',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'Chat',
      state: 'chat',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'Profile',
      state: 'settings.profile',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'About',
      state: 'about',
      roles: ['*']
    });
    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });
    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile',
      state: 'settings.profile'
    });
    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile Picture',
      state: 'settings.picture'
    });
    menuService.addSubMenuItem('account', 'settings', {
      title: 'Change Password',
      state: 'settings.password'
    });
   /* menuService.addSubMenuItem('account', 'settings', {
      title: 'Manage Social Accounts',
      state: 'settings.accounts'
    });*/
  }
}());
