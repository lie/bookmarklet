/**
 * @file eplus.jp の「申込み状況照会（申込み状況詳細）」ページの公演情報を基に、Googleカレンダーの予定追加ページに公演名・時間・場所を入力する
 */

String.prototype.fullWidthAsciiToHalfWidth = function() {
	return this.replace(/[\uFF01-\uFF5E]/g, str => {
		return String.fromCharCode(str.charCodeAt(0) - 0xFEE0)
	}).replaceAll('　', ' ')
}

document.location.href = 'https://calendar.google.com/calendar/u/0/r/eventedit?' + Array.from(document.getElementsByTagName('tr')).filter(tr => {
	return tr.children[1] !== undefined
}).map(tr => {
	switch(tr.children[0].innerText) {
		case '公演名':
			return 'text=' + tr.children[1].children[0].innerText.trim().fullWidthAsciiToHalfWidth()
		case '会場':
			return 'location=' + tr.children[1].childNodes[0].nodeValue.trim()
		case '公演日時':
			const text = tr.children[1].innerText
			const startDate = new Date(new Date(text.substring(0, text.indexOf('開場')).replaceAll('：', ':').replace(/\([月火水木金土日]\)/g, '')) - (-9 * 60 * 60 * 1000))
			const endDate   = new Date(startDate - (-4 * 60 * 60 * 1000))
			const startStr  = startDate.toISOString().replaceAll('-', '').replaceAll(':', '').replace(/\.\d\d\dZ/g, '')
			const   endStr  =   endDate.toISOString().replaceAll('-', '').replaceAll(':', '').replace(/\.\d\d\dZ/g, '')
			// console.log(startStr, endStr)
			return 'dates=' + startStr + '/' + endStr
		default:
			return ''
	}
}).filter(e => {
	return e !== ''
}).join('&')
