import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'What are the latest statistics on breast cancer survival rates?',
    message: 'What is the most recent data on breast cancer survival rates across different stages?'
  },
  {
    heading: 'How effective is immunotherapy?',
    message: 'What does the latest research say about the effectiveness of immunotherapy in treating breast cancer?'
  },
  {
    heading: 'What are the trends in breast cancer diagnosis?',
    message: 'What are the most recent trends in breast cancer diagnosis and early detection rates?'
  },
  {
    heading: 'Breast cancer in younger women',
    message: 'What is the latest data on breast cancer incidence in women under 40?'
  }
];

export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
