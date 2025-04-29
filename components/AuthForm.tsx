
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Form,
  
} from "@/components/ui/form"
import logo from "../app/download.png"
// import { Input } from "@/components/ui/input"

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })
type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (type : FormType)=>{
  return z.object({
  name: type ==="sign-up"? z.string().min(3) : z.string().optional(),
  email: z.string().email(),
  password: z.string().min(3)
  })
}


import React from 'react'
import Link from "next/link"
import { toast } from "sonner"
import FormFeild from "./FormFeild"
import { useRouter } from "next/navigation"

const AuthForm = ({type}:{type: FormType}) => {

  const router = useRouter();

const formSchema = authFormSchema(type);

      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   try {
    
    if(type === 'sign-up'){
      toast.success("Acccount Created");
      router.push('/sign-in');
      console.log("SIGN UP ", values);
    }
    else{
      toast.success("Signed In SuccessFully");
      router.push('/');
      console.log("SIGN In ", values);
    }


   } catch (error) {
    console.log(error);
    toast.error(`There are an error: ${error}`);
   }
  }

  const isSignIn  = type ==='sign-in';
  return (
    <div className="border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
<Image src={logo} alt="logo" height={34} width={38}/>
<h2 className="text-primary-100">Agent</h2>
            </div>
            <h3>Practice job interview with AI</h3>
        
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 form space-y-8">
       {!isSignIn && <FormFeild control={form.control} name="name" label="Name" type="text" placeholder="Your name"/>}
       <FormFeild control={form.control} name="email" label="Email" type="email" placeholder="Your Email"/>
       <FormFeild control={form.control} name="password" label="Password" type="password" placeholder="Password"/>
        <Button className="btn" type="submit">{isSignIn? 'Sign-in' : 'Create an Account'}</Button>
      </form>
    </Form> 
  <p className="text-center">{isSignIn? 'No account yet?': 'Have an account already?'}</p>
  <Link href={!isSignIn? '/sign-in':'/sign-up'} className="font-bold text-user-primary ml-1">{!isSignIn ? "Sign in": "Sign up"}</Link>
    </div>
    </div>
    )

}

export default AuthForm