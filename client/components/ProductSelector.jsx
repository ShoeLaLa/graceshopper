import React from 'react'
import {ControlLabel, FormControl} from 'react-bootstrap'

const ProductSelector = props => {
  const {name, values} = props
  return (
    <div className="mdb-form">
      <ControlLabel>{name}</ControlLabel>
      <FormControl
        componentClass="select"
        placeholder="1"
        className="selector"
        name={name.toLowerCase()}
      >
        {values.map(value => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          )
        })}
      </FormControl>
      <button type="submit" className="btn-save btn btn-primary btn-sm">
        Save
      </button>
    </div>
  )
}

export default ProductSelector
