const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Valideringsfunktion
function validateCredentials(email, password) {
    const errors = [];

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push({ field: 'email', message: 'Ogiltig eller saknad e-postadress' });
    }
    if (!password || typeof password !== 'string' || password.length < 7) {
        errors.push({ field: 'password', message: 'Lösenord måste vara minst 7 tecken' });
    }
    return errors;
}

//Registrera användare
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    const errors = validateCredentials(email, password);

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Ogiltig inmatning', details: errors });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'E-postadressen är redan registrerad' });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'Användare skapad!' });
    } catch (err) {
        console.error('Fel vid registrering:', err);
        res.status(500).json({ error: 'Serverfel' });
    }
};

//Logga in användare
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const errors = validateCredentials(email, password);

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Ogiltig inmatning', details: errors });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Felaktig e-post eller lösenord' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Användare är inloggad', token });
    } catch (err) {
        console.error('Fel vid inloggning:', err);
        res.status(500).json({ error: 'Serverfel' });
    }
};