export const initialState = {
    user: null,
    playLists: [],
    playing: false,
    item: null,
    token: null,
    discover_weekly: null,
    current_playlist: null,
    tracks: null,
    track: null,
}

const reducer = (state, action) => {

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token
            }
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists
            }
        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
      
        case 'SET_CURRENT_PLAYLIST': {
            let currentPlaylist = null;
            state.playlists.items.forEach(playlist => {
                if (playlist.id === action.id) {
                    currentPlaylist = playlist;
                }
            });
            return {
                ...state,
                current_playlist: currentPlaylist
            }
        }
        case 'SET_TRACKS': {
            return {
                ...state,
                tracks: action.tracks
            };
        }
        case 'SET_TRACK': {
            return {
                ...state,
                track: action.track
            };
        }
        default:
            return state

    }
}

export default reducer;