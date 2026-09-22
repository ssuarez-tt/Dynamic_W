import cx from 'classnames'

const Panel = (props) => {
  const { title, children, className, ...rest } = props
  return (
    <div {...rest} className={cx('panel', className)}>
      {title && <h2 className="panel-title">{title}</h2>}
      <div className="panel-content">{children}</div>
    </div>
  )
}

export default Panel
