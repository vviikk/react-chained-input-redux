import React from 'react'
import PropTypes from 'prop-types'
import pathToRegExp from 'path-to-regexp'
import Select from 'react-select/async'

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
          <Select loadOptions={field.fetchFunc} />
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
