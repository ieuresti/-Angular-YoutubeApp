export interface YoutubeResponse {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    items:         Item[];
    pageInfo:      PageInfo;
}

export interface Item {
    kind:    ItemKind;
    etag:    string;
    id:      string;
    snippet: Video;
}

export enum ItemKind {
    YoutubePlaylistItem = "youtube#playlistItem",
}

export interface Video {
    publishedAt:  Date;
    channelId:    ChannelID;
    title:        string;
    description:  string;
    thumbnails:   Thumbnails;
    channelTitle: ChannelTitle;
    playlistId:   PlaylistID;
    position:     number;
    resourceId:   ResourceID;
}

export enum ChannelID {
    UCdn5BQ06XqgXoAxIhbqw5Rg = "UCdn5BQ06XqgXoAxIhbqw5Rg",
}

export enum ChannelTitle {
    フブキCh白上フブキ = "フブキCh。白上フブキ",
}

export enum PlaylistID {
    UUdn5BQ06XqgXoAxIhbqw5Rg = "UUdn5BQ06XqgXoAxIhbqw5Rg",
}

export interface ResourceID {
    kind:    ResourceIDKind;
    videoId: string;
}

export enum ResourceIDKind {
    YoutubeVideo = "youtube#video",
}

export interface Thumbnails {
    default:   Default;
    medium:    Default;
    high:      Default;
    standard?: Default;
    maxres?:   Default;
}

export interface Default {
    url:    string;
    width:  number;
    height: number;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}
