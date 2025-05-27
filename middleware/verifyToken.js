const jwt = require('jsonwebtoken');

//Kontrollera token och skicka vidare till skyddad route
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token saknas' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Ogiltig token' });

        req.user = user;
        next();
    });
}

//Exporterar funktion
module.exports = authenticateToken;