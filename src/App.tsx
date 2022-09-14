import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutFactory from './app/layouts/LayoutFactory';
import HandleRoutes from './app/static/HandleRoutes';
import Heading from './app/static/Heading';
import Navbar from './app/static/Navbar';
import { useNavigation } from './hooks/useNavigation';

export default function App() 
{
    const { pages, getNavigationTabs,getSubPages } = useNavigation();

    if(!pages) return;

    return <>
        { pages.length > 0 && <BrowserRouter>
            <Heading />
            <Navbar pages={ getNavigationTabs() } />
            <Navbar pages={ getSubPages() } sub />
            <HandleRoutes/>
            <Routes>
                { pages && pages.map((page, index) => 
                {
                    return <Route key={ page.id } path={ page.path }>
                        { page.children && page.children.map((child, index) => 
                        {
                            return <Route key={ child.id } path={ child.path } element={ <LayoutFactory page={ child }/> }/>
                        }
                        ) }
                        <Route index element={ <LayoutFactory page={ page }/> }/>
                    </Route>
                }) }

            </Routes>
        </BrowserRouter> }
    </>;
}
