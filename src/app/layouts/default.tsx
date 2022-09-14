import { useNavigation } from '../../hooks';
import ComponentFactory from '../components/ComponentFactory';

export default function Default()
{ 
    const { activePage, componentsForPageColumn } = useNavigation();

    if(!activePage) return null;

    const columns: number[] = [ 3,1 ];
    
    return (
        <div className="container h-100">
            <div className="row">
                { columns.map((val, ind) => 
                {
                    return <div key={ `a-${ ind }` } className={ `col-${ val }` }>
                        { componentsForPageColumn(activePage,val).length > 0 && componentsForPageColumn(activePage,val).map((component,index) => 
                        {
                            return <ComponentFactory key={ `b${ index }` } component={ component } />
                        }) }
                    </div>
                }) }
            </div>
        </div>
    );
};
