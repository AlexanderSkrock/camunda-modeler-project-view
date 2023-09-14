/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'camunda-modeler-plugin-helpers/react';
import { Overlay, Section } from 'camunda-modeler-plugin-helpers/components';

import styled from 'styled-components';

import { useFilePicker } from 'use-file-picker';
import normalize from 'normalize-path';

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

  const [initialConfig] = useState(configuration || {});
  const [libraryPaths, setLibraryPaths] = useState(initialConfig.libraryPaths || [])

  const addLibraryPaths = useCallback((files) => {
    const uniqueLibraryPaths = new Set(libraryPaths);
    files
      .map(file => {
        const normalizedPath = normalize(file.path);
        const normalizedRelPath = normalize(file.webkitRelativePath);
        const rootPath = normalizedPath.substring(0, normalizedPath.indexOf(normalizedRelPath))
        const directoryName = normalizedRelPath.substring(0, normalizedRelPath.indexOf("/"));
        return rootPath + directoryName;
      })
      .forEach(dir => uniqueLibraryPaths.add(dir));
    setLibraryPaths([...uniqueLibraryPaths]);
  }, [libraryPaths, setLibraryPaths]);

  const onOverlayClose = useCallback(() => {
    onClose(initialConfig);
  }, [initialConfig, onClose]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const newConfig = { ...initialConfig };
    newConfig.libraryPaths = libraryPaths;
    onClose(newConfig);
  }, [libraryPaths, onClose]);

  const { openFilePicker } = useFilePicker({
    initializeWithCustomParameters: input => {
      // Enable to ability to select directories
      input.setAttribute("directory", "true");
      input.setAttribute("webkitdirectory", "true");
    },
    readFilesContent: false,
    onFilesSelected: (result) => addLibraryPaths(result.plainFiles)
  });

  return (
    <CenteredOverlay anchor={ dummyAnchor.current } onClose={ onOverlayClose }>
      <Section>
        <Section.Header>Project View Configuration</Section.Header>
        <Section.Body>
          <form id="projectViewConfigForm" onSubmit={ onSubmit }>
            <div className="form-group">
              <ul>
                { libraryPaths.map(path => (<li>{ path }</li>)) }
              </ul>
              <button type="button" onClick={ openFilePicker } className="btn btn-light">
                Add library path
              </button>
            </div>
          </form>
          <Section.Actions>
            <div className="form-row">
              <div className="col">
                <button type="reset" form="projectViewConfigForm" className="btn btn-secondary">
                  Reset
                </button>
              </div>
              <div className="col">
                <button type="submit" form="projectViewConfigForm" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </Section.Actions>
        </Section.Body>
      </Section>
    </CenteredOverlay>
  );
}