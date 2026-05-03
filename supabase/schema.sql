-- =====================================================
-- 不動産管理アプリ: propertiesテーブルとRLSポリシー
-- Supabase の SQL Editor で実行してください
-- =====================================================

-- -------------------------------------------------
-- テーブル作成
-- -------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  -- 登録したユーザーを紐付ける（ユーザー削除時に物件も削除）
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,               -- 物件名
  rent        INTEGER     NOT NULL CHECK (rent >= 0), -- 家賃（円）
  area        TEXT        NOT NULL,               -- エリア名
  floor_plan  TEXT        NOT NULL,               -- 間取り（例: 1LDK）
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()  -- 登録日時
);

-- -------------------------------------------------
-- Row Level Security（RLS）を有効化
-- -------------------------------------------------
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------
-- RLS ポリシー: 自分が登録した物件のみ操作可能
-- -------------------------------------------------

-- SELECT: 自分の物件のみ取得できる
CREATE POLICY "自分の物件のみ参照できる"
  ON properties FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: user_id に自分のIDをセットした場合のみ登録できる
CREATE POLICY "自分の物件のみ登録できる"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 自分の物件のみ更新できる
CREATE POLICY "自分の物件のみ更新できる"
  ON properties FOR UPDATE
  USING (auth.uid() = user_id);

-- DELETE: 自分の物件のみ削除できる
CREATE POLICY "自分の物件のみ削除できる"
  ON properties FOR DELETE
  USING (auth.uid() = user_id);
