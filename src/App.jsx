import { useState, useEffect } from 'react'
import DiaryStarter from './components/DiaryStarter'
import VoiceChat from './components/VoiceChat'
import DiaryResult from './components/DiaryResult'
import DiaryList from './components/DiaryList'
import './App.css'

function App() {
    const [currentView, setCurrentView] = useState('starter') // starter, chat, result, list
    const [diaryEntries, setDiaryEntries] = useState([])
    const [currentDiary, setCurrentDiary] = useState(null)

    // Load diary entries from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('diaryEntries')
        if (stored) {
            setDiaryEntries(JSON.parse(stored))
        }
    }, [])

    // Save diary entries to localStorage whenever they change
    useEffect(() => {
        if (diaryEntries.length > 0) {
            localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries))
        }
    }, [diaryEntries])

    const handleStartDiary = () => {
        setCurrentView('chat')
    }

    const handleDiaryComplete = (newDiary) => {
        const diaryWithId = {
            ...newDiary,
            id: Date.now(),
            createdAt: new Date().toISOString()
        }

        setDiaryEntries(prev => [diaryWithId, ...prev])
        setCurrentDiary(diaryWithId)
        setCurrentView('result')
    }

    const handleViewList = () => {
        setCurrentView('list')
    }

    const handleBackToStart = () => {
        setCurrentDiary(null)
        setCurrentView('starter')
    }

    return (
        <div className="app">
            <h1>🎙️ 音声日記 - Ondiary</h1>

            {currentView === 'starter' && (
                <DiaryStarter
                    onStart={handleStartDiary}
                    onViewList={handleViewList}
                    hasEntries={diaryEntries.length > 0}
                />
            )}

            {currentView === 'chat' && (
                <VoiceChat
                    onComplete={handleDiaryComplete}
                    onCancel={handleBackToStart}
                />
            )}

            {currentView === 'result' && (
                <DiaryResult
                    diary={currentDiary}
                    onBack={handleBackToStart}
                    onViewList={handleViewList}
                />
            )}

            {currentView === 'list' && (
                <DiaryList
                    entries={diaryEntries.slice(0, 7)}
                    onBack={handleBackToStart}
                />
            )}
        </div>
    )
}

export default App
