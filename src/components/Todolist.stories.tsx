import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { storiesProviderDecorator } from '../redux/StoriesProviderDecorator';

import { TodoList } from './TodoList';

export default {
  title: 'TODOLISTS/Todolist',
  component: TodoList,
  args: { addNewTask: 'Adding a new title' },
  decorators: [storiesProviderDecorator],
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = args => <TodoList {...args} />;

export const TodolistComponent = Template.bind({});

TodolistComponent.args = {
  todolistID: '1',
  title: 'What to buy',
  filter: 'all',
};
