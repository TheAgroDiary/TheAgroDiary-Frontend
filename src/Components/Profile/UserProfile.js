
const UserProfile = () => {

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    return (
        <div className="container-fluid">
            <h1> This is my Profile page </h1>
        </div>
    )
}

export default UserProfile;