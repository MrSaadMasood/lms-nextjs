import React from 'react'
import CallToActionButton from './CallToActionButton'

function UserSubscriptionCallToAction({ user }: { user: UserRole }) {
  return (
    <>
      {user && user.subscription_type !== "PERM" && (
        <section className="h-52 md:h-40 w-full flex justify-center items-center mt-3 md:mt-0">
          <div
            className=" bg-white w-[95%] md:w-[98%] h-full rounded-3xl p-2 flex flex-col justify-center
            items-center space-y-3"
          >
            <h3 className=" text-2xl md:text-3xl font-bold">Get Unlimited Access</h3>
            <div className="  w-[70%] text-center">
              <span className="font-bold ">{user.username}! </span>
              Buy Our <strong>One-Time Subscription</strong> and Enjoy Unlimited Access
            </div>
            <CallToActionButton content="Pricing" link="/dashboard/user/pricing" />
          </div>
        </section>
      )}
    </>

  )
}

export default UserSubscriptionCallToAction
