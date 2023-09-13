export const withCustomEditorActions = (actions) => {
  function CustomEditorActionsExtension(editorActions) {
    editorActions.register(actions);
  }
  CustomEditorActionsExtension.$inject = ['editorActions'];

  return config => {
    const additionalModules = config.additionalModules || [];

    return {
      ...config,
      additionalModules: [
        ...additionalModules,
        {
          __init__: ['customEditorActionsExtension'],
          customEditorActionsExtension: [ 'type', CustomEditorActionsExtension ]
        }
      ]
    };
  }
}