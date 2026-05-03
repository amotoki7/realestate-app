-- =====================================================
-- 不動産管理アプリ: propertiesテーブルとRLSポリシー
-- Supabase の SQL Editor で実行してください
-- ※ 何度実行しても安全（既存のテーブル・ポリシーを一度削除してから再作成）
-- =====================================================

-- -------------------------------------------------
-- 既存ポリシーを削除（存在しない場合はスキップ）
-- -------------------------------------------------
DROP POLICY IF EXISTS "select_own_properties"  ON properties;
DROP POLICY IF EXISTS "insert_own_properties"  ON properties;
DROP POLICY IF EXISTS "update_own_properties"  ON properties;
DROP POLICY IF EXISTS "delete_own_properties"  ON properties;

-- -------------------------------------------------
-- テーブル作成（既に存在する場合はスキップ）
-- -------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  rent        INTEGER     NOT NULL CHECK (rent >= 0),
  area        TEXT        NOT NULL,
  floor_plan  TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------
-- Row Level Security（RLS）を有効化
-- -------------------------------------------------
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------
-- RLS ポリシー: 自分が登録した物件のみ操作可能
-- -------------------------------------------------

-- SELECT: 自分の物件のみ取得できる
CREATE POLICY "select_own_properties"
  ON properties FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: user_id に自分のIDをセットした場合のみ登録できる
CREATE POLICY "insert_own_properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 自分の物件のみ更新できる
CREATE POLICY "update_own_properties"
  ON properties FOR UPDATE
  USING (auth.uid() = user_id);

-- DELETE: 自分の物件のみ削除できる
CREATE POLICY "delete_own_properties"
  ON properties FOR DELETE
  USING (auth.uid() = user_id);
