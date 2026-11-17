module.exports = (err, _req, res, _next) => {
    console.error(err);
    if (err.code === '23514') return res.status(400).json({ error: 'Invalid Value'});
    res.status(500).json({ error: 'Server error'});
};