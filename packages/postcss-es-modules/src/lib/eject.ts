import { join } from 'path';
import { Options } from './options';
import { promises, existsSync } from 'fs';

let isEjecting = false;

/**
 * Eject the loader code.
 * @internal
 */
export const eject = async (options: Required<Options>): Promise<void> => {
    // resolving path to sources
    const codeBasePath = require.resolve('css-es-modules');
    // determine the extension
    const extension = options.loader.scriptType === 'ts'
        ? '.ts'
        : '.js';
    // determine source to eject
    const codePath = options.loader.scriptType === 'ts'
        ? join(codeBasePath, '../../../src')
        : options.loader.moduleType === 'esm'
            ? join(codeBasePath, '../../dist-esm')
            : join(codeBasePath, '../../dist-cjs');
    // if we know where to eject and we are not during the ejection
    if (options.loader.scriptEjectPath && !isEjecting) {
        isEjecting = true;
        try {
            const injectCodePath = join(options.loader.scriptEjectPath, `inject-styles${extension}`);
            const collectCodePath = join(options.loader.scriptEjectPath,  `collect-styles${extension}`);
            // create directories
            await promises.mkdir(options.loader.scriptEjectPath, {recursive: true});
            // if not exist
            if (!existsSync(injectCodePath)) {
                // copy the inject-styles code
                await promises.copyFile(
                    join(codePath, `inject-styles${extension}`), injectCodePath);
            }
            // if not exist
            if (!existsSync(collectCodePath)) {
                // copy the collect-styles code
                await promises.copyFile(
                    join(codePath, `collect-styles${extension}`), collectCodePath);
            }
        } catch (e) {
            // on any error, just log it.
            console.error('We have a problem with the script ejection !!', e);
        } finally {
            // notify that we where finish
            isEjecting = false;
        }
    }
}
