import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useAuthentication } from '../../../hooks';
import Input from '../../components/ui/Input';

interface props {
    minimal: boolean;
}
export default function LoginForm(props:props) 
{
    const { minimal= false } = props;
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ errors, setErrors ] = useState({
        username: false,
        password: false,
        shake: false
    });
    
    const { login } = useAuthentication();

    const ref = useRef<HTMLDivElement>(null);

    const classes = useMemo<string>(()=> 
    {
        let classes = [ 
            'position-absolute',
            'py-3',
            'd-flex',
            'align-items-center',
            'base-login-form',
            'bg-secondary-blue',
            'bg-opacity-25',
            'end-0',
            'start-0',
            'z-3',
            'border-bottom',
            'border-secondary-blue'
        ];

        if(!minimal) classes.push('base-login-form-shown')

        if(errors.shake) classes.push('shake');

        return classes.join(' ');
    },[ minimal,errors ]);

    const onSubmit = async (event: FormEvent) => 
    {
        event.preventDefault();
        
        setErrors({
            username:false,
            password:false,
            shake:false
        })

        if(!username || !password) 
        {
            setErrors(prev => 
            {
                prev = { username: !username, password: !password, shake: true, };

                setTimeout(()=> setErrors(previous => 
                {
                    previous = { ...prev, shake:false }
        
                    setTimeout(()=> 
                    {
                        setErrors({ ...errors, username:false, password:false });
                    },1300);
        
                    return previous;
                }), 800);
                    
                return prev;
            });
            return;
        }
        
        let result = await login(username,password);

        if(result.errors) 
        {
            return;
        }
    };


    useEffect(()=>
    {
        if(!ref) return;

        if(!ref.current) return;
        
        ref.current.setAttribute('style',`--bar-height:-${ ref.current?.offsetHeight }px;`);

        ref.current.style.opacity = '1';
    },[ ref ]);

    return <div className={ classes } ref={ ref }>
        <div className="container">
            <div className="row justify-content-end">
                <div className="col-2">
                    <form className="d-flex gap-2" onSubmit={ onSubmit }>
                        <div className="align-self-center flex-shrink-0 fancy-text">Sign in:</div>
                        <Input type="text" value={ username } setValue={ setUsername } size="sm" placeholder="username" error={ errors.username } />
                        <Input type="text" value={ password } setValue={ setPassword } size="sm" placeholder="password" error={ errors.password } />
                        <button className="btn flex-shrink-0 btn-dark-green btn-sm">Lets Go!</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}