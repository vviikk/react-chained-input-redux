import React from 'react'
import PropTypes from 'prop-types'
import pathToRegExp from 'path-to-regexp'
import Select from 'react-select/async'
import { colourOptions } from './mocks/data'

const filterColors = (inputValue) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  )
}

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue))
    }, 7000)
  })

const ChainedInput = (props) => {
  const {
    fields
  } = props

  const fieldsM = fields.map(
    field => (
      {
        ...field,
        pathData: pathToRegExp.parse(field.endpoint)
      }
    )
  )

  return (
    <>
      {fieldsM.map(field =>
        <div key={field.name}>
          <label>{field.title}</label>
          <Select cacheOptions defaultOptions loadOptions={promiseOptions} />
        </div>)}
      <pre>
        {JSON.stringify(fieldsM, null, 2)}
      </pre>
    </>
  )
}

ChainedInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object)
}

export default ChainedInput
