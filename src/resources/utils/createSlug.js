const slugify = require('slugify');

module.exports = createSlug = (str, options) => {
    return slugify(str+'', {
        replacement: options.replacement || '-',
        remove: options.remove || false,
        lower: options.lower || true,
        strict: options.strict || false,
        locale: options.locale || 'vi',
        trim: options.trim || true,
    })
}