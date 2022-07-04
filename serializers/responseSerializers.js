class ResponseSerializer {
    tokenResponseSerializers(user, token) {
        var date = new Date(); // Now
        return {
            id: user._id,
            name: user.name,
            surname : user.surname,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: date.setDate(date.getDate() + 365),
        };
    }
}

module.exports = ResponseSerializer;
