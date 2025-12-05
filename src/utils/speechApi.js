// Web Speech API utilities for voice input and output

/**
 * Speak text using Web Speech API (SpeechSynthesis)
 * @param {string} text - Text to speak
 * @returns {Promise} - Resolves when speech is complete
 */
export function speak(text) {
    return new Promise((resolve, reject) => {
        if (!('speechSynthesis' in window)) {
            reject(new Error('Speech synthesis not supported'))
            return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ja-JP'
        utterance.rate = 1.0
        utterance.pitch = 1.0
        utterance.volume = 1.0

        utterance.onend = () => resolve()
        utterance.onerror = (event) => reject(event)

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
