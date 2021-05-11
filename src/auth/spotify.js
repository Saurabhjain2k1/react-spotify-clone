export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId= "c223de04595940539ddaa3207c538ee8"

const redirectUri = "http://localhost:3000/";

const scopes=[
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify"
    
]
export const getTokenFromUrl=()=>{
   return window.location.hash.substring(1).split('&')
   .reduce((initial,item)=>{
       var parts=item.split('=');
       initial[parts[0]]=decodeURIComponent(parts[1]);
       return initial;
   },{});
 
}
export const acessUrl=`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
