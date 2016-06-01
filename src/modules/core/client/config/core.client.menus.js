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
      title: 'ABOUT',
      state: 'about',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'SEARCH',
      state: 'search-locations',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'CHAT',
      state: 'chat',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'PROFILE',
      state: 'settings.profile',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'CONTACT',
      state: 'contact',
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
