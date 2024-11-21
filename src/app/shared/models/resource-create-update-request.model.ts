export interface ResourceCreateUpdateRequest {
    id?: number;
    title: string;
    url: string;
    type: ResourceType;
    filePath: string;
    category: ResourceCategory;
    description: string;
}

export enum ResourceType {
    VIDEO="VIDEO",
    IMAGE="IMAGE",
    DOCUMENT="DOCUMENT",
    AUDIO="AUDIO",
    OTHER="OTHER",
}

export enum ResourceCategory {
    SELF_HELP="SELF_HELP",
    THERAPY="THERAPY",
    MEDITATION="MEDITATION",
    MENTAL_HEALTH="MENTAL_HEALTH",
    OTHER="OTHER",

}