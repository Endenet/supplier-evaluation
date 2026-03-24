const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info to req
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Admins only.' });
    }
    next();
};

exports.isUser = (req, res, next) => {
    if (req.user?.role !== 'user') {
        return res.status(403).json({ message: 'Access Denied: Users only.' });
    }
    next();
};
