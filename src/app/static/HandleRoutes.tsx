import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../hooks';
import { IPage } from '../../utils';

export default function HandleRoutes()
{ 
    const { fetchPages, pages, activeTab, setActiveTab, activePage, getNavigationTabs,getSubPages, setActivePage, getParentFor,shouldRedirect } = useNavigation();

    const navigate = useNavigate();

    useEffect(() =>
    {
        if(activePage) document.title = activePage.name;
        
        let setActive = null;

        if(activePage)
            setActive = getParentFor(activePage);

        setActiveTab(setActive as IPage);

        if(!activePage || !setActive) return;

        //if(setActive?.children.length > 0 && setActive.children[0].path === location.pathname) return;

        //if(activePage.components?.length == 0 && activePage?.children.length > 0 && setActive?.children.length > 0) navigate(setActive.children[0].path);
    },[ setActiveTab,setActivePage, activePage, getParentFor,navigate ]);

    return null;
};
