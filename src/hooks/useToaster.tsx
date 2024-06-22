import { useToast } from '@/components/ui/use-toast'

function useToaster() {
  const { toast } = useToast()

  function errorToast(message: string) {
    toast({
      description: message,
      variant: "destructive",
      className: "bg-red-700 text-white rounded-lg font-bold"
    })
  }

  function normalToast(message: string) {
    toast({
      description: message
    })
  }
  return {
    errorToast,
    normalToast
  }
}

export default useToaster
