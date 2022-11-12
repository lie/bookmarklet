const path = require('path')
const glob = require('glob')
const webpack = require('webpack')

const srcPath = __dirname + '/src/'
const targets = glob.sync(srcPath + '*.js')
const entries = {}
targets.forEach(value => {
	const re = new RegExp(srcPath)
	const key = value.replace(re, '')
	entries[key] = value
})
console.log(targets, entries, srcPath)

module.exports = {
	entry: entries,
	output: {
		filename: '[name]',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'production'
}

/*
module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}
*/
