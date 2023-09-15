import React, { useCallback, useMemo, useState } from 'camunda-modeler-plugin-helpers/react';
import { Box, Button, List, Skeleton, Text } from 'grommet';
import { Add, Subtract } from 'grommet-icons';

import useDirectoryPicker from "./useDirectoryPicker";

export default ({ libraryPaths, onLibraryPathsChanged }) => {
  const safeLibraryPaths = useMemo(() => libraryPaths || [], [libraryPaths]);
  const [selectedPath, selectPath] = useState(null);

  const addLibraryPaths = useCallback((directories) => {
    const newLibraryPaths = new Set(safeLibraryPaths);
    directories.forEach(dir => newLibraryPaths.add(dir));
    onLibraryPathsChanged([...newLibraryPaths]);
  }, [safeLibraryPaths, onLibraryPathsChanged]);

  const removeSelectedLibraryPath = useCallback(() => {
    if (!selectedPath) {
      return;
    }
    const newLibraryPaths = new Set(safeLibraryPaths);
    newLibraryPaths.delete(selectedPath);
    onLibraryPathsChanged([...newLibraryPaths]);
  }, [selectedPath, safeLibraryPaths, onLibraryPathsChanged]);

  const [ openDirectoryPicker ] = useDirectoryPicker(addLibraryPaths);

  return (
    <Box pad="small" elevation="medium">
      <Box direction="row" justify="end">
        <Button onClick={ openDirectoryPicker }>
          <Add />
        </Button>
        <Button disabled={ !selectedPath } onClick={ removeSelectedLibraryPath }>
          <Subtract />
        </Button>
      </Box>
      {
        safeLibraryPaths.length > 0
          ? <List data={ safeLibraryPaths } onClickItem={ (e) => selectPath(e.item) } />
          : <Skeleton>No library paths selected</Skeleton>
      }
    </Box>
  )
}