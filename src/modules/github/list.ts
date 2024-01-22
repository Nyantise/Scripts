import { exec } from 'child_process'
import cmd from "@/utils/cmd-exec.js";
import rofi, { cmdNotifiers, rofiMessage } from '@/utils/rofi.js';

const visibility = await rofi(['private', 'public'], {tip:"Visibility"})

const resp = await cmdNotifiers('gh search repos --owner=Nyantise --visibility='+visibility, {
    before:"fetching..."
})

const list = resp.stdout.split('\n').map(el =>{
    return el.split('\t')[0].replace('Nyantise/', '')
});


const repo = await rofi(list, {tip: 'Repositories'})

await cmdNotifiers(`gh repo clone ${repo}`, {
    before:"cloning...",
    after:"done"
})
const actualPath = await cmd('pwd')

cmd(`xdg-open ${actualPath.stdout}/${repo}`)