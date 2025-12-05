# 🎙️ Ondiary - 音声日記アプリ

**デモ**: https://air-nakamoto.github.io/onseidiary/

音声で毎日日記をつけられるWebアプリケーション。15問の質問に答えるだけで、振り返りができて前向きな気持ちで終われます。

## ✨ 特徴

- 🎤 **音声対話**: マイクで話すだけで日記が完成
- 📝 **15問の質問**: ウォームアップから深掘り、前向きな着地まで
- 🤖 **AI要約**: LLMが日記を自動生成
- 💾 **過去7日分**: 過去の日記を振り返れる
- 🌐 **ブラウザで完結**: インストール不要

## 🚀 クイックスタート

### 必要なもの

- Node.js 18以上
- Chrome または Edge ブラウザ
- マイク

### セットアップ

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:5173/ を開いて使用開始！

詳しい手順は [SETUP.md](SETUP.md) をご覧ください。

## 📖 使い方

1. **「日記を始める」をクリック**
2. 質問が音声で読み上げられます
3. **マイクボタン🎤をタップ**して回答
4. 15問すべてに回答すると日記が完成
5. 過去7日分の日記を振り返り可能

## 🔧 技術スタック

- **React 18** + **Vite 5**
- **Web Speech API** - 音声入出力
- **Claude API / OpenAI API** - 日記生成
- **localStorage** - データ永続化

## 📁 プロジェクト構成

```
ondiary/
├── src/
│   ├── components/      # React コンポーネント
│   ├── utils/           # ユーティリティ関数
│   └── data/            # 質問リスト
├── index.html
├── package.json
└── README.md
```

## ⚙️ 設定

### LLM API（任意）

APIキーなしでもモック日記が生成されますが、より洗練された日記を生成したい場合：

1. `src/utils/aiApi.js` を開く
2. `API_KEY` を設定

```javascript
const API_KEY = 'your-api-key-here'
```

Claude API: https://console.anthropic.com/

## 📝 開発状況

- ✅ Phase 1: MVP（固定質問 + AI要約）**← 完成**
- ⬜ Phase 2: 柔軟化（一部AI対話）
- ⬜ Phase 3: 完全AI化 + 外部データ連携

詳細は `README.me.ini` を参照

## 📄 ライセンス

MIT


**開発者**: MM199  
**バージョン**: 0.0.0 (Phase 1)
