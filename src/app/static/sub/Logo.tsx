
interface props {
    className?: string;
}
export default function Logo(props: props)
{ 
    const { className = 'base-logo' } = props;

    return <div className={ className }>
        <img src="/logo.png" className="mx-auto"/>  
    </div>;
};
