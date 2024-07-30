'use client'
import { Combobox } from "@/components/Dashboard/admin/ComboBox"
import { Button } from "@/components/ui/button"
import { v4 as uuid } from 'uuid'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { char1000StringSchema, char128StringSchema, char300StringSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { arrayBuffer } from "stream/consumers"
import { z } from "zod"


const mcqEditFormSchema = z.object({
  subject: char128StringSchema,
  paper_category: char128StringSchema,
  academy_name: char300StringSchema,
  statement: char1000StringSchema,
  option_a: char1000StringSchema,
  option_b: char1000StringSchema,
  option_c: char1000StringSchema,
  correct: z.string().min(1).max(1),
  explanation: char1000StringSchema,
  paper_year: z.string(),
  difficulty: z.string().min(1).max(10)
})

type MCQEditType = z.infer<typeof mcqEditFormSchema>

function MCQEditForm() {
  const form = useForm<MCQEditType>({
    resolver: zodResolver(mcqEditFormSchema)
  })

  function onSubmit(data: MCQEditType) {
    console.log('data is', data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full h-auto  flex flex-wrap justify-center items-center 
        space-y-2 space-x-2">
        <div className="w-full   grid grid-cols-2 grid-rows-3 
        sm:grid-cols-3 sm:grid-rows-2 place-items-center  gap-y-2 ">
          <FormField
            control={form.control}
            name="academy_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academy</FormLabel>
                <SelectorsTemplate >
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue className="" placeholder="Select Academy Name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1999, 2000, 3000, 4000].map((other, index) => (
                        <SelectItem key={index} value={other.toString()}
                        >{other}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectorsTemplate>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paper_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paper Year</FormLabel>
                <SelectorsTemplate >
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Paper Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1999, 2000, 3000, 4000].map((other, index) => (
                        <SelectItem key={index} value={other.toString()}
                        >{other}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectorsTemplate>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <SelectorsTemplate >
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1999, 2000, 3000, 4000].map((other, index) => (
                        <SelectItem key={index} value={other.toString()}
                        >{other}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectorsTemplate>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paper_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paper Category</FormLabel>
                <SelectorsTemplate>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Paper Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1999, 2000, 3000, 4000].map((other, index) => (
                        <SelectItem key={index} value={other.toString()}
                        >{other}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectorsTemplate>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct</FormLabel>
                <SelectorsTemplate>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Correct" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["a", "b", "c"].map((other, index) => (
                        <SelectItem key={index} value={other}
                        >{other}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectorsTemplate>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <SelectorsTemplate>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["easy", "hard", "medium"].map((other, index) => (
                        <SelectItem key={index} value={other}
                        >{other}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectorsTemplate>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* academy_name */}
          {/* subject */}
          {/* paper_year */}
          {/* difficulty */}
          {/* paper_category */}
          {/* correct */}
        </div>

        <div className=" w-[95%]  space-y-2 ">
          <FormField
            control={form.control}
            name="statement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statement</FormLabel>
                <FormControl>
                  <Textarea placeholder="Statement" className="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option_a"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option A</FormLabel>
                <FormControl>
                  <Textarea placeholder="Option A" className=""  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option_b"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option B</FormLabel>
                <FormControl>
                  <Textarea placeholder="Option B" className=""  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option_c"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option C</FormLabel>
                <FormControl>
                  <Textarea placeholder="Option C" className=""  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Explanation</FormLabel>
                <FormControl>
                  <Textarea placeholder="Explanation" className=""  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" w-full flex justify-end items-center mt-2 ">
          <Button type="submit" >Save Changes</Button>
        </div>
      </form>
    </Form >

  )
}

export default MCQEditForm


function SelectorsTemplate({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className=" w-[10rem] sm:w-[12rem] md:w-[11rem] lg:w-[13rem] xl:w-[15rem] ">
      {children}
    </div>
  )
}
