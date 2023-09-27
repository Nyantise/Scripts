#!/bin/bash

fileExplorer() {
for f in $path/*
do
  f="${f/"$path/"/""}"
  if [[ $f == *"index.sh"* ]]; then
    continue;
  fi
  if [[ "$f" != *".sh"* ]]; then
    continue;
  fi
  noSH=$(echo "$f" | sed 's/.sh//g')
  noSH="${noSH//"_"/" "}"
  menu=$(printf "$menu\n$noSH")
done

selected=$(echo "$menu" | rofi -normal-window -dmenu -p "$rofiTip")
selected="${selected//" "/"_"}"
}
