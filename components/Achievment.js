import { Star } from '@tamagui/lucide-icons'
import { XStack } from 'tamagui'

export default function Achievment(props) {
    return (
        <Achievment>
            <Star />
            <Text> {props.description} </Text>
        </Achievment>
    )
}

const Achievment = styled(XStack, {
    name: "Achievment",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
})