import jwt from 'jsonwebtoken'

const getUserInfoFromToken = (token) => {

    const jwt = require('jsonwebtoken');
    const SECRET = '5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437';

    try {
        const decoded = jwt.verify(token, SECRET, '', '')
        const username = decoded.sub;

        return {username}
    }
    catch (error) {
        console.error("Error decoding the token: ", error)

        return null;
    }
}

export default getUserInfoFromToken;