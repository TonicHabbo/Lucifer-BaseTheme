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

        console.log(page);

        if(!shouldRedirect(page))
            setActivePage(page);
    },[ setActivePage, page,shouldRedirect ]);

    if(!page) return <div>fkn</div>;

    switch(page.layout) 
    {
        default: return <Default/>;
    }
};
