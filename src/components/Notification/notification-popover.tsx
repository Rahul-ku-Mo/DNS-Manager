
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "@radix-ui/react-icons";

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <BellIcon className="size-10 p-3 cursor-pointer hover:opacity-100 opacity-80 transition-opacity ease-in-out rounded-full bg-slate-200" />
      </PopoverTrigger>
      <PopoverContent className="w-80 grid gap-2">
        <div className="grid gap-2">
          <span className="text-sm">No Notifications yet</span>
        </div>
        <ul className="grid gap-2">
          <li> Notification 1</li>
          <li> Notification 2</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
