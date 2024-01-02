import Sentiment from 'sentiment';

const sentiment = new Sentiment()
const minParam: number = 3

try {
	console.log(process.argv)
	if (process.argv.length < minParam) throw new Error('missing parameters')
	const words: string = process.argv.slice(minParam-1).join(' ')
	console.log(words)
	const result: Sentiment.AnalysisResult = sentiment.analyze(words)
	console.log(result)
} catch(err: any) {
	console.log(err.message)
}
