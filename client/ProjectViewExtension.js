/* eslint-disable no-unused-vars*/
import React, { useCallback, useEffect, useState } from 'camunda-modeler-plugin-helpers/react';

import { Grommet, Layer } from 'grommet';

import ConfigForm from './ConfigForm';
import { withCustomEditorActions } from "./CustomEditorActionsMiddleware";

const EXTENSION_NAME = 'project-view';
const CONFIG_SEGMENT = 'config';

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
export default ({ config, subscribe, displayNotification }) => {
  const [extensionConfiguration, setExtensionConfiguration] = useState(DEFAULT_CONFIGURATION);
  const [isConfigShown, setConfigShown] = useState(false);

  useEffect(() => {
    const bpmnSubscription = subscribe('bpmn.modeler.configure', (event) => {
      event.middlewares.push(withCustomEditorActions({ [OPEN_EXTENSION_CONFIGURATION_ACTION]: () => setConfigShown(true) }));
    });
    const dmnSubscription = subscribe('dmn.modeler.configure', (event) => {
      event.middlewares.push(withCustomEditorActions({ [OPEN_EXTENSION_CONFIGURATION_ACTION]: () => setConfigShown(true) }));
    });
    return () => bpmnSubscription.cancel() && dmnSubscription.cancel();
  }, []);

  useEffect(() => {
    config.getForPlugin(EXTENSION_NAME, CONFIG_SEGMENT, DEFAULT_CONFIGURATION).then(setExtensionConfiguration);
  }, [config, setExtensionConfiguration])

  const handleConfigFormSubmit = useCallback((updatedConfiguration) => {
    setConfigShown(false);

    if (updatedConfiguration) {
      setExtensionConfiguration(updatedConfiguration);
      config.setForPlugin(EXTENSION_NAME, CONFIG_SEGMENT, updatedConfiguration)
        .then(() => {
          displayNotification({
            title: "Saved",
            content: "Configuration was successfully saved."
          })
        }).catch(console.error);
    }
  }, [setConfigShown, setExtensionConfiguration]);

  return (
    <Grommet>
      {
        isConfigShown ? (
          <Layer onEsc={ () => setConfigShown(false) } onClickOutside={ () => setConfigShown(false) }>
            <ConfigForm configuration={ extensionConfiguration } onSubmit={ handleConfigFormSubmit }/>
          </Layer>
        ) : null
      }
    </Grommet>
  );
}