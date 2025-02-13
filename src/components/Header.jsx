import React from 'react'
import ClientDropdown from './ClientDropdown'
import Profile from './Profile'
import VerticalIcon from '../assets/VerticalIcon'

const Header = () => {
  return (
    <div className='flex flex-row justify-between items-center py-3 pr-4 pl-8 border-b border-[#EFEFEF] h-[80px] bg-[#FFFFFF]  font-medium'>
        <span className='text-[24px]'>Groups</span>
        <div className='flex flex-row items-center space-x-3'>
        <ClientDropdown/>
        <Profile/>
        <VerticalIcon/>
        </div>
    </div>
  )
}

export default Header