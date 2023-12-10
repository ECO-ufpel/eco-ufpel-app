import { Link } from 'expo-router'
import { Text, styled, XStack, YStack } from 'tamagui'
import { Home, Search, User, Store } from '@tamagui/lucide-icons'

export default function Navbar() {
    return (
        <Nav>
            <Link href="/home">
                <NavButton>   
                    <Home />
                    <Text>Home</Text>
                </NavButton>
            </Link>
            <Link href="/profile">
                <NavButton>   
                    <Store />
                    <Text>Shop</Text>
                </NavButton>
            </Link>
            <Link href="/profile">
                <NavButton>   
                    <Search />
                    <Text>Search</Text>
                </NavButton>
            </Link>

            <Link href="/profile"> 
                <NavButton>   
                    <User />
                    <Text>Profile</Text>
                </NavButton>
            </Link>
        </Nav>
    )
}

const Nav = styled(XStack, {
    name: "Nav",
    width: "95%",
    justifyContent: "space-around",
    backgroundColor: "#D3F2DD80",
})

const NavButton = styled(YStack, {
    name: "NavButton",
    alignItems: "center",
    fontFamily: "Montserrat",
})
