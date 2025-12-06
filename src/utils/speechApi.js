// Web Speech API utilities for voice input and output

/**
 * Speak text using Web Speech API (SpeechSynthesis)
 * @param {string} text - Text to speak
 * @returns {Promise} - Resolves when speech is complete
 */
export function speak(text) {
    return new Promise((resolve, reject) => {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported')
            resolve() // 非対応でもエラーにしない
            return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ja-JP'
        utterance.rate = 1.0
        utterance.pitch = 1.0
        utterance.volume = 1.0

        // 日本語の音声を探して設定
        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices()
            const japaneseVoice = voices.find(v => v.lang.includes('ja'))
            if (japaneseVoice) {
                utterance.voice = japaneseVoice
            }
        }

        // 音声リストが読み込まれている場合
        if (window.speechSynthesis.getVoices().length > 0) {
            setVoice()
        } else {
            // 音声リストの読み込みを待つ
            window.speechSynthesis.onvoiceschanged = setVoice
        }

        // タイムアウト設定（3秒後に自動でresolve）
        const timeout = setTimeout(() => {
            console.warn('Speech timeout - resolving anyway')
            resolve()
        }, 3000)

        utterance.onend = () => {
            clearTimeout(timeout)
            resolve()
        }

        utterance.onerror = (event) => {
            clearTimeout(timeout)
            console.warn('Speech error:', event.error)
            resolve() // エラーでも続行可能にする
        }

        // Chrome のバグ対策：長い発話が途中で止まる問題
        const resumeInterval = setInterval(() => {
            if (!window.speechSynthesis.speaking) {
                clearInterval(resumeInterval)
            } else {
                window.speechSynthesis.pause()
                window.speechSynthesis.resume()
            }
        }, 5000)

        utterance.onend = () => {
            clearInterval(resumeInterval)
            clearTimeout(timeout)
            resolve()
        }

        window.speechSynthesis.speak(utterance)
    })
}

/**
 * Stop any ongoing speech
 */
export function stopSpeaking() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
    }
}

/**
 * Check if speech synthesis is supported
 * @returns {boolean}
 */
export function isSpeechSynthesisSupported() {
    return 'speechSynthesis' in window
}

/**
 * Check if speech recognition is supported  
 * @returns {boolean}
 */
export function isSpeechRecognitionSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}
