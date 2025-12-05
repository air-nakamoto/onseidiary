// 音声日記の15問の質問リスト
// Phase 1では固定テキストとして使用

export const questions = [
    // 【ウォームアップ】当たり障りない事実確認（1-5）
    {
        id: 1,
        text: "今日は疲れてる？それとも元気？",
        category: "warmup"
    },
    {
        id: 2,
        text: "昨日は何時ごろ寝た？",
        category: "warmup"
    },
    {
        id: '2-2',
        text: "そういえば、夢見た？覚えてる？",
        category: "warmup"
    },
    {
        id: 3,
        text: "今日は何時ごろ起きた？",
        category: "warmup"
    },
    {
        id: 4,
        text: "外出した？それとも家にいた？",
        category: "warmup"
    },
    {
        id: 5,
        text: "天気どうだった？晴れてた？",
        category: "warmup"
    },

    // 【関心の発掘】言いたくてしょうがないこと（6-9）
    {
        id: 6,
        text: "今日、頭に残ってることとか気になったこと、何かあった？（例えば見た動画とか、読んだ本とか、やったゲームとか）",
        category: "interest"
    },
    {
        id: 7,
        text: "それってどんな感じだった？",
        category: "interest"
    },
    {
        id: 8,
        text: "そこで何か思ったこと、感じたことある？",
        category: "interest"
    },
    {
        id: 9,
        text: "そこから気づいた、何か学びとか、あった？",
        category: "interest"
    },

    // 【陰の部分】聞きづらいこと・もやもや（10-11）
    {
        id: 10,
        text: "今日、ちょっとモヤっとしたこととか、イラっとしたことあった？",
        category: "shadow"
    },
    {
        id: 11,
        text: "反省したこととか、悔しかったこと、何かある？",
        category: "shadow"
    },

    // 【光の部分】理想・やりたいこと（12-13）
    {
        id: 12,
        text: "明日、何かやりたいこととか、楽しみなことある？",
        category: "light"
    },
    {
        id: 13,
        text: "最近、ちょっとワクワクしてることとか、実現したいことある？",
        category: "light"
    },

    // 【着地】感謝・明日の一歩（14-15）
    {
        id: 14,
        text: "今日、ちょっと嬉しかったこととか、良かったことある？",
        category: "closure"
    },
    {
        id: 15,
        text: "じゃあ、明日まず何からやってみる？",
        category: "closure"
    }
];
