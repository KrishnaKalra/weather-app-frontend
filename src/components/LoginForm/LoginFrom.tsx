'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
//validation for form
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneno: z.string().regex(/^(?:\+?(?:0[ -]*)?|(?:91[ -]*)?)(\d{12}|\d{10}|\d{5}[- ]?\d{6})$/, {
    message: "Enter valid Phone Number."
  }),
  email: z.string().email({
    message: "Enter valid email."
  }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" })
})

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneno: "",
      password: "",
    },
  })
  const { getValues, setValue } = form;

  function onSubmit() {
    try{
    const formData = getValues();
    const user = {
      name: formData.name,
      email: formData.email,
      phoneno: formData.phoneno
    }
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    
    window.location.href = '/';

    }
    catch(error){
      console.error("Error during login ",error);
    }
  }
  const [hiddenPassword, setHiddenPassword] = useState(true);
  function viewPassword() {
    if (hiddenPassword == true)
      setHiddenPassword(false)
    else
      setHiddenPassword(true)
  }

  return (
    <Form {...form}>
      <h1 className='text-2xl font-semibold text-center m-3'>Login to your Account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold text-[15px]'>Name<span className='text-red-600'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="Input your name" className='h-12 ' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneno"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold text-[15px]'>Phone Number<span className='text-red-600'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="Input your phone no." className='h-12 '  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold text-[15px]'>Email<span className='text-red-600'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="Input your email" className='h-12 ' {...field} />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold text-[15px]'>Password<span className='text-red-600'>*</span></FormLabel>
              <div className='flex relative'>
                <FormControl >
                  <Input placeholder="Input your password" className='h-12 ' type={hiddenPassword ? 'password' : 'text'} {...field} />
                </FormControl>
                {hiddenPassword ? <FontAwesomeIcon className='absolute right-3 top-3.5' onClick={viewPassword} icon={faEye} /> : <FontAwesomeIcon className='absolute right-3 top-3.5' onClick={viewPassword} icon={faEyeSlash} />}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-[100%] h-12 ' type="submit">Login</Button>

      </form>
    </Form>
  )
}

export default LoginForm