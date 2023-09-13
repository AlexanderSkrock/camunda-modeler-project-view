module.exports = function (electronApp, menuState) {
  return [
    {
      label: 'Manage projects',
      accelerator: 'CommandOrControl+Shift+P',
      enabled: true,
      action: function() {
        electronApp.emit('menu:action', 'open-project-view-configuration')
      }
    }
  ];
}