# CLAUDE.md — realestate-app

## プロジェクト概要

不動産情報の検索・管理を行うWebアプリケーション。

## 技術スタック

- **フロントエンド**: (例: Next.js / React / TypeScript)
- **バックエンド**: (例: Node.js / Express)
- **データベース**: (例: PostgreSQL / Supabase)
- **スタイリング**: (例: Tailwind CSS)

> セットアップ後、使用する実際の技術スタックに合わせてこのセクションを更新してください。

## ディレクトリ構成

```
realestate-app/
├── src/
│   ├── components/   # 再利用可能なUIコンポーネント
│   ├── pages/        # ページコンポーネント（Next.jsの場合）
│   ├── lib/          # ユーティリティ・ヘルパー関数
│   └── types/        # TypeScript型定義
├── public/           # 静的ファイル
└── CLAUDE.md
```

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm test

# 型チェック
npm run typecheck

# Lint
npm run lint
```

## コーディング規約

- TypeScript を使用する場合、`any` 型の使用を避ける
- コンポーネントは関数コンポーネントで統一する
- ファイル名はケバブケース（例: `property-card.tsx`）
- コメントは「なぜ」を書く。何をしているかはコードで表現する
- 不要なコメントや TODO を残さない

## Git 運用ルール

### 基本方針
- **コードを変更するたびに必ず GitHub へプッシュする**
- `main` ブランチへの直接プッシュは禁止。必ず作業ブランチを作成する

### ブランチ命名規則
```
feature/<機能名>   # 新機能追加
fix/<バグ名>       # バグ修正
chore/<作業名>     # 設定変更・リファクタリング
```

### コミットメッセージ規則
- 変更内容を 1 行で簡潔に記述（日本語可）
- プレフィックスを付ける:
  - `feat:` 新機能
  - `fix:` バグ修正
  - `refactor:` リファクタリング
  - `style:` スタイル変更（ロジック変更なし）
  - `test:` テスト追加・修正
  - `chore:` ビルド設定・依存関係の変更
  - `docs:` ドキュメント変更

### 変更後の標準フロー

```bash
# 1. 変更をステージング（特定ファイルを指定することを推奨）
git add <ファイル名>

# 2. コミット
git commit -m "feat: 物件一覧ページを追加"

# 3. GitHub へプッシュ（変更のたびに必ず実行）
git push origin <ブランチ名>
```

### Pull Request
- PR のタイトルはコミットメッセージと同じ規則に従う
- マージ前にセルフレビューを行う
- `main` へのマージは PR 経由のみ

## セキュリティ

- API キーや秘密情報は `.env.local` に保存し、絶対にコミットしない
- `.env.local` は `.gitignore` に含める
- 外部 API の呼び出しはサーバーサイドで行い、クライアントに認証情報を露出させない
