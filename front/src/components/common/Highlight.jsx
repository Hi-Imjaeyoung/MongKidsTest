// text 안의 word 부분만 지정한 태그로 감싸 강조한다.
function Highlight({ text, word, as: Tag = 'strong', className }) {
  if (!word || !text.includes(word)) return text

  const [before, ...rest] = text.split(word)
  return (
    <>
      {before}
      <Tag className={className}>{word}</Tag>
      {rest.join(word)}
    </>
  )
}

export default Highlight
