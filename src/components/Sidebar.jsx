import React from 'react'
import BackIcon from '../assets/BackIcon'
import SideBaeMenu from './SideBaeMenu'
import FirstIcon from '../assets/FirstIcon'
import MarketCentre from '../assets/MarketCentre'
import Groups from '../assets/Groups'
import LocationIcon from '../assets/Location'
import RetailIcon from '../assets/Retailer'
import Icon8 from '../assets/Icon8'
import Icon9 from '../assets/Icon9'
import Icons10 from '../assets/Icon10'
import Icons11 from '../assets/Icons11'

export const Sidebar = () => {
  return (
    <div className='bg-[#F9FBFB] h-full border-r  border-r-[#EFEFEF] fixed'>

      <div className='border-b border-b-[#EFEFEF] py-3 pl-6 h-[80px]'>
      <div className='flex flex-row items-center '>
      <BackIcon/>
      <span className='text-[#189D3B] text-[14px] font-roboto'>Go back</span>
      </div>
      <span className='text-[18px] font-roboto font-medium'>Manage Master</span>
      </div>
    <div className='px-2'>
    <div className='border-b border-b-[#EFEFEF] py-5 flex flex-col space-y-2 '>
        <span className='text-[13px] font-roboto text-[#777777] font-medium px-4'>Settings</span>
        <SideBaeMenu img={<FirstIcon/>} text={'Role Permissions'} />
      </div>

      <div className=' py-5 flex flex-col space-y-3 '>
      <span className='text-[13px] font-roboto text-[#777777] font-medium px-4'>Repositories</span>
      <SideBaeMenu img={<MarketCentre/>} text={'Market Centre(s)'} />
      <div className='flex flex-row space-x-1 bg-[#189D3B] px-3 py-1 rounded-md h-[44px] items-center'>
        <div><Groups/></div>
        <div className='text-[15px] font-roboto font-normal text-[#FFFFFF]'>Groups</div>
    </div>
      <SideBaeMenu img={<FirstIcon/>} text={'Inputs'} />
      <SideBaeMenu img={<LocationIcon/>} text={'Locations'} />
      <SideBaeMenu img={<RetailIcon/>} text={'Retailers & Distributers'} />
      <SideBaeMenu img={<Icon9/>} text={'Farmers'} />
      <SideBaeMenu img={<Icons10/>} text={'Officials'} />
      <SideBaeMenu img={<Icons11/>} text={'POP (Advisory)'} />
      </div>

    </div>

      

    </div>
  )
}
