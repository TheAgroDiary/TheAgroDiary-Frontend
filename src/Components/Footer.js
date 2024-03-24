const Footer = () => {
    return (
        <footer className="bg-secondary-subtle text-center p-3 mt-auto">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} The AgroDiary </p>
            </div>
        </footer>
    )
}

export default Footer;