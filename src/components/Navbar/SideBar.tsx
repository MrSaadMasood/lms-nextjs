"use client";
import { authLinksNavBar, itemsVariants, navbarLink, variants } from "@/lib/variables/constants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { v4 as uuid } from "uuid";

function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      {showSideBar ? (
        <AnimatePresence>
          <motion.aside
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" h-[100vh] z-20 fixed top-0 right-0 bg-white  flex flex-col justify-center items-center"
          >
            <section className="w-full h-[10%]  flex  justify-end items-center  ">
              <button onClick={() => setShowSideBar(!showSideBar)}>
                <IoClose size={40} />
              </button>
            </section>
            <section className="w-full h-[90%]  ">
              <ul
                className="w-full h-[80%]  flex flex-col justify-start items-center space-y-1 
                overflow-hidden noScroll overflow-y-scroll"
              >
                {navbarLink.map((link) => (
                  <motion.li
                    variants={itemsVariants}
                    key={uuid()}
                    className="flex justify-center border-2 border-violet-600 hover:border-violet-900 items-center  
                    w-[80%] rounded-lg h-[8%]"
                  >
                    <Link href={link.to} onClick={() => setShowSideBar(!showSideBar)}>
                      {link.content}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="w-full h-[20%]  flex flex-col justify-start items-center space-y-1">
                {authLinksNavBar.map((link) => (
                  <motion.li
                    variants={itemsVariants}
                    key={uuid()}
                    className="flex flex-col-reverse justify-center items-center 
                    rounded-lg font-bold
                     w-[80%] h-[30%] border-2 border-violet-600 hover:border-violet-900"
                  >
                    <Link
                      href={link.to}
                      className="w-full h-full flex justify-center items-center"
                      onClick={() => setShowSideBar(!showSideBar)}
                    >
                      {link.content}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </section>
          </motion.aside>
        </AnimatePresence>
      ) : (
        <aside className=" md:hidden  w-full h-full flex  justify-end items-center ">
          <FaList
            color="black"
            size={30}
            className="mr-3"
            onClick={() => setShowSideBar(!showSideBar)}
          />
        </aside>
      )}
    </>
  );
}

export default SideBar;
