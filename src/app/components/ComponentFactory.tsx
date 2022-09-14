import { IComponent } from '../../utils';
import DefaultComponent from './DefaultComponent';
import News from './News';

interface props {
    component: IComponent
}
export default function ComponentFactory(props: props)
{ 
    const { component = null } = props;

    if(!component) return null;

    switch(component.code) 
    {
        case 'news': return <News />;
        default: return <DefaultComponent/>;
    }
};
