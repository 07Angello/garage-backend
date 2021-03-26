
const isGratherThanZero = ( value, { req, location, path } ) => {
    if (value <= 0) {
        return false;
    }

    return true
}

module.exports = {
    isGratherThanZero
};