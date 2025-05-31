import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { QuickQuestHeader } from "./headers/quick-quest"
import { LeaderboardHeader } from "./headers/leaderboard"

interface SiteHeaderProps {
  activeNav: string
}

export function SiteHeader({ activeNav }: SiteHeaderProps) {
  return (
    <header>
      {activeNav === 'quick-quests' && <QuickQuestHeader />}
      {activeNav === 'leaderboard' && <LeaderboardHeader />}
    </header>
  )
}
