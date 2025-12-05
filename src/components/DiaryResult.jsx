function DiaryResult({ diary, onBack, onViewList }) {
    if (!diary) return null

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        })
    }

    return (
        <div className="diary-result">
            <h2>📝 今日の日記</h2>
            <p className="date">{formatDate(diary.date)}</p>

            <div className="summary">
                {diary.summary}
            </div>

            {diary.closingMessage && (
                <div className="closing-message">
                    {diary.closingMessage}
                </div>
            )}

            <div className="actions">
                <button onClick={onBack}>🏠 ホームに戻る</button>
                <button onClick={onViewList}>📚 過去の日記を見る</button>
            </div>
        </div>
    )
}

export default DiaryResult
