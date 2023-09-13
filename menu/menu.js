module.exports = function (electronApp, menuState) {
  return [
    {
      label: 'Greet!',
      accelerator: 'CommandOrControl+G',
      enabled: true,
      action: function() {
        process.exit(9)
      }
    }
  ];
}