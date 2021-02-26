import React,{useState} from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import {  Button } from '@material-ui/core';
import './styles.css'
import SettingModal from '../Modals/settingModal'

export default function SubSidebar({sidebarClose,closeSidebar,closeSettingModal,
  settingModalClose,isDarkModeFunc,isDarkMode}) {
    
  

  return (
      <>
      <div className={'isDark'+isDarkMode}>
        <div>{'isDark'+isDarkMode}</div>
        <Button className='openFile' onClick={sidebarClose}>
        {closeSidebar
        ?<CloseIcon/>
        :<KeyboardArrowRightIcon />}
        </Button>


        <Button className='setting' onClick={settingModalClose}><SettingsIcon/></Button>
        
      </div>
      {closeSettingModal
      ?<SettingModal 
      open={closeSettingModal}
       settingModalClose={settingModalClose}
       isDarkModeFunc={isDarkModeFunc}
       isDarkMode={isDarkMode}
       />:null}
      </>
    )
  }
