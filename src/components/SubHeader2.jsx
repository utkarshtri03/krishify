import React from 'react'

const SubHeader2 = ({name,count}) => {
  return (
    <div className='border-b border-b-[#EFEFEF] h-[72px] flex items-center pr-4 pl-8  space-x-1 bg-[#FFFFFF]'>
        <span className='text-[16px] font-medium font-roboto text-[#000000]'>{name}</span>
        <span className='text-[16px] font-medium font-roboto text-[#777777]'>({count})</span>
    </div>
  )
}

export default SubHeader2