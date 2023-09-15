/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'camunda-modeler-plugin-helpers/react';

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Form, List } from 'grommet'

import DirectoryChooser from "./useDirectoryPicker";
import useDirectoryPicker from "./useDirectoryPicker";

export default ({ configuration, onSubmit }) => {
  const [initialConfig] = useState(configuration || {});
  const [libraryPaths, setLibraryPaths] = useState(initialConfig.libraryPaths || [])

  const addLibraryPaths = useCallback((directories) => {
    const newLibraryPaths = new Set(libraryPaths);
    directories.forEach(dir => newLibraryPaths.add(dir));
    setLibraryPaths([...newLibraryPaths]);
  }, [libraryPaths, setLibraryPaths]);

  const removeLibraryPaths = useCallback((directories) => {
    const newLibraryPaths = new Set(libraryPaths);
    directories.forEach(dir => newLibraryPaths.delete(dir));
    setLibraryPaths([...newLibraryPaths]);
  }, [libraryPaths, setLibraryPaths]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const newConfig = { ...initialConfig };
    newConfig.libraryPaths = libraryPaths;
    onSubmit(newConfig);
  }, [libraryPaths, onSubmit]);

  const [ openDirectoryPicker ] = useDirectoryPicker(addLibraryPaths);

  return (
    <Card>
      <CardHeader pad="medium">
        Project View Configuration
      </CardHeader>
      <Form onSubmit={ handleSubmit }>
        <CardBody pad="medium">
          <DirectoryChooser directories={ libraryPaths } onDirectoriesChanged={ setLibraryPaths } />
          <List data={ libraryPaths } />
          <Button label="Add directory" onClick={ openDirectoryPicker } />
        </CardBody>
        <CardFooter>
          <Box direction="row">
            <Button type="submit" primary label="Submit" />
          </Box>
        </CardFooter>
      </Form>
    </Card>
  );
}