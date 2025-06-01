import { Combobox } from "@/components/combobox/combobox";
import { DatePickerWithRange } from "@/components/date/data-picker";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React from "react";

const LaunchMemeCoin = () => {

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-32">
      <Navbar />
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-70 blur-sm"
        />
      </div>
      <Card className="w-full max-w-2xl bg-[#FFFBF7]/95 shadow-xl border-2 border-meme-border rounded-xl p-0 relative z-10">
        <CardHeader className="pb-2">
          <CardTitle
            className="mb-2 leading-tight text-center outlined-text"
            style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
          >
            Launch Your MemeCoin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="icon">
                Upload Meme Icon
              </label>
              <input
                id="icon"
                type="file"
                accept="image/*"
                className="block w-full text-sm border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-meme-primary file:text-meme-primaryDark hover:file:bg-meme-heading bg-white/80 border-meme-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="tokenName">
                  Token Name
                </label>
                <input
                  id="tokenName"
                  type="text"
                  placeholder="e.g. MemeRocket"
                  className="w-full px-3 py-2 border rounded-md border-meme-border bg-white/80 text-meme-text placeholder:text-meme-border focus:outline-none focus:ring-2 focus:ring-meme-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="symbol">
                  Symbol
                </label>
                <input
                  id="symbol"
                  type="text"
                  placeholder="e.g. MEME"
                  className="w-full px-3 py-2 border rounded-md border-meme-border bg-white/80 text-meme-text placeholder:text-meme-border focus:outline-none focus:ring-2 focus:ring-meme-primary"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="description">
                Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="e.g. The funniest coin on chain..."
                className="w-full px-3 py-2 border rounded-md border-meme-border bg-white/80 text-meme-text placeholder:text-meme-border focus:outline-none focus:ring-2 focus:ring-meme-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="date">
                  Start Time
                </label>
                <DatePickerWithRange className="w-full" />
              </div>
              <div>
                <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="time">
                  Time
                </label>
                <Combobox />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="date">
                  End Time
                </label>
                <DatePickerWithRange className="w-full" />
              </div>
              <div>
                <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="time">
                  Time
                </label>
                <Combobox />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* <label className="font-bold text-meme-primaryDark" htmlFor="fcfs">
                
              </label> */}
              <Switch id="fcfs" />
              <label htmlFor="fcfs" className="text-sm text-meme-text">Enable First Come First Serve</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="slot">Slot</label>
              <input
                id="slot"
                type="number"
                placeholder="e.g. 100"
                className="w-full px-3 py-2 border rounded-md border-meme-border bg-white/80 text-meme-text placeholder:text-meme-border focus:outline-none focus:ring-2 focus:ring-meme-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-meme-primaryDark" htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                placeholder="e.g. 100"
                className="w-full px-3 py-2 border rounded-md border-meme-border bg-white/80 text-meme-text placeholder:text-meme-border focus:outline-none focus:ring-2 focus:ring-meme-primary"
              />
            </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-2 mb-4 bg-[#FFC107] hover:bg-meme-heading text-meme-primaryDark font-bold text-lg py-2 rounded-md flex items-center justify-center gap-2 shadow hover-scale"
            >
              <span role="img" aria-label="rocket">🚀</span> Launch MemeCoin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LaunchMemeCoin;