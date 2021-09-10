import {Fragment, FunctionComponent, h} from "preact"
import SetCardGen from "../../components/cards/setcard"
import { setCard } from "../../components/gameHelper"
import { NavBar } from "../../components/NavBar"
import style from "./style.css"

const DisplaySetCard:FunctionComponent<{card: setCard}> = ({card}) => <SetCardGen card={card} selected={false} onClick={() => {return}} />


const HelpPage:FunctionComponent = () => {
    return <Fragment>
        <NavBar page="help" />
        <h1>Todo!</h1>
    </Fragment>
}

export default HelpPage

/**
Text

Your goal is to collect all sets possible, as fast as possible. A 'set' is a group of 3 cards that have no odd one out. To figure that out,
you need to look at the 4 properties of the cards: Number, Shape, Color and Filling. The basic rule is that if 2 cards share a property, then
the other one must have that property too. To the right are some examples of the cards.
The cards will be presented on a board 3x4. If there isn't a set within those 12 cards, another row will be added. This means there is always a set,
you just gotta find it!

Examples:

`${Num}${Shape}${Color}${Fill}`
type Num = '1' | '2' | '3'
type Shape = 'w' | 'r' | 'o'
type Color = 'r' | 'p' | 'g'
type Fill = 'f' | 'e' | 's'

1wrs
2rgf
3ope

Number: :tick: all different
Shape : :tick: all different
Color : :tick: all different
Fill  : :tick: all different

1rrf
1rrs
1rre

Number: :tick: all the same
Shape : :tick: all the same
Color : :tick: all the same
Fill  : :tick: all different


1wgf
2ogf
3rgf

Number: :tick: all different
Shape : :tick: all different
Color : :tick: all the same
Fill  : :tick: all the same

3rre
3rre
3rrf

Number: :tick: all the same
Shape : :tick: all the same
Color : :tick: all the same
Fill  : :x: 2 are the same, 1 is different

(I've take all these out of the actual set manual I have)

 */
