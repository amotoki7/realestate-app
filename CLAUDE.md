# CLAUDE.md — realestate-app

## プロジェクト概要

Supabase 認証機能付きの不動産管理 Web アプリケーション。
会員登録・ログイン後に物件一覧を閲覧できる。

## 技術スタック

- **フロントエンド**: React 19 + TypeScript（Vite）
- **認証・バックエンド**: Supabase（`@supabase/supabase-js`）
- **ルーティング**: React Router v7
- **スタイリング**: インラインスタイル（CSS-in-JS）

## ディレクトリ構成

```
src/
├── components/
│   ├── PrivateRoute.tsx   # 未ログイン時リダイレクトガード
│   └── PropertyCard.tsx   # 物件カードコンポーネント
├── contexts/
│   └── AuthContext.tsx    # Supabase セッション管理
├── lib/
│   └── supabaseClient.ts  # Supabase クライアント初期化
├── pages/
│   ├── Login.tsx          # ログイン画面
│   ├── Register.tsx       # 会員登録画面
│   └── Properties.tsx     # 物件一覧画面（ログイン必須）
├── App.tsx                # ルーティング定義
└── main.tsx               # エントリポイント
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npx tsc --noEmit

# Lint
npm run lint
```

## 環境変数

`.env` ファイルで管理。`.gitignore` に含まれているため **絶対にコミットしない**。

| 変数名 | 内容 |
|--------|------|
| `VITE_SUPABASE_URL` | Supabase プロジェクト URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Publishable Key |

設定例は `.env.example` を参照。

## コーディング規約

- TypeScript の `any` 型使用禁止
- コンポーネントは関数コンポーネントで統一
- コメントは日本語で「なぜ」を書く
- 不要なコメント・TODO を残さない

## Git 運用ルール

### 基本方針
- **コードを変更するたびに必ず GitHub へプッシュする**
- `main` ブランチへの直接プッシュは禁止。作業ブランチを作成すること

### ブランチ命名規則
```
feature/<機能名>   # 新機能追加
fix/<バグ名>       # バグ修正
chore/<作業名>     # 設定変更・リファクタリング
```

### コミットメッセージ規則
プレフィックスを付ける:
- `feat:` 新機能
- `fix:` バグ修正
- `refactor:` リファクタリング
- `style:` スタイル変更（ロジック変更なし）
- `test:` テスト追加・修正
- `chore:` ビルド設定・依存関係の変更
- `docs:` ドキュメント変更

### 変更後の標準フロー

```bash
# 1. 変更をステージング（ファイル名を指定）
git add <ファイル名>

# 2. コミット
git commit -m "feat: 物件詳細ページを追加"

# 3. GitHub へプッシュ（変更のたびに必ず実行）
git push origin <ブランチ名>
```

### Pull Request
- PR タイトルはコミットメッセージ規則に従う
- `main` へのマージは PR 経由のみ

## セキュリティ

- Supabase キー等の秘密情報は `.env` に保存し、コミットしない
- 外部 API 呼び出しはサーバーサイドで行い、クライアントに認証情報を露出させない
