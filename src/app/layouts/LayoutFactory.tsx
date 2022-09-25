import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigation } from '../../hooks';
import { IPage } from '../../utils';
import Default from './default';

interface props {
    page: IPage
}
export default function LayoutFactory(props:props)
{ 
    const { page = null } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const { setActivePage, activeTab, getSubPages,shouldRedirect } = useNavigation();

    useEffect(()=>
    {
        if(!page) return;

        if(page.components && page.children && !page.components.length && page.children.length > 0) return setActivePage(page.children[0]);
        
        setActivePage(page);
    },[ setActivePage, page ]);

    if(!page) return <div>fkn</div>;

    switch(page.layout) 
    {
        default: return <Default/>;
    }
};
