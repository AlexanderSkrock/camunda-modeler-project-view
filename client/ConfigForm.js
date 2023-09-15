/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'camunda-modeler-plugin-helpers/react';

import { Button, Card, CardBody, CardFooter, CardHeader, Form, Heading } from 'grommet'

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
    <Card pad="small" width="large">
      <CardHeader justify="center">
        <Heading level="3">Project View Configuration</Heading>
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