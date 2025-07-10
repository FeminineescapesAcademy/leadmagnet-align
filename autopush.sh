#!/bin/zsh

# Script d'auto push dès qu'un fichier change
fswatch -o . | while read f; do
  echo "📦 Changement détecté, push en cours..."
  git add .
  git commit -m "Auto push du $(date '+%Y-%m-%d %H:%M:%S')"
  git push origin main
done