import React from 'react'
import { IconContext } from 'react-icons'
import { RiArrowDropDownLine } from 'react-icons/ri'

export const icons = {
  dropDown: (
    <IconContext.Provider value={{ color: 'blue', size: '50px' }}>
      <RiArrowDropDownLine></RiArrowDropDownLine>,
    </IconContext.Provider>
  ),
}
