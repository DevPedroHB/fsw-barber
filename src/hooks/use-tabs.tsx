import { searchParams } from "@/functions/search-params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useTabs(defaultValue: string, param = "tab") {
  const nextSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = searchParams.get(nextSearchParams);
  const [value, setValue] = useState(params[param] || defaultValue);

  function onValueChange(value: string) {
    const params = searchParams.set({ [param]: value }, nextSearchParams);

    router.replace(`${pathname}?${params}`, {
      scroll: false,
    });

    setValue(value);
  }

  return {
    value,
    onValueChange,
  };
}
