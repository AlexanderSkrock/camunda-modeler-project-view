/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'camunda-modeler-plugin-helpers/react';

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Form, Header } from 'grommet'

import LibraryPathsField from "./LibraryPathsField";

export default ({ configuration, onSubmit }) => {
  const [config, setConfig] = useState(configuration || {});

  const handleLibraryPathsChanged = useCallback(libraryPaths => {
    setConfig({ ...config, libraryPaths });
  }, [config, setConfig]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(config);
  }, [config, onSubmit]);

  return (
    <Card>
      <CardHeader pad="medium">
        Project View Configuration
      </CardHeader>
      <Form onSubmit={ handleSubmit }>
        <CardBody pad="medium">
          <LibraryPathsField libraryPaths={ config.libraryPaths } onLibraryPathsChanged={ handleLibraryPathsChanged } />
        </CardBody>
        <CardFooter pad="small" justify="center">
          <Button type="submit" primary label="Submit" />
        </CardFooter>
      </Form>
    </Card>
  );
}