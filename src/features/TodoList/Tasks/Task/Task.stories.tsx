import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TaskStatuses } from '../../../../dal/api';
import { storiesProviderDecorator } from '../../../../redux/StoriesProviderDecorator';

import { Task } from './Task';

export default {
  title: 'TODOLISTS/Editable task',
  component: Task,
  args: {
    onClickRemoveHandler: 'Remove task',
    onBlurEndEditSpanHandler: 'Exiting Edit mode',
    changeStatus: 'Changing the status in the task',
  },
  decorators: [storiesProviderDecorator],
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = args => <Task {...args} />;

export const EditableTask = Template.bind({});

EditableTask.args = {
  title: 'Editable span , click me twice',
  status: TaskStatuses.Completed,
  id: '1',
  todolistID: '1',
};
