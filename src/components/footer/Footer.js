import React,{useEffect} from 'react'
import './Footer.css'
import { PlayCircleOutline, SkipPrevious, SkipNext, Shuffle, Repeat, PlaylistPlay, VolumeDown, PauseCircleOutline } from "@material-ui/icons";
import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from "../../context/DataLayer";
import { useSoundProviderValue } from "../../context/SoundProvider";

const Footer = ({spotify}) => {

    const [{track, tracks}, dispatch] = useDataLayerValue();
    const [{audio, playing, volume, repeat, shuffle}, soundDispatch] = useSoundProviderValue();
    // useEffect(() => {
    //     spotify.getMyCurrentPlaybackState().then((r) => {
    //         console.log(r);
    //         soundDispatch({
    //             type: "SET_PLAYING",
    //             playing: r.is_playing
    //         });
    //         dispatch({
    //             type: "SET_TRACK",
    //             track: r.item
    //         })
    //     })

    // }, [spotify])
    const startPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
            playing: true
        });
        soundDispatch({
            type: "SET_VOLUME",
            volume: volume / 100
        });
     
        console.log("start",track);
    };

    const stopPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
            playing: false
        });
        console.log("stop",track);
    };

    const handleChange = (e, value) => {
        soundDispatch({
            type: "SET_VOLUME",
            volume: value / 100
        })
    }
    const setRepeat = () => {
        if (!repeat && shuffle) {
            setShuffle();
        }
        soundDispatch({
            type: "SET_REPEAT",
            repeat: !repeat
        });
    };

    const setShuffle = () => {
        if (!shuffle && repeat) {
            setRepeat();
        }
        soundDispatch({
            type: "SET_SHUFFLE",
            shuffle: !shuffle
        });
    };
    if (audio) {
        audio.onended = () => {
            if (shuffle) {
                while (true) {
                    let randomTrackNumber = Math.floor((Math.random() * tracks.items.length));
                    let randomTrack = tracks.items[randomTrackNumber].track;
                    if (track !== randomTrack) {
                        dispatch({
                            type: 'SET_TRACK',
                            track: randomTrack
                        });

                        let wasPlaying = playing;
                        soundDispatch({
                            type: 'SET_PLAYING',
                            playing: false,
                        });

                        let audio = new Audio(randomTrack.preview_url);
                        audio.loop = repeat;
                        soundDispatch({
                            type: 'SET_AUDIO',
                            audio: audio
                        });

                        if (wasPlaying) {
                            soundDispatch({
                                type: 'SET_PLAYING',
                                playing: true,
                            });
                        }

                        document.title = `${randomTrack.name} · ${randomTrack.artists.map((artist) => artist.name).join(', ')}`
                        break
                    }
                }
            }
            if (!shuffle && !repeat) {
                soundDispatch({
                    type: 'SET_PLAYING',
                    playing: false,
                });
            }
        }
    }
    return (
        <div className='footer'>
            <div className='footer_left'>
                <img className='footer_albumLogo'
                    src={track?.album.images[0].url} alt={track?.name} />
                {track ? (
                    <div className='footer_songInfo'>
                        <h4>{track.name}</h4>
                        <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer_songInfo">
                        <h4>No song is selected</h4>
                        <p>...</p>
                    </div>
                )}
            </div>
            <div className='footer_center'>
                <Shuffle className={shuffle ? 'footer_green' : 'footer_icon'} onClick={track ? setShuffle : null} />
                <SkipPrevious className='footer_icon' />
                {playing ? <PauseCircleOutline onClick={track ? stopPlaying : null} fontSize='large'
                                                   className='footer__icon'/> :
                    <PlayCircleOutline onClick={track ? startPlaying : null} fontSize='large'
                                           className='footer__icon'/>}
                <SkipNext className='footer_icon' />
                <Repeat className={repeat ? 'footer_green' : 'footer_icon'} onClick={track ? setRepeat : null} />
            </div>
            <div className='footer_right'>
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay />
                    </Grid>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider
                            aria-labelledby="continuous-slider"
                            onChange={handleChange}
                            min={0}
                            max={100}
                        />
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default Footer
