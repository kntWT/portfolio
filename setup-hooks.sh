#!/bin/sh

# Git Hooksの参照先をリポジトリ内の .githooks に設定します
git config core.hooksPath .githooks

# フック用スクリプトに実行権限を付与します
chmod +x .githooks/pre-commit

echo "🎉 Git hooks の設定が完了しました！(.githooks を参照するように設定されました)"
