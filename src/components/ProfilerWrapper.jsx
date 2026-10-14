import { Profiler } from 'react'

// IA: Medir performance de secciones pesadas → Profiler API
// Solución manual: wrapper reutilizable que loguea duración
export default function ProfilerWrapper({ id, children }) {
  const onRender = (id, phase, actualDuration) => {
    if (import.meta.env.DEV) {
      console.log(`📊 [Profiler] ${id} | ${phase} | ${actualDuration.toFixed(2)}ms`)
    }
  }
  return <Profiler id={id} onRender={onRender}>{children}</Profiler>
}