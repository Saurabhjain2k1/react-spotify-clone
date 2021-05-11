import React from 'react'
import './Sidebar.css'
import SidebarOption from './partials/SidebarOption'
import { Home, Search, LibraryMusic } from "@material-ui/icons";
import { useDataLayerValue } from '../../context/DataLayer';
const Sidebar = ({spotify}) => {
    const [{ playlists }] = useDataLayerValue()
    return (
        <div className='sidebar'>
            <img className="sidebar_logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="" />
            <SidebarOption Icon={Home} title='Home' />
            <SidebarOption Icon={Search} title='Search' />
            <SidebarOption Icon={LibraryMusic} title='Your Library' />
            <br />
            <strong className='sidebar_title'>PLAYLISTS</strong>
            <hr />
            {playlists?.items?.map(playlist => (
                <SidebarOption title={playlist.name} spotify={spotify} id={playlist.id} key={playlist.id} />
            ))}
        </div>
    )
}

export default Sidebar
