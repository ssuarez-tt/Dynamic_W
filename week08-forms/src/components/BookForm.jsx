import {useState} from 'react'

const EMPTY = {
  title: '',
  author: '',
  pages: '',
  format: 'paperback',
  finished: false,
  rating: 3,
  dateStarted: '',
  notes: '',
}

const validate = (values) => {
  const errors = {}

  if (!values.title.trim()) {
    errors.title = 'A book needs a title.'
  }

  if (!values.author.trim()) {
    errors.author = 'Who wrote it?'
  }

  if (values.pages !== '') {
    const pages = Number(values.pages)
    if (!Number.isInteger(pages) || pages < 1 || pages > 5000) {
      errors.pages = 'Enter a whole number from 1 to 5000.'
    }
  }

  if (values.finished && !values.dateStarted) {
    errors.dateStarted = 'If you finished it, when did you start?'
  }

  return errors
}

const BookForm = ({onAdd}) => {
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const errors = validate(values)
  const showError = (field) => (touched[field] ? errors[field] : undefined)

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleBlur = (event) => {
    const {name} = event.target
    setTouched((currentTouched) => ({...currentTouched, [name]: true}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setTouched({
      title: true,
      author: true,
      pages: true,
      dateStarted: true,
    })

    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await onAdd({
        ...values,
        title: values.title.trim(),
        author: values.author.trim(),
        pages: Number(values.pages) || 0,
        rating: Number(values.rating),
      })
      setValues({...EMPTY})
      setTouched({})
    } catch (error) {
      console.error(error)
      setSubmitError('Could not save that book. Your entries are still here; try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass = (field, width = 'w-full') => {
    const base = `mt-1 ${width} rounded border px-3 py-2`
    return showError(field)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border-gray-300`
  }

  const renderError = (field) => showError(field) ? (
    <p id={`${field}-error`} className="mt-1 text-sm text-red-700">
      {errors[field]}
    </p>
  ) : null

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="title">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          id="title"
          name="title"
          required
          maxLength="120"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('title') ? true : undefined}
          aria-describedby={showError('title') ? 'title-error' : undefined}
          className={fieldClass('title')}
        />
        {renderError('title')}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="author">
          Author <span className="text-red-600">*</span>
        </label>
        <input
          id="author"
          name="author"
          required
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('author') ? true : undefined}
          aria-describedby={showError('author') ? 'author-error' : undefined}
          className={fieldClass('author')}
        />
        {renderError('author')}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="pages">Pages</label>
        <input
          id="pages"
          name="pages"
          type="number"
          min="1"
          max="5000"
          step="1"
          value={values.pages}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('pages') ? true : undefined}
          aria-describedby={showError('pages') ? 'pages-error' : undefined}
          className={fieldClass('pages', 'w-32')}
        />
        {renderError('pages')}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="format">Format</label>
        <select
          id="format"
          name="format"
          value={values.format}
          onChange={handleChange}
          className={fieldClass('format')}
        >
          <option value="paperback">Paperback</option>
          <option value="hardback">Hardback</option>
          <option value="ebook">Ebook</option>
          <option value="audio">Audiobook</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            name="finished"
            type="checkbox"
            checked={values.finished}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Finished it
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="rating">
          Rating: {values.rating}/5
        </label>
        <input
          id="rating"
          name="rating"
          type="range"
          min="1"
          max="5"
          value={values.rating}
          onChange={handleChange}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="dateStarted">
          Started
        </label>
        <input
          id="dateStarted"
          name="dateStarted"
          type="date"
          value={values.dateStarted}
          required={values.finished}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('dateStarted') ? true : undefined}
          aria-describedby={showError('dateStarted') ? 'dateStarted-error' : undefined}
          className={fieldClass('dateStarted', 'w-full sm:w-auto')}
        />
        {renderError('dateStarted')}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          maxLength="200"
          value={values.notes}
          onChange={handleChange}
          className={fieldClass('notes')}
        />
        <p className="mt-1 text-xs text-gray-500">{values.notes.length}/200</p>
      </div>

      {submitError && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 disabled:cursor-wait disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Add book'}
      </button>
    </form>
  )
}

export default BookForm
