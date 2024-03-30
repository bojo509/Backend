import pkg from 'jsonwebtoken';
const { verify } = pkg;

const userAuth = async (req, res, next) => {
    const authHandler = req?.headers?.authorization;

    if (!authHandler || !authHandler.startsWith("Bearer")) {
        next("Unauthorized access")
    }

    const token = authHandler?.split(" ")[1];

    if (!token) {
        next("Auth failed: no token provided")
    }

    try {
        const userToken = verify(token, process.env.JWT_SECRET_KEY);
        req.body.user = {
            userId: userToken.userId,
        }

        next();
    } catch (error) {
        console.log(error)
        next("Auth failed")
    }
}

export default userAuth;