import {ExecaError, ExecaReturnValue, execaCommand} from 'execa';

export default async function cmd(cmd:string, debug:boolean = false, response:boolean = true){
    try {
        const resp = await execaCommand(cmd, {
            shell:true,
            encoding:'utf8',
            
        }) as ExecaReturnValue
        return resp
    } catch (error) {
        return error as ExecaError
    }
}



