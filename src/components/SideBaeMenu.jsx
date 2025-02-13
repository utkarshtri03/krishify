import React from 'react'

const SideBaeMenu = ({img, text}) => {
  return (
    <div className='flex flex-row space-x-2  px-3 py-1 rounded-md h-[44px] items-center'>
        <div>{img}</div>
        <div className='text-[15px] font-roboto font-normal  text-[#000000] leading-[19.5px]'>{text}</div>
    </div>
  )
}

export default SideBaeMenu