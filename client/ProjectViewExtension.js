/* eslint-disable no-unused-vars*/
import React, { Fragment, PureComponent } from 'camunda-modeler-plugin-helpers/react';
import { Fill } from "camunda-modeler-plugin-helpers/components";

export default class ProjectViewExtension extends PureComponent {
  render() {
    return (
      <Fragment>
        <Fill slot="status-bar__app" group="1_project_view">
          <span>Hello!</span>
        </Fill>
      </Fragment>
    );
  }
}