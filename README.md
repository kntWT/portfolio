# portfolio

## 使用技術
 - [React](https://react.dev/)
 - [vite](https://vitejs.dev/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [mui](https://mui.com/)

## セットアップ
### 環境変数の設定
`.env.local`
```
VITE_TWITTER_URL = X(Twitter)のURL
VITE_GITHUB_URL = GitHubのURL
VITE_FETCH_WORKS_URL = worksを取得するAPIのURL
VITE_FETCH_WORKS_PARAMS = worksを取得する際のクエリパラメータ
```
### ビルド
```
npm run build
```

## 開発のルールとツール
### Git Hooks (コミット前フォーマットチェック)
本プロジェクトでは、コードの整合性を保つため、コミット時に自動で Prettier によるコードフォーマットチェック（`npm run format:check`）を実行します。

初回開発時は、以下のいずれかの方法で Git Hooks のセットアップを行ってください。

```bash
# 1. npm install を実行する（prepareスクリプトにより自動で適用されます）
npm install

# 2. または、手動でセットアップスクリプトを実行する
./setup-hooks.sh
```

※ この設定により、Gitのフック参照先がリポジトリ内の `.githooks/` ディレクトリに変更され、追加の依存関係なしでコミット時の自動検証が動作するようになります。