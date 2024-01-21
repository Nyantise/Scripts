import path, { dirname } from "path";
import { fileURLToPath } from "url";


export async function getProjectPath(pth: string = '') {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    return path.resolve(__dirname,'../../') + pth.split('./').join('/');
 }

export async function getModulesPath(module:string) {
    return await getProjectPath('/bin/modules'+module);
}