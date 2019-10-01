import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import pathToRegExp from 'path-to-regexp'
import Select from 'react-select/async'

// eslint-disable-next-line no-unused-vars
const filterOptions = (allOptions, inputValue) => {
  return allOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  )
}

const reducer = (prevState, updatedProperty) => {
  console.log(prevState, updatedProperty)
  return {
    ...prevState,
    ...updatedProperty
  }
}

const ChainedInput = (props) => {
  const {
    fields,
    defaultState
  } = props

  const [state, setState] = useReducer(reducer, defaultState)

  const handleOnChange = (fieldName) => (selected) => setState({ [fieldName]: selected.value })

  const fieldsM = fields.map(
    field => (
      {
        ...field,
        pathData: pathToRegExp.parse(field.endpoint)
      }
    )
  )

  const makeFetch = (url, fetchFunc, shouldLoad = () => true) => (inputValue) => {
    if (shouldLoad(state)) {
      return fetchFunc(pathToRegExp.compile(url)(state))
    }
    return Promise.resolve([])
  }

  const handleInputChange = (...args) => console.log(args)

  return (
    <>
      {fieldsM.map(field =>
        <div key={field.name + field.shouldLoad}>
          <label>{field.title}</label>
          <Select
            name={field.name}
            cacheOptions
            defaultOptions
            defaultValue={field.defaultValue}
            loadOptions={makeFetch(field.endpoint, field.fetchFunc, field.shouldLoad)}
            onChange={handleOnChange(field.name)}
            onInputChange={handleInputChange}
            key={field.shouldLoad}
            // value={state[field.name]}
          />
        </div>)}
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </>
  )
}

ChainedInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  defaultState: PropTypes.objectOf(PropTypes.object)
}

export default ChainedInput
