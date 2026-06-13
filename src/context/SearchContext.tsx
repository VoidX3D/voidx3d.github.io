import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react'

interface SearchCtx {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

const Context = createContext<SearchCtx>({ query: '', setQuery: () => {} })

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  return <Context.Provider value={{ query, setQuery }}>{children}</Context.Provider>
}

export const useSearch = () => useContext(Context)
