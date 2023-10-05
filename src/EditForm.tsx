import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "./@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./@/components/ui/form";
import { Input } from "./@/components/ui/input";
import { useForm } from "react-hook-form";

export default function EditForm({ user, submitHandler }) {
  console.log(user);
  const EditFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    address: z.object({
      city: z.string().min(2, {
        message: "City must be at least 2 characters.",
      }),
      street: z.string().min(2, {
        message: "Street must be at least 2 characters.",
      }),
      suite: z.string().min(2, {
        message: "Suite must be at least 2 characters.",
      }),
      zipcode: z.string().min(2, {
        message: "Zipcode must be at least 2 characters.",
      }),
    }),

    phone: z.string().min(2, {
      message: "Phone must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: { ...user },
  });

  function onError(errors: any) {
    console.log(errors);
  }

  function onSubmit(values: z.infer<typeof EditFormSchema>) {
    console.log(values);
    const newUser = { ...user, ...values };
    submitHandler(newUser);
    // ✅ This will be type-safe and validated.
    console.log(newUser);
    console.log("asf");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-1"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row flex-wrap  items-center justify-between ">
                  <FormLabel className="font-semibold text-left align-middle mt-2 basis-1/6">
                    Name
                  </FormLabel>

                  <FormControl>
                    <Input className="basis-5/6 mt-0" {...field} />
                  </FormControl>
                  <div className=" basis-1/6"></div>
                  <FormMessage className="basis-5/6 text-center justify-self-end" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row flex-wrap  items-center justify-between ">
                  <FormLabel className="font-semibold text-left align-middle mt-2 basis-1/6">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input className="basis-5/6 mt-0" {...field} />
                  </FormControl>
                  <div className=" basis-1/6"></div>
                  <FormMessage className="basis-5/6 text-center justify-self-end" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row flex-wrap  items-center justify-between ">
                  <FormLabel className="font-semibold text-left align-middle mt-2 basis-1/6">
                    City
                  </FormLabel>

                  <FormControl>
                    <Input className="basis-5/6 mt-0" {...field} />
                  </FormControl>
                  <div className=" basis-1/6"></div>
                  <FormMessage className="basis-5/6 text-center justify-self-end" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row flex-wrap  items-center justify-between ">
                  <FormLabel className="font-semibold text-left align-middle mt-2 basis-1/6">
                    Street
                  </FormLabel>

                  <FormControl>
                    <Input className="basis-5/6 mt-0" {...field} />
                  </FormControl>
                  <div className=" basis-1/6"></div>
                  <FormMessage className="basis-5/6 text-center justify-self-end" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="address.suite"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row flex-wrap  items-center justify-between">
                  <FormLabel className="font-semibold text-left align-middle mt-2 basis-1/6">
                    Suite
                  </FormLabel>

                  <FormControl>
                    <Input className="basis-5/6 mt-0" {...field} />
                  </FormControl>
                  <div className=" basis-1/6"></div>
                  <FormMessage className="basis-5/6 text-center justify-self-end" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="address.zipcode"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row flex-wrap  items-center justify-between ">
                  <FormLabel className="font-semibold text-left align-middle mt-2 basis-1/6">
                    Zipcode
                  </FormLabel>

                  <FormControl>
                    <Input className="basis-5/6 mt-0" {...field} />
                  </FormControl>
                  <div className=" basis-1/6"></div>
                  <FormMessage className="basis-5/6 text-center justify-self-end" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row flex-wrap  items-center justify-between  ">
                  <FormLabel className="font-semibold text-left align-middle mt-2 basis-1/6">
                    Phone
                  </FormLabel>

                  <FormControl>
                    <Input className="basis-5/6 mt-0" {...field} />
                  </FormControl>
                  <div className=" basis-1/6"></div>
                  <FormMessage className="basis-5/6 text-center justify-self-end" />
                </FormItem>
              );
            }}
          />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
