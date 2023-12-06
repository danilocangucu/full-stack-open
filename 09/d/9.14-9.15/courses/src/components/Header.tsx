const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
}

interface HeaderProps {
    name: string
}

export default Header;