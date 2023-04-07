import type { ChunkMetadata, FilterPattern } from 'vite'

export interface WebExtensionOptions {
	/** The manifest to generate extension */
	manifest: chrome.runtime.Manifest

	/** use hashed filenames */
	useHasedFileName?: boolean

	/** Sets the use_dynamic_url property on web accessible resources */
	useDynamicUrl?: boolean

	/** filter scripts for compiling */
	webAccessibleScripts?: {
		include?: FilterPattern | undefined
		exclude?: FilterPattern | undefined
		options?: { resolve?: string | false | null | undefined }
	}
}

/**
 * Build cross platform, module-based web extensions using vite
 */
declare function webExtension(options?: WebExtensionOptions): any
export default webExtension
