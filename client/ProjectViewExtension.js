/* eslint-disable no-unused-vars*/
import React, { Fragment, useCallback, useEffect, useState } from 'camunda-modeler-plugin-helpers/react';
import ConfigOverlay from "./ConfigOverlay";

const EXTENSION_NAME = 'project-view';

const OPEN_EXTENSION_CONFIGURATION_ACTION = 'open-project-view-configuration';

const DEFAULT_CONFIGURATION = {
  libraryPaths: []
};

/**
 * The component props include everything the Application offers plugins,
 * which includes:
 * - config: save and retrieve information to the local configuration
 * - subscribe: hook into application events, like <tab.saved>, <app.activeTabChanged> ...
 * - triggerAction: execute editor actions, like <save>, <open-diagram> ...
 * - log: log information into the Log panel
 * - displayNotification: show notifications inside the application
 */
export default ({ config, subscribe }) => {
  const [extensionConfiguration, setExtensionConfiguration] = useState(DEFAULT_CONFIGURATION);
  const [isConfigShown, setConfigShown] = useState(false);

  useEffect(() => {
    config.getForPlugin(EXTENSION_NAME).then(setExtensionConfiguration);
    return config.setForPlugin(EXTENSION_NAME, extensionConfiguration);
  }, []);

  useEffect(() => {
    // TODO register custom action as editor action
    const subscription = subscribe(OPEN_EXTENSION_CONFIGURATION_ACTION, () => {
      setConfigShown(true);
    })
    return subscription.cancel;
  }, [])

  const handleConfigClosed = useCallback((updateConfiguration) => {
    setExtensionConfiguration(updateConfiguration)
    setConfigShown(false);
    // TODO maybe add success notification
    // TODO reload project view panel
  }, [setConfigShown, setExtensionConfiguration]);

  return (
    <Fragment>
      {
        isConfigShown ? <ConfigOverlay configuration={ extensionConfiguration } onClose={ handleConfigClosed } /> : null
      }
    </Fragment>
  );
}