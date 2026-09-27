const InstructionList = ({ instructions, className }) => {
  return (
    <section className={className}>
      <h4>Instructions</h4>
      <ol>
        {instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </section>
  )
}

export default InstructionList
