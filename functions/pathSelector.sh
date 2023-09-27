#!/bin/bash

pathSelector(){
    path2=$path
    path2=".${path2/"$HOME/.scripts/src"/""}"
    if [ "$path2" == "." ]; then
        path2=./
    fi
    menu="selecionar: $path2"
    rofiTip="selecione o caminho: "

    folderExplorer
    if [[ $selected == *"selecionar:"* ]]; then
        selected="${selected/"selecionar:_"/""}"
        selected=$(echo "$selected" | cut -c3-)
        export exploring=0
        return
    fi
    sh $path/$selected/index.sh
}