import React from 'react'
import ProfileImage from '../assets/ProfileImg'

const Profile = () => {
  return (
    <div className='flex flex-row items-center space-x-2'>
        <ProfileImage/>
        <div className='flex flex-col' >
            <span className='font-medium text-[16px]'>Ravi Kumar</span>
            <span className='text-[#444444] text-[12px] font-normal'>Master Admin</span>
        </div>
    </div>
  )
}

export default Profile