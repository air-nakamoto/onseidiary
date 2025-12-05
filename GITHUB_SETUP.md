# GitHub リポジトリ作成とプッシュの手順

## ステップ1: GitHubでリポジトリを作成

1. **GitHubにアクセス**: https://github.com にログイン
2. **New repositoryをクリック**: 右上の「+」→「New repository」
3. **リポジトリ情報を入力**:
   - **Repository name**: `ondiary`（または好きな名前）
   - **Description**: `音声日記アプリ - Phase 1 MVP`
   - **Public** または **Private** を選択
   - ⚠️ **重要**: 「Add a README file」のチェックは**外す**
   - ⚠️ 「Add .gitignore」も**選択しない**（既に作成済み）
4. **「Create repository」をクリック**

作成後、GitHubが表示するURLをコピーしておいてください：
```
https://github.com/YOUR_USERNAME/ondiary.git
```

---

## ステップ2: Gitをインストール

### 方法A: Git for Windows（推奨）

1. **ダウンロード**: https://git-scm.com/download/win
2. インストーラーを実行（デフォルト設定でOK）
3. インストール完了後、**新しいPowerShellウィンドウを開く**

### 方法B: GitHub Desktop（GUI版）

1. **ダウンロード**: https://desktop.github.com/
2. インストールしてGitHubアカウントでログイン
3. GUIで操作可能（コマンド不要）

---

## ステップ3: Gitの初期設定

新しいPowerShellまたはコマンドプロンプトで実行：

```bash
# あなたの名前とメールを設定（GitHubと同じものを使用）
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## ステップ4: ローカルリポジトリを初期化してプッシュ

```bash
# プロジェクトディレクトリに移動
cd C:\Users\MM199\Documents\ondiary

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 最初のコミット
git commit -m "feat: Phase 1 implementation - voice diary app with 15 questions"

# ブランチ名をmainに変更
git branch -M main

# GitHubリポジトリをリモートとして追加（URLは自分のものに置き換える）
git remote add origin https://github.com/YOUR_USERNAME/ondiary.git

# GitHubにプッシュ
git push -u origin main
```

⚠️ **重要**: `YOUR_USERNAME` を自分のGitHubユーザー名に置き換えてください

---

## ステップ5: 認証

初回プッシュ時、認証を求められます：

### 方法1: Personal Access Token（推奨）

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token (classic)」
3. `repo` スコープにチェック
4. トークンをコピー
5. プッシュ時、パスワードの代わりにトークンを入力

### 方法2: GitHub CLI

```bash
# GitHub CLIをインストール後
gh auth login
# 指示に従って認証
```

---

## トラブルシューティング

### Gitコマンドが見つからない
- Git for Windowsをインストール
- **新しいターミナルを開く**（既存のものでは認識されない）

### プッシュが拒否される
```bash
# 強制プッシュ（初回のみ）
git push -f origin main
```

### SSH keyを使いたい場合
```bash
# SSH keyを生成
ssh-keygen -t ed25519 -C "your.email@example.com"

# 公開鍵をGitHubに登録
# GitHub → Settings → SSH and GPG keys → New SSH key

# リモートURLをSSHに変更
git remote set-url origin git@github.com:YOUR_USERNAME/ondiary.git
```

---

## 次回以降の更新

```bash
# 変更をステージング
git add .

# コミット
git commit -m "変更内容の説明"

# プッシュ
git push
```

---

## 参考リンク

- Git公式ドキュメント: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com/
- GitHub Desktop: https://desktop.github.com/
