"use client"

import { useState } from "react"

export default function Home() {
  const [msg, setMsg] = useState("")

  const checkBackend = async () => {
    const res = await fetch("http://127.0.0.1:8000/ping")
    const data = await res.json()
    setMsg(data.message)
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Wankeys 连接测试</h1>
      <button onClick={checkBackend} className="bg-green-600 text-white px-4 py-2 rounded">
        测试连接后端
      </button>
      {msg && <p className="mt-4">后端返回：{msg}</p>}
    </main>
  )
}
