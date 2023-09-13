/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useState } from 'camunda-modeler-plugin-helpers/react';
import { Overlay, Section } from 'camunda-modeler-plugin-helpers/components';

import styled from 'styled-components';
import useDummyRef from "./useDummyRef";

/**
 * The overlay designed by Camunda always positions the overlay on top of the anchor.
 * In case this overlay is used on the upper portion of the screen,
 * the overlay will be displayed will either be partially visible or completely outside the visible area.
 */
const CenteredOverlay = styled(Overlay)`
  position: absolute !important;
  left: 50% !important;
  top: 50% !important;
  right: 0 !important;
  bottom: 0 !important;
  transform: translate(-50%, -50%) !important;
`

export default ({ configuration, onClose }) => {
  const dummyAnchor = useDummyRef();

  const [config, setConfig] = useState(configuration);

  const onOverlayClose = useCallback(() => {
    onClose(config);
  }, [config, onClose]);

  return (
    <CenteredOverlay anchor={ dummyAnchor.current } onClose={ onOverlayClose }>
      <Section>
        <Section.Header>Project View Configuration</Section.Header>
        <Section.Body>
          {
            // TODO add ui for changing the configuration
          }
          <Section.Actions>
            {
              // TODO Actions for saving and cancelling
            }
          </Section.Actions>
        </Section.Body>
      </Section>
    </CenteredOverlay>
  );
}