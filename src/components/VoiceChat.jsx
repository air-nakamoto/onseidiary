import { useState, useEffect, useRef } from 'react'
import { questions } from '../data/questionList'
import { speak, stopSpeaking } from '../utils/speechApi'
import { generateDiarySummary } from '../utils/aiApi'

function VoiceChat({ onComplete, onCancel }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState(null)

    const recognitionRef = useRef(null)

    // Initialize speech recognition
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setError('お使いのブラウザは音声認識に対応していません。ChromeまたはEdgeをお使いください。')
            return
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.lang = 'ja-JP'
        recognition.continuous = false
        recognition.interimResults = false

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript
            setCurrentAnswer(transcript)
            setIsListening(false)
        }

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
            setError(`音声認識エラー: ${event.error}`)
            setIsListening(false)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        recognitionRef.current = recognition

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    // Speak current question when component mounts or question changes
    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex]
            speakQuestion(question.text)
        }
    }, [currentQuestionIndex])

    const speakQuestion = async (text) => {
        setIsSpeaking(true)
        try {
            await speak(text)
        } catch (err) {
            console.error('Speech synthesis error:', err)
        }
        setIsSpeaking(false)
    }

    const startListening = () => {
        if (!recognitionRef.current || isListening) return

        setError(null)
        setCurrentAnswer('')
        setIsListening(true)

        try {
            recognitionRef.current.start()
        } catch (err) {
            console.error('Failed to start recognition:', err)
            setError('音声認識を開始できませんでした')
            setIsListening(false)
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
        }
    }

    const handleNext = async () => {
        if (!currentAnswer.trim()) {
            setError('回答を入力してください')
            return
        }

        // Save answer
        const questionId = questions[currentQuestionIndex].id
        const newAnswers = {
            ...answers,
            [`q${questionId}`]: currentAnswer
        }
        setAnswers(newAnswers)
        setCurrentAnswer('')
        setError(null)

        // Check if this was the last question
        if (currentQuestionIndex >= questions.length - 1) {
            // Generate diary
            await generateDiary(newAnswers)
        } else {
            // Move to next question
            setCurrentQuestionIndex(prev => prev + 1)
        }
    }

    const generateDiary = async (finalAnswers) => {
        setIsGenerating(true)
        setError(null)

        try {
            const result = await generateDiarySummary(finalAnswers)

            const diary = {
                date: new Date().toISOString().split('T')[0],
                answers: finalAnswers,
                summary: result.summary,
                closingMessage: result.closingMessage
            }

            onComplete(diary)
        } catch (err) {
            console.error('Failed to generate diary:', err)
            setError('日記の生成に失敗しました: ' + err.message)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSkip = () => {
        const questionId = questions[currentQuestionIndex].id
        setAnswers({
            ...answers,
            [`q${questionId}`]: '（スキップ）'
        })
        setCurrentAnswer('')

        if (currentQuestionIndex >= questions.length - 1) {
            generateDiary({
                ...answers,
                [`q${questionId}`]: '（スキップ）'
            })
        } else {
            setCurrentQuestionIndex(prev => prev + 1)
        }
    }

    if (isGenerating) {
        return (
            <div className="voice-chat-container">
                <div className="loading">
                    <p>✨ 今日の日記を生成しています...</p>
                    <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '1rem' }}>
                        しばらくお待ちください
                    </p>
                </div>
            </div>
        )
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <div className="voice-chat-container">
            <div className="progress-info">
                質問 {currentQuestionIndex + 1} / {questions.length}
            </div>

            <div className="question-display">
                <p>{currentQuestion?.text}</p>
            </div>

            {isSpeaking && (
                <p style={{ color: '#888', fontSize: '0.9rem' }}>🔊 音声再生中...</p>
            )}

            <div className="answer-display">
                {currentAnswer || <span style={{ color: '#666' }}>マイクボタンを押して回答してください</span>}
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="voice-controls">
                <button
                    className={`mic-button ${isListening ? 'listening' : ''}`}
                    onClick={isListening ? stopListening : startListening}
                    title={isListening ? 'タップして停止' : 'タップして話す'}
                >
                    {isListening ? '⏹️' : '🎤'}
                </button>
            </div>

            <div className="voice-controls">
                <button onClick={handleNext} disabled={!currentAnswer.trim()}>
                    次へ →
                </button>
                <button onClick={handleSkip}>
                    スキップ
                </button>
                <button onClick={onCancel}>
                    キャンセル
                </button>
            </div>

            <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '2rem' }}>
                💡 ヒント: マイクボタンを押して話すと、自動的にテキスト化されます
            </p>
        </div>
    )
}

export default VoiceChat
