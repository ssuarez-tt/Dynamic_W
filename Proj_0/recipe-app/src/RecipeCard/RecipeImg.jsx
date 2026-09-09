const RecipeImg = ({ src, alt }) => {
  return (
    <div style={{maxWidth: 800}}>
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  )
}

export default RecipeImg
