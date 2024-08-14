"use client";

import { searchParams } from "@/functions/search-params";
import { searchSchema, type SearchSchema } from "@/types/schemas/search-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const searchForm = tv({
  slots: {
    root: "relative flex items-center gap-2",
    button: "",
  },
  variants: {
    variant: {
      navbar: {
        root: "flex-1 max-md:hidden",
        button: "max-lg:hidden",
      },
      "navbar-responsive": {
        root: "w-full border-t py-6",
      },
    },
  },
});

interface ISearchForm
  extends ComponentProps<"form">,
    VariantProps<typeof searchForm> {}

export function SearchForm({ className, variant, ...rest }: ISearchForm) {
  const { root, button } = searchForm({ variant });
  const nextSearchParams = useSearchParams();
  const params = searchParams.get(nextSearchParams);
  const router = useRouter();

  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: params.query,
    },
  });

  function handleSearch(data: SearchSchema) {
    const newParams = searchParams.set(data, nextSearchParams);

    router.push(`/search?${newParams}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSearch)}
        className={root({ className })}
        {...rest}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="search"
                  placeholder="Buscar barbearias"
                  className="flex-1"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-5" />
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" className={button()}>
          <Search className="size-5" />
        </Button>
      </form>
    </Form>
  );
}
