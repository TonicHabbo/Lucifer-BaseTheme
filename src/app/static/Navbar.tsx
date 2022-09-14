import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../hooks';
import { IPage } from '../../utils';

interface props {
    pages: IPage[];
    sub?: boolean;
}
export default function Navbar(props:props)
{ 
    const { pages = [], sub = false } = props;

    const { activeTab, activePage } = useNavigation();

    const getClasses = useMemo<string>(()=>
    {
        let classes = [ 'navbar navbar-expand-lg' ];

        if(sub) classes.push('navbar-dark','bg-secondary-blue','p-0','base-sub-navigation');
        else classes.push('navbar-light','bg-white','fs-5','base-navigation', 'py-2');

        return classes.join(' ');
    },[ sub ]);

    const getActiveClasses = useCallback((page: IPage)=>
    {
        let classes = [ 'nav-link' ];

        if(!sub) classes.push('text-uppercase')

        if((sub && activePage === page) || (activeTab === page)) classes.push('active');
        if(activeTab === page) classes.push('text-decoration-underline');

        return classes.join(' ');
    },[ sub, activePage, activeTab ])

    return <div className={ getClasses }>
        <div className="container">
            <div className="row">
                <ul className="navbar-nav col">
                    { pages && pages.map(page =>
                    {
                        return <li key={ page.id } className="nav-item">
                            <Link to={ page.path } className={ getActiveClasses(page) }>{ page.name }</Link>
                        </li>
                    }) }
                </ul>
            </div>      
        </div>
    </div>;
};
