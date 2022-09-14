import { ButtonHTMLAttributes, useMemo } from 'react';

type sizeTypes = 'sm' | 'md' | 'lg' | 'xl';

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
    variant?: string;
    size?: sizeTypes;
}
export default function Button(props: props)  
{
    const { variant=null, size = 'md', className = '', children, ...rest } = props;

    const getClasses = useMemo(()=>
    {
        let classes = [ className,'btn' ];

        if(size !== 'md') classes.push('btn-' + size);

        if(variant) classes.push('btn-' + variant);

        return classes.join(' ')
    },[ size,variant,className ])

    return <button className={ getClasses } { ...rest }>{ children }</button>;
}