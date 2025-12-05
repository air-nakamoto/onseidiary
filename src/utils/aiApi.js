// LLM API integration for diary summary generation
// Phase 1: Using Claude API (you can switch to OpenAI if preferred)

/**
 * Generate diary summary from answers using LLM API
 * @param {Object} answers - Object containing all Q&A pairs
 * @returns {Promise<{summary: string, closingMessage: string}>}
 */
export async function generateDiarySummary(answers) {
    // For Phase 1, you need to set your API key here
    // IMPORTANT: Replace with your actual API key
    const API_KEY = 'YOUR_CLAUDE_API_KEY_HERE' // or 'YOUR_OPENAI_API_KEY_HERE'

    if (API_KEY === 'YOUR_CLAUDE_API_KEY_HERE' || !API_KEY) {
        // Fallback: Generate a mock summary for testing without API
        return generateMockSummary(answers)
    }

    const prompt = createPrompt(answers)

    try {
        // Using Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        })

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        const content = data.content[0].text

        return parseSummaryResponse(content)

    } catch (error) {
        console.error('API Error:', error)
        throw new Error('日記の生成に失敗しました。APIキーを確認してください。')
    }
}

/**
 * Alternative: OpenAI API implementation
 * Uncomment this function if you want to use OpenAI instead
 */
/*
export async function generateDiarySummaryOpenAI(answers) {
  const API_KEY = 'YOUR_OPENAI_API_KEY_HERE'
  const prompt = createPrompt(answers)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    return parseSummaryResponse(content)

  } catch (error) {
    console.error('API Error:', error)
    throw new Error('日記の生成に失敗しました。')
  }
}
*/

/**
 * Create prompt for LLM
 */
function createPrompt(answers) {
    const answersText = Object.entries(answers)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')

    return `以下は音声日記の15問への回答です。
今日の出来事、学び、感情、明日のアクションを整理して、
読みやすい日記形式（200-300文字）にまとめてください。

【回答】
${answersText}

以下の形式で出力してください：

【日記】
（ここに日記本文を書く）

【明日へのメッセージ】
（前向きな一言で締める）`
}

/**
 * Parse LLM response to extract summary and closing message
 */
function parseSummaryResponse(content) {
    const lines = content.split('\n').filter(line => line.trim())

    let summary = ''
    let closingMessage = ''
    let currentSection = null

    for (const line of lines) {
        if (line.includes('【日記】')) {
            currentSection = 'summary'
            continue
        } else if (line.includes('【明日へのメッセージ】')) {
            currentSection = 'closing'
            continue
        }

        if (currentSection === 'summary') {
            summary += line + '\n'
        } else if (currentSection === 'closing') {
            closingMessage += line + ' '
        }
    }

    return {
        summary: summary.trim() || content,
        closingMessage: closingMessage.trim() || '明日も一歩ずつ、前へ。'
    }
}

/**
 * Generate mock summary for testing without API
 */
function generateMockSummary(answers) {
    const hasContent = Object.values(answers).some(a => a && a !== '（スキップ）')

    if (!hasContent) {
        return {
            summary: '今日は日記を書く練習をしました。次回はもっと詳しく振り返りをしてみましょう。',
            closingMessage: '小さな一歩でも、続けることが大切です。'
        }
    }

    // Extract some answers for mock summary
    const energy = answers.q1 || '普通'
    const interest = answers.q6 || '特になし'
    const tomorrow = answers.q15 || '今日と同じように過ごす'

    return {
        summary: `今日は${energy}な一日だった。${interest !== '特になし' ? interest + 'について考えた。' : ''}明日は${tomorrow}ことから始めてみよう。`,
        closingMessage: '一日一日を大切に。明日も自分のペースで進んでいこう。'
    }
}
