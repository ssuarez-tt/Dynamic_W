const IngredientList = ({ ingredients, className }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((it, idx) => (
          <tr key={idx}>
            <td><a href={it.link}>{it.name}</a></td>
            <td>{it.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IngredientList
