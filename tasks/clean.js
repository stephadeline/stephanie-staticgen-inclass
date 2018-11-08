const gulp = require('gulp');
import del from 'del'; 

module.exports = () => {
    del(['docs/*'], {dot: true})
};
