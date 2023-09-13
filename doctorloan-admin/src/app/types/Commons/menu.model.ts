export interface MenuDto {
    name: string;
    url: string;
    iconName: string;
    childs: MenuDto[];
}