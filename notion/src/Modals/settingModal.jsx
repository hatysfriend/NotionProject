import React, { useState } from 'react'
import ReactDom from 'react-dom';
import './styles.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { ToggleButton } from '@material-ui/lab';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export default function SettingModal({ open, settingModalClose }) {

    const [selectedModalList, setSelectedModalList] = useState({ setting: null, index: null });

    if (!open) return null;


    const setA = (selectedONe) => {
        setSelectedModalList(selectedONe);
        // console.map(selectedModalList);
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

                <PortalList setA={setA} />
                <PortalContent selectedModalList={selectedModalList} />

            </div>
        </div>,
        document.getElementById('portal')
    )
}


export function PortalList({ setA }) {
    const lists = [{ setting: 'Appearence', settingbody: <BODY1 /> },
    { setting: 'setting2', settingbody: <BODY1 /> },
    { setting: 'setting3', settingbody: <BODY1 /> }]

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

export function BODY1() {
    return (
        <div>
            <ToggleButton
                value="check"
                
            >
                <CheckRoundedIcon />
            </ToggleButton>
        </div>
    )
}


