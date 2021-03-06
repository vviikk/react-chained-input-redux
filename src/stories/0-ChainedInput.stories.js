import React from 'react'
import { action } from '@storybook/addon-actions'
import ChainedInput from '..'

const fetch = window.fetch

export default {
  title: 'Chained Input'
}

const getPosts = async (url) => {
  console.log('asd')
  const response = await fetch(url)
  const data = await response.json()
  debugger // eslint-disable-line
  return data
}

const fields = [
  {
    name: 'post',
    title: 'posts',
    endpoint: 'https://jsonplaceholder.typicode.com/posts',
    type: 'select',
    fetchFunc: getPosts
  },
  {
    name: 'comments',
    title: 'comments field',
    endpoint: 'https://jsonplaceholder.typicode.com/posts/:post/comments'
  }
]

export const ChainedInputStory = () => (
  <ChainedInput onDone={action} fields={fields} />
)

ChainedInputStory.story = {
  name: 'chained select'
}
