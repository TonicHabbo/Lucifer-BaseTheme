import { IComponent } from './IComponent';

export interface IPage
{
    id: number;
    parent_id: number;
    name: string;
    layout: string;
    path: string;
    level: number;
    visible: number;
    order_num: number;
    components: IComponent[];
    children: IPage[];
}