import { StatusEnum } from "src/app/utils/enums/status.eneum";
import { QueryParam } from "../Commons/result";

export interface NewsItemDto {
    id: number;
    title: string;
    status: StatusEnum;
    newsItemDetails: NewsItemDetailDto[];
    newsMedias: NewsMediaDto[];
    tags: TagDto[];
    categoryIds: number[];
    LastModified:Date
}

export interface NewsItemDetailDto {
    id: number;
    languageId: number;
    title: string;
    short?: string ;
    full?: string ;
    metaTitle?: string ;
    metaKeyword?: string ;
    metaDescription?: string ;
}
export interface TagDto {
    id?:string
    name: string ;
}

export interface NewsMediaDto {
    mediaUrl?: string;
    id?: number;
    mediaId: number;
    file:File
}
export interface NewsCategoryDto {
    id: number;
    parentId: number ;
    name: string;
    status: StatusEnum;
    slug: string;
    description: string;
    lastModified: string;
    parentName:string
    sort:number
}
export interface FilterNewsItemsQuery extends QueryParam {
    keyword?: string;
    status?: StatusEnum ;
    categoryId?: number ;
}
export interface NewsItemFilterResultDto {
    imageUrl: string;
    id: number;
    title: string;
    status: StatusEnum;
    tags: string[];
    categories: string[];
    lastModified: string;
}
export interface UpdateNewsItemStatusCommand {
    ids: number[];
    status: StatusEnum;
}
export interface GetNewsCategoriesQuery extends QueryParam {

}