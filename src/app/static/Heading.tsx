import { useMemo } from 'react';
import { useNavigation } from '../../hooks';
import Button from '../components/ui/Button';
import LoginForm from './sub/LoginForm';
import Logo from './sub/Logo';

export default function Heading()
{ 
    const { activePage } = useNavigation();

    const minimal = useMemo(()=>
    {
        if(!activePage) return true;
        return activePage.path !== '/';
    },[ activePage ]);

    const getClasses = useMemo(()=>
    {
        let classes = [ 'base-heading', 'w-100' ];

        if(minimal) classes.push('minimal-heading');

        return classes.join(' ');
    },[ minimal ]);

    return (
        <div className={ getClasses }>
            <LoginForm minimal={ minimal }/>
            <div className="container h-100 position-relative">
                <div className="row position-relative h-100">
                    <div className="col-2 d-flex flex-column justify-content-center">
                        <div className="hotel-img align-self-center"/>
                        <Logo />
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center gap-2">
                        { minimal ? <>
                            <Button variant="secondary-blue" size="lg" popIn key="login">Login</Button>
                            <Button variant="dark-green" size="lg" popIn key="register1">Join Today</Button>
                        </> : <>
                            <Button variant="dark-green" size="xl" popIn>Join Today</Button>
                        </> }
                    </div>
                </div>
            </div>
        </div>
    );
};
