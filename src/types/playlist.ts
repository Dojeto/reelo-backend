export interface CreatePlaylistBody{
    name: string
}

export interface AddSongBody{
    name : Array<string>
    id : string
}