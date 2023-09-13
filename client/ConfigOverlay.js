/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'camunda-modeler-plugin-helpers/react';
import { Overlay, Section } from 'camunda-modeler-plugin-helpers/components';

export default ({ configuration, onClose }) => {

  const [config, setConfig] = useState(configuration);

  const onOverlayClose = useCallback(() => {
    onClose(config);
  }, [config, onClose]);

  return (
    <Overlay onClose={ onOverlayClose }>
      <Section>
        <Section.Header>Auto save configuration</Section.Header>
        {
          // TODO add ui for changing the configuration
        }
      </Section>
    </Overlay>
  );
}