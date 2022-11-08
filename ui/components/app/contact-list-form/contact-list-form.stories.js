import React from 'react';
import ContactListForm from './contact-list-form';

export default {
  title: 'Components/App/ContactListForm',
  id: __filename,
};

export const DefaultStory = (args) => <ContactListForm {...args} />;

DefaultStory.storyName = 'Default';
