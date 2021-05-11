import React, { useEffect } from 'react'
import { useDataLayerValue } from '../../context/DataLayer';
import './Body.css'
import Header from "./partials/Header";
import { PlayCircleFilled, Favorite, MoreHoriz, PauseCircleFilled } from "@material-ui/icons";
import SongRow from "./partials/SongRow";
import { useSoundProviderValue } from "../../context/SoundProvider";


const Body = ({ spotify }) => {
    const [{ current_playlist, tracks, track,discover_weekly },dispatch] = useDataLayerValue();
    // const [{ playing, volume }, soundDispatch] = useSoundProviderValue();

    useEffect(() => {
        if(current_playlist==null && discover_weekly!=null ){
            dispatch({
                type: 'SET_CURRENT_PLAYLIST',
                id: discover_weekly?.id
            });
           dispatch({
            type: 'SET_TRACKS',
            tracks: discover_weekly?.tracks
           })
        }  
    }, [discover_weekly])


    return (
        <div className="body">
            <Header spotify={spotify} />
            <div className="body_info">
                <img
                    src={current_playlist ? current_playlist?.images[0].url :discover_weekly?.images[0].url}
                    alt="" />
                <div className="body_infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{current_playlist?current_playlist.name:discover_weekly?.name}</h2>
                    <p>{current_playlist?current_playlist.description:discover_weekly?.description}</p>
                </div>
            </div>

            <div className="body_songs">
                <div className="body_icons">
                    {/* <PauseCircleFilled className='body_shuffle' /> : */}
                    <PlayCircleFilled fontSize='large' className='body_shuffle' />
                    <Favorite fontSize='large' />
                    <MoreHoriz />
                </div>
                {tracks?.items.map(track => {
                    return <SongRow track={track.track} key={track.track.id} />
                })}
            </div>
        </div>
    )
}

export default Body
