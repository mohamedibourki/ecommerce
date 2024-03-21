import React from 'react'
import { signIn, useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function Dashboard() {
    const { data: session } = useSession()
    if (session) {
        return <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                Hello {session?.user?.name} !
                <div style={{ display: "flex" }}>
                    <Stack direction="row" spacing={2}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={session?.user?.image} sx={{ height: "40px"}} />
                        </StyledBadge>
                    </Stack>
                    <Button variant={"outline"} style={{ marginLeft: "20px", color: "black" }} onClick={() => signOut()}>Sign out</Button>
                </div>
            </div>
        </>
    } else {
        return <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                Please SignIn
                <Button variant={"outline"} style={{ marginLeft: "20px", color: "black" }} onClick={() => signIn()}>Sign in</Button>
            </div>
        </>
    }
}