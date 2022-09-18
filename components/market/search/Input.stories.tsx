import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from './Input'

export default {
 title: 'Example/Input',
 component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = () => <Input />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
