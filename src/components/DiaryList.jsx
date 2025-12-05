function DiaryList({ entries, onBack }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        })
    }

    return (
        <div className="diary-list">
            <h2>📚 過去7日分の日記</h2>

            {entries.length === 0 ? (
                <p style={{ margin: '2rem 0', color: '#888' }}>
                    まだ日記がありません。最初の日記を書いてみましょう！
                </p>
            ) : (
                <>
                    {entries.map((entry) => (
                        <div key={entry.id} className="diary-item">
                            <div className="date">{formatDate(entry.date)}</div>
                            <div className="summary">{entry.summary}</div>
                            {entry.closingMessage && (
                                <div className="closing">{entry.closingMessage}</div>
                            )}
                        </div>
                    ))}
                </>
            )}

            <button onClick={onBack} style={{ marginTop: '2rem' }}>
                🏠 ホームに戻る
            </button>
        </div>
    )
}

export default DiaryList
