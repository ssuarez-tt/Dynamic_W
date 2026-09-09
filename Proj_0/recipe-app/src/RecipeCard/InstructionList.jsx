const InstructionList = ({ instructions }) => {
  return (
    <section>
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
