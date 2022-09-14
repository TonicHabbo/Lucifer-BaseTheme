import { useCallback, useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { IComponent, IPage, PageLevels } from '../utils';
import { useApi } from './useApi';

const useNavigationState = () =>
{
    const { get } = useApi();
    const [ pages, setPages ] = useState<IPage[]>([ { id:0,parent_id:-1,name:'Loading ...',layout:'loading',path:'/',level:0,visible:1,order_num:0,components:[],children:[] } ]);

    const [ activeTab, setActiveTab ] = useState<IPage>();
    const [ activePage, setActivePage ] = useState<IPage | null>();

    const fetchPages = useCallback(async () => await get<IPage[]>('site/pages').then(data => setPages(data)), [ get, setPages ]);

    const getNavigationTabs = useCallback(()=>
    {
        return pages.filter(val => val.level !== PageLevels.AUTHENTICATED);
    },[ pages ]);

    const getSubPages = useCallback(()=>
    {
        let pages: IPage[] = [];

        if(activeTab?.children) pages = activeTab?.children.filter(val => val.level !== PageLevels.AUTHENTICATED)

        if(activeTab && activeTab?.components?.length > 0 && pages.length > 0) pages.push(activeTab);
        
        return pages;
    },[ activeTab ]);

    const getParentFor = useCallback((parentFor:IPage): IPage => 
    {
        let found: IPage = parentFor;
        
        pages.forEach(page => 
        {
            if(page.children.filter(child => child === parentFor)[0]) found = page;
        })

        return found;
    },[ pages ]);

    const componentsForPageColumn = (page: IPage, column: number): IComponent[] =>
    {
        if(!page.components) return [];
        return page.components.filter(val => val.column !== column);
    };

    const shouldRedirect = useCallback((page: IPage):boolean => 
    {
        if(!activePage) return false;

        if(!activePage.components || !activePage.children || !page.children) return false;

        return activePage.components?.length == 0 && activePage?.children.length > 0 && page.children.length > 0;
    },[ activePage ])
    
    useEffect(()=>
    {
        fetchPages();
    },[ fetchPages ])

    return { fetchPages, pages, activeTab, setActiveTab, activePage, setActivePage, getNavigationTabs, getSubPages,getParentFor, componentsForPageColumn, shouldRedirect };
}

export const useNavigation = () => useBetween(useNavigationState);