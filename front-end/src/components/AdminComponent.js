import React from 'react';
import { Segment, Header, Image, Sidebar } from 'semantic-ui-react';

const AdminComponent = () => (
  <Sidebar.Pusher>
    <Segment basic>
      <Header as="h3">Application Content</Header>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Segment>
  </Sidebar.Pusher>
);

export default AdminComponent;
