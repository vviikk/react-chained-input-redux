import React from 'react'
import { action } from '@storybook/addon-actions'
import ChainedInput from '..'

const fetch = window.fetch

export default {
  title: 'Chained Input'
}

const getPosts = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data.map(post => ({value: `${post.id}`, label: post.title.split(' ').slice(0, 2).join(' ')}))
}

const getComments = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data.map(comment => ({value: `${comment.id}`, name: 'asd'}))
}

const fields = [
  {
    name: 'post',
    title: 'posts',
    endpoint: 'https://jsonplaceholder.typicode.com/posts',
    type: 'select',
    placeholder: 'Select post',
    fetchFunc: getPosts,
    defaultValue: { label: 'label', value: '-6' }
  },
  {
    name: 'comment',
    title: 'comments field',
    endpoint: 'https://jsonplaceholder.typicode.com/posts/:post/comments',
    fetchFunc: getComments,
    shouldLoad: state => state['post']
  }
]

const defaultState = {
}

export const ChainedInputStory = () => (
  <ChainedInput onDone={action} fields={fields} defaultState={defaultState} />
)

ChainedInputStory.story = {
  name: 'chained select'
}
