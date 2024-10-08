import { Button } from '@react-email/button'
import useToaster from "@/hooks/useToaster";
import { refundTokensForNonPermUsers } from "@/fetchRequests/fetch";
import { useRouter } from "next/navigation";

function RefundTokensIfTestNotFound() {

  const { errorToast, normalToast } = useToaster()
  const router = useRouter()

  async function handleTokenRefundIfUserIsNotPermanent() {
    const response = await refundTokensForNonPermUsers()
    const message = await response.json()
    if (!response.ok) errorToast(message)
    else if (response.status === 201) normalToast(message)
    else normalToast(message)
    router.replace("/dashboard/user/search?category=academy")
  }

  return (
    <div className="w-[98%] h-[15rem] bg-white text-black rounded-2xl flex flex-col justify-center items-center p-2 space-y-2">
      <div>
        <strong className="text-2xl font-bold">No Test Found!</strong>
      </div>
      <div>Dont Worry You can get a refund and take another test</div>
      <Button onClick={handleTokenRefundIfUserIsNotPermanent}>Refund Tokens</Button>
    </div>
  )
}

export default RefundTokensIfTestNotFound   
