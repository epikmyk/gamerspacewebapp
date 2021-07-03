import { Dropdown } from 'react-bootstrap';

const Logout = () => {

    const logout = () => {
        console.log("logging out");
        fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '',
        })
            .then(data => {
                console.log(data);
                localStorage.setItem("notificationcount", 0);
                localStorage.removeItem("friends");
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Dropdown.Item className="logout-button" onClick={logout}>Logout</Dropdown.Item>
    )
}

export default Logout;