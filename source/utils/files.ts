import path from 'path'
import { createHash } from 'crypto'
import { normalizePath } from 'vite'
import { existsSync } from 'fs-extra'

export function sanitise(...filePaths: string[]) {
	let filePath = filePaths.join('/')
	let nPath = normalizePath(path.normalize(filePath))
	let { dir = '', name, ext } = path.parse(nPath)
	let fileName = `${dir}/${name}`.replace(/^\/+/, '')
	return {
		name: fileName,
		path: fileName + ext,
	}
}

/** checks is the file is in public or source */
export function getFileName(fileName: string, config?: Vite.ResolvedConfig) {
	fileName = normalizePath(fileName)
	const outputPath = sanitise(fileName).name

	// probable file path in root and public folder
	const file = {
		S: config?.root && sanitise(config.root, fileName).path,
		P: config?.publicDir && sanitise(config.publicDir, fileName).path,
	}
	return {
		inputFile: file.S && existsSync(file.S) ? file.S : undefined,
		publicFile: file.P && existsSync(file.P) ? file.P : undefined,
		outputFile: outputPath,
	}
}

export function isHTML(file: string): boolean {
	return /[^*]+.html$/.test(file)
}

export function hashFileName(file: string, format: string): string {
	let { name, ext } = path.parse(file)
	const hash = getHash(file)

	const filePath = format
		.replace(/\[ext\]/g, ext.substring(1))
		.replace(/\[name\]/g, name)
		.replace(/\[hash\]/g, hash)

	return filePath
}

export function getHash(text: string) {
	return createHash('sha256').update(text).digest('hex').substring(0, 8)
}
