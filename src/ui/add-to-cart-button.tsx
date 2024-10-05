'use client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/ui/shadcn/button'

interface AddToCartButtonProps {
  productId: string
  disabled?: boolean
  productSlug: string
}

export const AddToCartButton = ({ productId, disabled, productSlug }: AddToCartButtonProps) => {
  const t = useTranslations('Global.addToCart')
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <Button
      size="lg"
      type="submit"
      className="w-full rounded-full text-lg"
      onClick={async () => {
        startTransition(() => router.push(`/cart-overlay?add=${productId}`))
      }}
      aria-disabled={pending}
      disabled={pending || disabled}
    >
      {pending ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : disabled ? t('disabled') : t('actionButton')}
    </Button>
  )
}
