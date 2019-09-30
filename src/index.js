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
    <React.Fragment>
      {fieldsM.map(field => <Select key={field.name} loadOptions={field.fetchFunc} />)}
      <pre>
        {JSON.stringify(fieldsM, null, 2)}
      </pre>
    </React.Fragment>
  )
}

ChainedInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object)
}

export default ChainedInput
