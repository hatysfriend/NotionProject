import React from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import {  Button } from '@material-ui/core';
import './styles.css'

export default function SubSidebar({sidebarClose,closeSidebar}) {
    return (
      <div className='subSidebarContainer'>
        <Button className='openFile' onClick={sidebarClose}>
        {closeSidebar
        ?<CloseIcon/>
        :<KeyboardArrowRightIcon />}
        </Button>


        <Button className='setting'><SettingsIcon/></Button>
        
      </div>
    )
  }
