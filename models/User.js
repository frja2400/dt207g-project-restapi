const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Ogiltig e-postadress']
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    }
});


//Hasha lösenord innan spara
userSchema.pre('save', async function (next) {
    try {
        if (this.isNew || this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

//Metod för att jämföra lösenord vid login
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

//Statisk metod för registrering av användare
userSchema.statics.register = async function (email, password) {
    try {
        const user = new this({ email, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

//Statisk metod för login
userSchema.statics.login = async function (email, password) {
    try {
        const user = await this.findOne({ email });
        if (!user) throw new Error('Felaktig e-post eller lösenord');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Felaktig e-post eller lösenord');

        return user;
    } catch (error) {
        throw error;
    }
};

//Exportera modellen
const User = mongoose.model("User", userSchema);
module.exports = User;