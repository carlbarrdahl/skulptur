import { createContext, useContext, useEffect, useState } from "react"

const CeramicContext = createContext<any>({})

export const useCeramic = () => useContext(CeramicContext)

const CeramicProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [state, setState] = useState({})

  useEffect(() => {
    import("../ceramic/env").then(async (module) => {
      console.log("ceramic module", module)

      setState(await module.createSelfIDClient())
      setLoading(false)
    })
  }, [])

  console.log(state)
  return isLoading ? (
    "..."
  ) : (
    <CeramicContext.Provider value={state}>{children}</CeramicContext.Provider>
  )
}

export default CeramicProvider
