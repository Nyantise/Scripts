#!/bin/bash
for line in $(gh search repos --owner=$GITHUB_USER --visibility=private --sort=updated --limit=$FETCH_REPO_QUANTITY)
do
    if [[ "$line" == *"Nyantise"* ]]; then
    menu=$(printf "$menu\n$line")
fi
done

selected=$(echo "$menu" | rofi -dmenu -p "selecione a ação: ")

gh repo clone $selected