import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import App from './App';
import { storiesProviderDecorator } from './redux/StoriesProviderDecorator';

export default {
  title: 'TODOLISTS/AppTodolists',
  component: App,
  args: { addNewTodolist: 'Adding a new todolist' },
  decorators: [storiesProviderDecorator],
} as ComponentMeta<typeof App>;

// @ts-ignore
const Template: ComponentStory<typeof App> = args => <App {...args} />;

export const AppTodolists = Template.bind({});

AppTodolists.args = {};
