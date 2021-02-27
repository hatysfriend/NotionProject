import React, { useState } from 'react'
import ReactDom from 'react-dom';
import './styles.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

export default function SettingModal({ open, settingModalClose, isDarkModeFunc, isDarkMode }) {

    const [selectedModalList, setSelectedModalList] = useState({ setting: null, index: null });

    if (!open) return null;

    const setA = (selectedONe) => {
        setSelectedModalList(selectedONe);
    }

    return ReactDom.createPortal(
        <div >
            {/* <button className='modalCloseBtn'>Close Modal</button> */}
            <div className='modalContainer' onClick={settingModalClose} />
            <div className='MODAL_STYLES'>
                <div className='modalTopbar'>
                    <CloseRoundedIcon className='CloseRoundedIcon' onClick={settingModalClose} />
                 Setting
             </div>

                <PortalList setA={setA}
                    isDarkModeFunc={isDarkModeFunc}
                    isDarkMode={isDarkMode}
                />
                <PortalContent
                    selectedModalList={selectedModalList}
                />
            </div>
        </div>,
        document.getElementById('portal')
    )
}


export function PortalList({ setA, isDarkModeFunc, isDarkMode }) {
    const lists = [
        {
            setting: 'Appearence', settingbody:
                <BODY1 isDarkModeFunc={isDarkModeFunc}
                    isDarkMode={isDarkMode} />
        },
        { setting: 'setting2', settingbody: <BODY2 /> },
        { setting: 'setting3', settingbody: <BODY3 /> }]

    return (
        <div className='portalList'>

            <List>{lists.map((list, index) => {
                return (
                    <ListItem key={index} onClick={() => setA({ setting: list, index: index })}>
                        <ListItemText>{list.setting}</ListItemText>
                    </ListItem>
                )
            })}</List>
        </div>
    )
}

export function PortalContent({ selectedModalList }) {
    if (selectedModalList.setting) {
        return (
            <div className='portalContent'>
                {selectedModalList.setting.settingbody}
            </div>
        )
    } else return null;
}



//---------------------------BODY COMPOMENT

export function BODY1({ isDarkModeFunc, isDarkMode }) {

    const handleAlignment = (event, bool) => {
        if (bool !== null) { isDarkModeFunc(bool); }
        else { isDarkModeFunc(isDarkMode); }
    };

    return (
        <div>
            <div><b>Appearence</b></div>
            <ToggleButtonGroup
                value={isDarkMode}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment">

                <ToggleButton value='true' aria-label="left aligned" className='darkBtn'>  DARK
                    </ToggleButton>
                <ToggleButton value="false" aria-label="centered" className='lightBtn'>Light
                    </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export function BODY2() {
    return (
        <div>title2</div>
    )
}

export function BODY3() {
    return (
        <div> title3</div>
    )
}




