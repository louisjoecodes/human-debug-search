'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChatPanel } from './chat-panel'
import { ChatMessages } from './chat-messages'
import { useUIState, useActions } from 'ai/rsc'
import { UserMessage } from './user-message'
import { AI } from '@/app/actions'

type ChatProps = {
  id?: string
  query?: string
}

export function Chat({ id, query }: ChatProps) {
  const router = useRouter()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submit } = useActions()
  const initialQuerySubmitted = useRef(false)

  useEffect(() => {
    if (query && !initialQuerySubmitted.current) {
      const submitQuery = async () => {
        initialQuerySubmitted.current = true
        const formData = new FormData()
        formData.append('input', query)

        const userMessage = {
          id: Date.now(),
          component: <UserMessage message={query} />
        }

        const responseMessage = await submit(formData)
        setMessages(currentMessages => [
          ...currentMessages,
          userMessage,
          responseMessage
        ])
        // Update the URL to remove the query parameter
        router.push('/', { scroll: false })
      }

      submitQuery()
    }
  }, [query, submit, setMessages, router])

  return (
    <div className="px-8 sm:px-12 pt-12 md:pt-14 pb-14 md:pb-24 max-w-3xl mx-auto flex flex-col space-y-3 md:space-y-4">
      <ChatMessages messages={messages} />
      <ChatPanel messages={messages} />
    </div>
  )
}
