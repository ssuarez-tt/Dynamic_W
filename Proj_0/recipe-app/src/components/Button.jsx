const Button = ({ children, className = '', type = 'button', onClick, ...props }) => {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

// TODO (in class): build this up together.
// const Button = (props) => {
//   const {children} = props
//   return <button className="px-8 py-3 border">{children}</button>
// }


export default Button


