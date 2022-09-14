import { ChangeEvent, useMemo } from 'react';

type sizeTypes = 'sm' | 'md' | 'lg' | 'xl';
type inputTypes = 'text' | 'password';
interface props {
    classes?: string[];
    error?: boolean;
    size?: sizeTypes;
    type?: inputTypes;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}

export default function Input(props: props)
{
    const { classes = [ 'form-control' ], error = false, size = 'md', value = '', setValue = null, placeholder = '', type = 'text' } = props;

    const getClasses = useMemo(()=>
    {
        let classList = classes;

        if(error) classList.push('border-dark-red');

        if(size !== 'md') classList.push('form-control-' + size);

        return classList.join(' ');

    },[ classes, error, size ]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        if(setValue) setValue(event.target.value);
    }

    return <input type={ type } className={ getClasses } value={ value } onChange={ onChange } placeholder={ placeholder }/>
}