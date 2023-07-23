import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/DropDownMenu"

const Notice=({details,createdAt}:{details:string,createdAt:string})=>{
return(        <DropdownMenuGroup>
    <DropdownMenuLabel className="capitalize">{details}</DropdownMenuLabel>
    <DropdownMenuItem>
      {createdAt}
    </DropdownMenuItem>
    <DropdownMenuSeparator  className="bg-black"/>
 </DropdownMenuGroup>)
}
export default Notice