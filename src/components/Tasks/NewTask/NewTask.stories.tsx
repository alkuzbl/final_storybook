import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { storiesProviderDecorator } from '../../../redux/StoriesProviderDecorator';

import { NewTask } from './NewTask';

export default {
  title: 'TODOLISTS/Adding a new element',
  component: NewTask,
  args: { addNewTask: 'Adding a new title' },
  decorators: [storiesProviderDecorator],
} as ComponentMeta<typeof NewTask>;

const Template: ComponentStory<typeof NewTask> = args => <NewTask {...args} />;

export const AddingNewTask = Template.bind({});

AddingNewTask.args = {
  todolistID: '1',
};
