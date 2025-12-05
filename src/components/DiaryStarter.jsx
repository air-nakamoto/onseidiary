function DiaryStarter({ onStart, onViewList, hasEntries }) {
    return (
        <div className="starter-container">
            <p>音声で日記をつけましょう。質問に答えるだけで、今日の振り返りができます。</p>
            <p>所要時間：5-10分</p>

            <button onClick={onStart} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                🎙️ 日記を始める
            </button>

            {hasEntries && (
                <button onClick={onViewList} style={{ marginTop: '1rem' }}>
                    📚 過去の日記を見る
                </button>
            )}

            <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
                <p>※ ChromeまたはEdgeブラウザを推奨</p>
                <p>※ マイクへのアクセスを許可してください</p>
            </div>
        </div>
    )
}

export default DiaryStarter
