import React from 'react'
import SvgDownIcon from '../assets/DownIcon'

const ClientDropdown = () => {
  return (
    <div className='border rounded-md border-[#DDDDDD] flex flex-row justify-center items-center h-[48px] w-[115px] space-x-1'>
        <span className='text-[#444444] text-[16px] font-medium'>Client 1</span>
        <SvgDownIcon/>
    </div>
  )
}

export default ClientDropdown