import {useState} from 'react'
import TodoEdit from './TodoEdit'
import useTodosContext from '../../hoooks/use-todos-context'
import {translateNote} from '../api'

const translationLanguages = [
  {code: 'zh-CN', name: 'Chinese (Simplified)'},
  {code: 'zh-TW', name: 'Chinese (Traditional)'},
  {code: 'en', name: 'English'},
  {code: 'ja', name: 'Japanese'},
  {code: 'ko', name: 'Korean'},
  {code: 'fr', name: 'French'},
  {code: 'es', name: 'Spanish'},
  {code: 'de', name: 'German'},
  {code: 'it', name: 'Italian'},
  {code: 'pt', name: 'Portuguese'},
  {code: 'ru', name: 'Russian'},
  {code: 'ar', name: 'Arabic'},
]

const TodoItem = ({todo}) => {
  const {deleteTodo, editTodo, toggleTodo, saveCurrentPage} = useTodosContext()
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)
  const [pageInput, setPageInput] = useState(String(todo.currentPage ?? 0))
  const [pageError, setPageError] = useState('')
  const [translation, setTranslation] = useState(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationError, setTranslationError] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('zh-CN')

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = async (id, changes) => {
    const updated = await editTodo(id, changes)
    if (updated) {
      setShowEdit(false)
    }
  }

  const handleCancelEdit = () => setShowEdit(false)

  const handleTranslateNote = async () => {
    if (!todo.note?.trim()) return

    setIsTranslating(true)
    setTranslationError('')
    try {
      const result = await translateNote(todo.note, targetLanguage)
      setTranslation({source: todo.note, targetLanguage, ...result})
    } catch (requestError) {
      console.error(requestError)
      setTranslationError(`Translation failed: ${requestError.message}`)
    } finally {
      setIsTranslating(false)
    }
  }

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    const currentPage = Number(pageInput)
    if (pageInput.trim() === '' || !Number.isSafeInteger(currentPage) || currentPage < 0) {
      setPageError('Enter a page number of 0 or greater.')
      return
    }

    const saved = await saveCurrentPage(todo.id, currentPage)
    if (saved) {
      setPageInput(String(currentPage))
      setPageError('')
    } else {
      setPageInput(String(todo.currentPage ?? 0))
      setPageError('Page was not saved. The previous value has been restored.')
    }
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} onCancel={handleCancelEdit} />
  }

  const totalPages = todo.totalPages ?? 0
  const currentPage = todo.currentPage ?? 0
  const progress = totalPages > 0
    ? Math.min(100, Math.round((currentPage / totalPages) * 100))
    : 0
  const language = translationLanguages.find(({code}) => code === targetLanguage)

  return (
    <article className="border-b border-gray-200 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
        <input
          type="checkbox"
          checked={Boolean(todo.done)}
          onChange={(event) => toggleTodo(todo.id, event.target.checked)}
          aria-label={`Mark ${todo.title} as ${todo.done ? 'unread' : 'finished'}`}
          className="mt-1 h-5 w-5 shrink-0"
        />
          <div className="min-w-0 flex-1">
            <h2 className={`break-words font-semibold ${todo.done ? 'text-gray-500 line-through' : ''}`}>
              {todo.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200"
              role="progressbar"
              aria-label={`Reading progress for ${todo.title}`}
              aria-valuemin="0"
              aria-valuemax={totalPages}
              aria-valuenow={Math.min(currentPage, totalPages)}
            >
              <div
                className={`h-full rounded-full transition-[width] ${
                  progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                }`}
                style={{width: `${progress}%`}}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">{progress}% read</p>
            {todo.note && (
              <div className="mt-3">
                <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
                  {todo.note}
                </p>
                <label htmlFor={`translation-language-${todo.id}`} className="mt-2 block text-sm font-medium text-gray-700">
                  Translate to
                </label>
                <select
                  id={`translation-language-${todo.id}`}
                  value={targetLanguage}
                  disabled={isTranslating}
                  onChange={(event) => {
                    setTargetLanguage(event.target.value)
                    setTranslation(null)
                    setTranslationError('')
                  }}
                  className="mt-1 min-h-11 max-w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm disabled:opacity-60"
                >
                  {translationLanguages.map(({code, name}) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleTranslateNote}
                  disabled={isTranslating}
                  className="mt-2 min-h-11 rounded px-3 py-2 text-sm text-blue-700 underline disabled:cursor-wait disabled:opacity-60"
                >
                  {isTranslating ? 'Translating...' : `Translate note to ${language?.name || 'selected language'}`}
                </button>
                <p className="text-xs text-gray-500">
                  The note will be sent to Google Translate for translation.
                </p>
                {translationError && (
                  <p role="alert" className="mt-2 text-sm text-red-700">
                    {translationError}
                  </p>
                )}
                {translation?.source === todo.note && translation.targetLanguage === targetLanguage && (
                  <div aria-live="polite" className="mt-3 rounded bg-blue-50 p-3">
                    <p className="text-sm font-medium text-gray-800">
                      {translationLanguages.find(({code}) => code === translation.targetLanguage)?.name || 'Translation'}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-700">
                      {translation.translatedText}
                    </p>
                    {translation.alternatives.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-800">Alternatives</p>
                        <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-gray-700">
                          {translation.alternatives.map((alternative, index) => (
                            <li key={`${index}-${alternative}`}>{alternative}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <form onSubmit={handlePageSubmit} className="flex items-end gap-2">
            <div>
              <label htmlFor={`page-${todo.id}`} className="block text-xs text-gray-600">
                Current page
              </label>
              <input
                id={`page-${todo.id}`}
                type="number"
                min="0"
                max={totalPages}
                step="1"
                inputMode="numeric"
                value={pageInput}
                onChange={(event) => {
                  setPageInput(event.target.value)
                  setPageError('')
                }}
                aria-invalid={pageError ? true : undefined}
                aria-describedby={pageError ? `page-error-${todo.id}` : undefined}
                className="mt-1 min-h-11 w-24 rounded border border-gray-300 px-2 py-2"
              />
            </div>
            <button type="submit" className="min-h-11 rounded bg-slate-100 px-3 py-2 text-slate-800">
              Save
            </button>
          </form>
          <button type="button" onClick={handleEditClick} className="min-h-11 rounded px-3 py-2 text-blue-700">
            Edit
          </button>
          <button type="button" onClick={handleDelete} className="min-h-11 rounded px-3 py-2 text-red-600">
            Delete
          </button>
        </div>
      </div>
      {pageError && (
        <p id={`page-error-${todo.id}`} role="alert" className="mt-2 text-sm text-red-700">
          {pageError}
        </p>
      )}
    </article>
  )
}

export default TodoItem