"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import React from 'react'
import { useCurrentUser } from '../hooks/use-current-user'
import { LogOut, User } from 'lucide-react'
import LogOutButton from './logout-button'

const UserButton = () => {
    const user = useCurrentUser()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className={cn("relative rounded-full")}>
                <Avatar>
                    <AvatarImage src={user?.image!} alt={user?.name!}/>
                    <AvatarFallback>
                        <User className='text-white' />
                    </AvatarFallback>
                </Avatar>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
                <span>{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <LogOutButton>
                <DropdownMenuItem>
                    <LogOut className='h-4 w-4 mr-2' />
                    LogOut
                </DropdownMenuItem>
            </LogOutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton