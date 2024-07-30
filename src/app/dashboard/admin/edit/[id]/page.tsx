import MCQEditForm from "./MCQEditForm"

function page() {
  return (
    <section
      className=" bg-violet-700 w-screen md:w-full md:h-full h-screen flex flex-col space-y-3
      overflow-hidden overflow-y-scroll noScroll text-black"
    >
      <h2
        className="text-4xl md:text-6xl text-white  font-bold  h-20 w-full 
        flex justify-center items-center   "
      >
        Edit MCQ
      </h2>

      <div className=" w-full h-auto flex justify-center items-center">
        <div className=" w-[95%] h-auto p-2 bg-white rounded-2xl flex justify-center 
          items-center flex-wrap mb-20 md:mb-4 ">
          <MCQEditForm />
        </div>
      </div>
    </section>
  )
}

export default page
