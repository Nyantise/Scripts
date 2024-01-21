import { exec } from 'child_process'
import cmd from "@/utils/cmd-exec.js";

const visibility = await cmd(`echo "private\npublic" | rofi -normal-window -dmenu -p visibility`);

const fetching = exec(`rofi -e "fetching"`)
const resp = await cmd('gh search repos --owner=Nyantise --visibility='+visibility.stdout)
fetching.kill();

const list = resp.stdout.split('\n').map(el =>{
    return el.split('\t')[0]
});


const repo = await cmd(`echo "${list.join('\n')}" | rofi -normal-window -dmenu`);

const cloning = exec(`rofi -e "cloning "`)
await cmd(`gh repo clone ${repo.stdout}`)
cloning.kill();
