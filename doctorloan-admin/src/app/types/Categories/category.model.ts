import { StatusEnum } from "src/app/utils/enums/status.eneum";
import { QueryParam } from "../Commons/result";

export interface CategoryDto {
    id: number;
    code: string;
    name: string;
    parentId: number;
    metaTitle: string;
    content: string;
    sort: number;
    slug: string;
    status:StatusEnum
    parentName:string
    lastModified:string
}
export interface SaveCategoryCommand extends CategoryDto {

}
export interface FilterCategoryQuery extends QueryParam {
    keyword?: string;
}