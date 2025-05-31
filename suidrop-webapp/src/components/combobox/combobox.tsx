"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "00:00",
    label: "12:00 AM",
  },
  {
    value: "01:00",
    label: "01:00 AM",
  },
  {
    value: "02:00",
    label: "02:00 AM",
  },
  {
    value: "03:00",
    label: "03:00 AM",
  },
  {
    value: "04:00",
    label: "04:00 AM",
  },
  {
    value: "05:00",
    label: "05:00 AM",
  },
  {
    value: "06:00",
    label: "06:00 AM",
  },
  {
    value: "07:00",
    label: "07:00 AM",
  },
  {
    value: "08:00",
    label: "08:00 AM",
  },
  {
    value: "09:00",
    label: "09:00 AM",
  },
  {
    value: "10:00",
    label: "10:00 AM",
  },
  {
    value: "11:00",
    label: "11:00 AM",
  },
  {
    value: "12:00",
    label: "12:00 PM",
  },
  {
    value: "13:00",
    label: "01:00 PM",
  },
  {
    value: "14:00",
    label: "02:00 PM",
  },
  {
    value: "15:00",
    label: "03:00 PM",
  },
  {
    value: "16:00",
    label: "04:00 PM",
  },
  {
    value: "17:00",
    label: "05:00 PM",
  },
  {
    value: "18:00",
    label: "06:00 PM",
  },
  {
    value: "19:00",
    label: "07:00 PM",
  },
  {
    value: "20:00",
    label: "08:00 PM",
  },
  {
    value: "21:00",
    label: "09:00 PM",
  },
  {
    value: "22:00",
    label: "10:00 PM",
  },
  {
    value: "23:00",
    label: "11:00 PM",
  },
]

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Time"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}