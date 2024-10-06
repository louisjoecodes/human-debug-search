import { notFound, redirect } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'

export const maxDuration = 60

export interface SearchPageProps {
  params: {
    id: string
  }
  searchParams: {
    text?: string
  }
}

export async function generateMetadata({ params, searchParams }: SearchPageProps) {
  if (searchParams.text) {
    return {
      title: searchParams.text.slice(0, 50)
    }
  }
  const chat = await getChat(params.id, 'anonymous')
  return {
    title: chat?.title.toString().slice(0, 50) || 'Search'
  }
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const userId = 'anonymous'
  const chat = await getChat(params.id, userId)

  if (!chat && !searchParams.text) {
    redirect('/')
  }

  if (chat?.userId !== userId && !searchParams.text) {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat?.id || params.id,
        messages: chat?.messages || []
      }}
    >
      <Chat id={params.id} query={searchParams.text} />
    </AI>
  )
}
