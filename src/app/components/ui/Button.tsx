import { ButtonHTMLAttributes, useMemo } from 'react';

type sizeTypes = 'sm' | 'md' | 'lg' | 'xl';

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
    variant?: string;
    size?: sizeTypes;
    popIn?: boolean;
}
export default function Button(props: props)  
{
    const { variant=null, size = 'md', className = '', children, popIn = false, ...rest } = props;

    const getClasses = useMemo(()=>
    {
        let classes = [ className,'btn' ];

        if(size !== 'md') classes.push('btn-' + size);

        if(variant) classes.push('btn-' + variant);

        if(popIn) classes.push('animated');

        return classes.join(' ')
    },[ size,variant,className,popIn ])

    return <button className={ getClasses } { ...rest }>{ children }</button>;
}