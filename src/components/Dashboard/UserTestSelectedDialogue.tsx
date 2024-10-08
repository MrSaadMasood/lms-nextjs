import useToaster from "@/hooks/useToaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import SelectForm from "./SelectForm";
import useTestSelection from "@/hooks/useTestSelection";
import { v4 as uuid } from 'uuid';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deductFreeTokensFromUserRequest } from "@/fetchRequests/fetch";
import { SkeletonUI } from "./Skeleton";

export default function UserTestSelectedDialogue({
  title,
  category,
  academyId,
  user
}: {
  academyId: string,
  title: string;
  category: TestSearchCategory,
  user: UserRole
}) {


  const [openDialog, setOpenDialog] = useState(false)
  const router = useRouter()
  const { errorToast } = useToaster()
  const {
    categoryCorrespondingMappedObject,
    stopUserIfIncompleteOptionsSelected,
    createParamsForTestPageNavigation,
    selectedOption,
    changeValue,
    isFilterChanged
  } = useTestSelection({
    academyId,
    category,
    errorToast
  })
  const isPermanentUser = user.subscription_type === "PERM"
  const shouldRecharge = user.free_tokens === 0

  useEffect(() => {
    if (openDialog) {
      changeValue(title, category)
    }
  }, [category, title, openDialog, changeValue])

  async function redirectToTestOrRechargePage() {
    if (shouldRecharge) {
      return router.push("/dashboard/user/pricing")
    }
    else if (stopUserIfIncompleteOptionsSelected())
      errorToast("You Must Select At Least One Filter Option")
    else {
      try {
        const response = await deductFreeTokensFromUserRequest()
        const data = await response.json()
        if (response.status === 401) throw new Error
        if (response.status === 402) return errorToast(data)
      } catch (error) {
        console.log("the error is", error)
        return errorToast("Internal Server Error")
      }
      router.push(
        `/dashboard/user/test` + '?' + createParamsForTestPageNavigation()
      );
    }
  }


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
      {/* trigget  */}
      <DialogTrigger asChild >
        <Button
          className="w-full sm:w-[90%] md:w-[11rem] lg:w-[15rem] xl:w-[18rem] 
          h-12 p-2  border-2 border-violet-200 hover:border-violet-900
            flex justify-center items-center rounded-xl duration-300 "
          variant="outline"
        >
          {title.slice(0, 20)}
        </Button>
      </DialogTrigger>

      {/* content */}
      <DialogContent className="w-[90%] h-auto duration-300 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
          <DialogDescription>
            Filter it according to your needs. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        {categoryCorrespondingMappedObject[category].map(
          ({ placeholder, type, showOptionsForForm, list }) => {
            if (showOptionsForForm && list.length > 0) return (
              <SelectForm
                key={uuid()}
                placeholder={placeholder}
                selectedOption={selectedOption[type]}
                changeValue={changeValue}
                type={type}
                list={list}
              />
            )
          })}
        {isFilterChanged && (
          <SkeletonUI />
        )}
        {!isPermanentUser && !shouldRecharge && (
          <div
            className=" text-xs text-red-700 "> * 100 tokens will be deduced from your account for each test.
          </div>
        )}
        {!isPermanentUser && shouldRecharge && (
          <div className=" text-xs text-red-700 ">Kindly Recharge Your Tokens</div>
        )}
        <DialogFooter>
          <Button
            onClick={() => redirectToTestOrRechargePage()}>
            {shouldRecharge ? "Recharge" : "Start Test"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
} 
