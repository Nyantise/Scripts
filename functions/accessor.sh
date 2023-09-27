#!/bin/bash
accessor(){
    if [ "$exploring" = 1 ]; then
        pathSelector
        return
    fi
    if [ $type = "module" ]; then
        folderExplorer
        sh $path/$selected/index.sh
        return
    fi
    if [ $type = "submodule" ]; then
        fileExplorer
        sh $path/$selected.sh
        return
    fi
}